# pyrefly: ignore [missing-import]
from flask import Flask, jsonify, Response
from flask_cors import CORS
import cv2
import dlib
import numpy as np
from scipy.spatial import distance as dist
from imutils import face_utils
import time
import serial
import serial.tools.list_ports
import requests
import threading

app = Flask(__name__)
CORS(app)

# Global variables
is_monitoring = False
cap = None

# --- CONSTANTS ---
EAR_THRESHOLD = 0.25
DROWSY_SECONDS = 2
FPS_ESTIMATE = 6
EAR_CONSEC_FRAMES = DROWSY_SECONDS * FPS_ESTIMATE
MAR_THRESHOLD = 0.6
YAWN_SECONDS = 0.5
YAWN_CONSEC_FRAMES = int(YAWN_SECONDS * FPS_ESTIMATE)
HEAD_TILT_THRESHOLD = 15
BLINK_EAR_THRESHOLD = 0.21
BLINK_COOLDOWN_FRAMES = 5
THINGSPEAK_API_KEY = "JZT796Q49577R1LQ"
CAMERA_WIDTH = 640
CAMERA_HEIGHT = 480

# Load Model
shape_predictor_path = "shape_predictor_68_face_landmarks.dat"
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(shape_predictor_path)

(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]
(mStart, mEnd) = face_utils.FACIAL_LANDMARKS_IDXS["mouth"]

# --- ARDUINO SETUP ---
def find_arduino_port():
    ports = list(serial.tools.list_ports.comports())
    for p in ports:
        if 'Arduino' in p.description or 'CH340' in p.description or 'USB' in p.description:
            return p.device
    return None

def setup_arduino(baud_rate=9600):
    port = find_arduino_port()
    if port is None:
        print("[!] Arduino not found. Running without Arduino.")
        return None
    try:
        arduino = serial.Serial(port, baud_rate, timeout=1)
        time.sleep(2)
        print(f"[OK] Arduino connected on {port}")
        return arduino
    except Exception as e:
        print(f"[!] Arduino error: {e}")
        return None

def send_to_arduino(arduino, command):
    if arduino:
        try:
            arduino.write((command + '\n').encode())
        except:
            pass

arduino = setup_arduino()

def eye_aspect_ratio(eye):
    A = dist.euclidean(eye[1], eye[5])
    B = dist.euclidean(eye[2], eye[4])
    C = dist.euclidean(eye[0], eye[3])
    return (A + B) / (2.0 * C)

def mouth_aspect_ratio(mouth):
    A = dist.euclidean(mouth[2], mouth[10])
    B = dist.euclidean(mouth[4], mouth[8])
    C = dist.euclidean(mouth[0], mouth[6])
    return (A + B) / (2.0 * C)

def calculate_head_tilt(shape):
    left_eye_center = shape[36:42].mean(axis=0)
    right_eye_center = shape[42:48].mean(axis=0)
    dY = right_eye_center[1] - left_eye_center[1]
    dX = right_eye_center[0] - left_eye_center[0]
    return np.degrees(np.arctan2(dY, dX))

def generate_frames():
    global is_monitoring, cap
    
    if cap is None or not cap.isOpened():
        cap = cv2.VideoCapture(0)
        cap.set(cv2.CAP_PROP_FRAME_WIDTH, CAMERA_WIDTH)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, CAMERA_HEIGHT)

    frame_counter = 0
    drowsy_counter = 0
    yawn_counter = 0
    yawn_count_total = 0
    blink_counter_total = 0
    blink_cooldown = 0
    alert_count = 0
    is_drowsy = False
    last_ear = 0.3
    start_time = time.time()

    while is_monitoring:
        success, frame = cap.read()
        if not success:
            break

        frame_counter += 1
        current_time = time.time() - start_time
        h, w = frame.shape[:2]

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = detector(gray, 0)

        ear = last_ear
        mar = 0.0
        head_tilt = 0.0
        label = "AWAKE"
        label_color = (0, 255, 0)
        drowsiness_score = 0 

        if len(faces) > 0:
            face = faces[0]
            shape = predictor(gray, face)
            shape = face_utils.shape_to_np(shape)

            leftEye = shape[lStart:lEnd]
            rightEye = shape[rStart:rEnd]
            mouth = shape[mStart:mEnd]

            leftEAR = eye_aspect_ratio(leftEye)
            rightEAR = eye_aspect_ratio(rightEye)
            ear = (leftEAR + rightEAR) / 2.0
            mar = mouth_aspect_ratio(mouth)
            head_tilt = calculate_head_tilt(shape)
            last_ear = ear

            for (x, y) in shape:
                cv2.circle(frame, (x, y), 2, (0, 255, 0), -1)
            cv2.drawContours(frame, [cv2.convexHull(leftEye)], -1, (255, 200, 0), 1)
            cv2.drawContours(frame, [cv2.convexHull(rightEye)], -1, (255, 200, 0), 1)
            cv2.drawContours(frame, [cv2.convexHull(mouth)], -1, (255, 255, 0), 1)

            if blink_cooldown > 0:
                blink_cooldown -= 1
            elif ear < BLINK_EAR_THRESHOLD:
                blink_counter_total += 1
                blink_cooldown = BLINK_COOLDOWN_FRAMES

            if ear < EAR_THRESHOLD:
                drowsiness_score += 40
                drowsy_counter += 1
            else:
                drowsy_counter = 0

            if mar > MAR_THRESHOLD:
                drowsiness_score += 30
                yawn_counter += 1
                if yawn_counter >= YAWN_CONSEC_FRAMES:
                    yawn_count_total += 1
                    yawn_counter = 0
            else:
                yawn_counter = 0

            if abs(head_tilt) > HEAD_TILT_THRESHOLD:
                drowsiness_score += 30

            drowsiness_score = min(drowsiness_score, 100)

            is_long_eye_closed = (drowsy_counter >= EAR_CONSEC_FRAMES)
            is_yawning = (yawn_counter >= YAWN_CONSEC_FRAMES)
            is_head_tilt = (abs(head_tilt) > HEAD_TILT_THRESHOLD)
            is_score_high = (drowsiness_score >= 50)

            if is_long_eye_closed or is_yawning or is_head_tilt or is_score_high:
                if not is_drowsy:
                    is_drowsy = True
                    alert_count += 1
                    send_to_arduino(arduino, 'on')
                label = "DROWSY"
                label_color = (0, 0, 255)
            else:
                if is_drowsy:
                    is_drowsy = False
                    send_to_arduino(arduino, 'off')
                label = "AWAKE"
                label_color = (0, 255, 0)

            if is_drowsy:
                cv2.rectangle(frame, (0, 0), (w, 60), (0, 0, 200), -1)
                cv2.putText(frame, "DROWSY ALERT!", (10, 40), cv2.FONT_HERSHEY_DUPLEX, 1, (255,255,255), 2)
            else:
                cv2.rectangle(frame, (0, 0), (w, 50), (50, 150, 50), -1)
                cv2.putText(frame, "MONITORING ACTIVE", (10, 35), cv2.FONT_HERSHEY_DUPLEX, 0.7, (255,255,255), 1)

            cv2.putText(frame, f"Score: {drowsiness_score}", (w-150, 35), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255,255,255), 1)

        else:
            cv2.rectangle(frame, (0, 0), (w, 60), (0, 165, 255), -1)
            cv2.putText(frame, "NO FACE DETECTED", (10, 40), cv2.FONT_HERSHEY_DUPLEX, 1, (255, 255, 255), 2)

        # --- THINGSPEAK UPDATE (Every 15s) ---
        try:
            if 'last_thingspeak_sync' not in locals():
                last_thingspeak_sync = 0
            
            if time.time() - last_thingspeak_sync > 15:
                status_val = 1 if not is_drowsy else 0
                ts_url = f"https://api.thingspeak.com/update?api_key={THINGSPEAK_API_KEY}&field1={round(ear,3)}&field2={round(mar,3)}&field3={round(head_tilt,1)}&field4={blink_counter_total}&field5={status_val}&field6={drowsiness_score}&field7={yawn_count_total}&field8={alert_count}"
                threading.Thread(target=lambda: requests.get(ts_url, timeout=5)).start()
                last_thingspeak_sync = time.time()
        except Exception as e:
            print(f"TS Sync Error: {e}")

        ret, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/api/start', methods=['POST'])
def start_monitoring():
    global is_monitoring
    is_monitoring = True
    return jsonify({"status": "success", "message": "Monitoring enabled."}), 200

@app.route('/api/stop', methods=['POST'])
def stop_monitoring():
    global is_monitoring, cap
    is_monitoring = False
    if cap:
        cap.release()
        cap = None
    send_to_arduino(arduino, 'off')
    return jsonify({"status": "success", "message": "Monitoring stopped."}), 200

@app.route('/api/status', methods=['GET'])
def check_status():
    global is_monitoring
    return jsonify({"is_monitoring": is_monitoring}), 200

if __name__ == '__main__':
    print("Flask Server running on port 8000...")
    app.run(port=8000, debug=False, threaded=True)