#!/usr/bin/env python
# coding: utf-8

# In[1]:


import cv2
import dlib
import numpy as np
from scipy.spatial import distance as dist
from imutils import face_utils
import matplotlib.pyplot as plt
from collections import deque
import time 
import serial
import serial.tools.list_ports
import requests
from IPython.display import Audio, display


# In[2]:


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

THINGSPEAK_API_KEY = "JZT796Q49577R1LQ"   # <--- UPDATE THIS
CAMERA_WIDTH = 1280
CAMERA_HEIGHT = 720


# In[3]:


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

def find_arduino_port():
    ports = list(serial.tools.list_ports.comports())
    for p in ports:
        if 'Arduino' in p.description or 'CH340' in p.description or 'USB' in p.description:
            return p.device
    return None

def setup_arduino(baud_rate=9600):
    port = find_arduino_port()
    if port is None:
        print("⚠ Arduino not found. Running without Arduino.")
        return None
    try:
        arduino = serial.Serial(port, baud_rate, timeout=1)
        time.sleep(2)
        print(f"✓ Arduino connected on {port}")
        return arduino
    except Exception as e:
        print(f"⚠ Arduino error: {e}")
        return None

def send_to_arduino(arduino, command):
    if arduino:
        try:
            arduino.write((command + '\n').encode())
        except:
            pass

def play_buzzer():
    duration = 1.0
    frequency = 880
    rate = 44100
    t = np.linspace(0, duration, int(rate * duration))
    sound = (np.sin(2 * np.pi * frequency * t) * 0.7).astype(np.float32)
    display(Audio(data=sound, rate=rate, autoplay=True))

def upload_to_thingspeak(api_key, field1, field2, field3, field4, field5, field6, field7, field8):
    url = "https://api.thingspeak.com/update"
    payload = {
        'api_key': api_key,
        'field1': field1,
        'field2': field2,
        'field3': field3,
        'field4': field4,
        'field5': field5,
        'field6': field6,
        'field7': field7,
        'field8': field8
    }
    try:
        response = requests.get(url, params=payload, timeout=5)
        if response.status_code == 200:
            print(f"✓ ThingSpeak uploaded")
    except Exception as e:
        print(f"⚠ ThingSpeak error: {e}")


# In[4]:


# Cell 5: Drowsiness detection with working live score and professional interface

shape_predictor_path = "shape_predictor_68_face_landmarks.dat"
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(shape_predictor_path)

(lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
(rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]
(mStart, mEnd) = face_utils.FACIAL_LANDMARKS_IDXS["mouth"]

arduino = setup_arduino()

ear_history = deque(maxlen=500)
mar_history = deque(maxlen=500)
tilt_history = deque(maxlen=500)
blink_history = deque(maxlen=500)
status_history = deque(maxlen=500)
drowsiness_score_history = deque(maxlen=500)
time_history = deque(maxlen=500)
face_graph_history = []

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
cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, CAMERA_WIDTH)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, CAMERA_HEIGHT)

print("\n" + "="*70)
print("        🚗 DRIVER DROWSINESS DETECTION SYSTEM 🚗")
print("="*70)
print("Status: ACTIVE | Press 'q' to quit")
print("="*70 + "\n")

fps_live = FPS_ESTIMATE

while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame_counter += 1
    current_time = time.time() - start_time
    h, w = frame.shape[:2]

    # Update FPS estimate live every frame
    if current_time > 0:
        fps_live = frame_counter / current_time
    EAR_CONSEC_FRAMES = int(DROWSY_SECONDS * fps_live)

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = detector(gray, 0)

    ear = last_ear
    mar = 0.0
    head_tilt = 0.0
    label = "AWAKE"
    label_color = (0, 255, 0)
    alert_triggered = False
    drowsiness_score = 0  # Init/Reset at start of EVERY frame

    if len(faces) > 0:
        face = faces[0]
        shape = predictor(gray, face)
        shape = face_utils.shape_to_np(shape)
        face_graph_history.append(shape.copy())

        leftEye = shape[lStart:lEnd]
        rightEye = shape[rStart:rEnd]
        mouth = shape[mStart:mEnd]

        leftEAR = eye_aspect_ratio(leftEye)
        rightEAR = eye_aspect_ratio(rightEye)
        ear = (leftEAR + rightEAR) / 2.0
        mar = mouth_aspect_ratio(mouth)
        head_tilt = calculate_head_tilt(shape)
        last_ear = ear

        ear_history.append(ear)
        mar_history.append(mar)
        tilt_history.append(head_tilt)
        time_history.append(current_time)

        # Landmarks/contours
        for (x, y) in shape:
            cv2.circle(frame, (x, y), 2, (0, 255, 0), -1)
        cv2.drawContours(frame, [cv2.convexHull(leftEye)], -1, (255, 200, 0), 2)
        cv2.drawContours(frame, [cv2.convexHull(rightEye)], -1, (255, 200, 0), 2)
        cv2.drawContours(frame, [cv2.convexHull(mouth)], -1, (255, 255, 0), 2)

        # Blink detection
        if blink_cooldown > 0:
            blink_cooldown -= 1
        else:
            if ear < BLINK_EAR_THRESHOLD:
                if blink_cooldown == 0:
                    blink_counter_total += 1
                    blink_cooldown = BLINK_COOLDOWN_FRAMES
        blink_history.append(blink_counter_total)

        # --- Score and state tracking, update every frame ---
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

        # Clamp score to max 100
        drowsiness_score = min(drowsiness_score, 100)
        drowsiness_score_history.append(drowsiness_score)

        # --- Condition flags ---
        is_long_eye_closed = (drowsy_counter >= EAR_CONSEC_FRAMES)
        is_yawning = (yawn_counter >= YAWN_CONSEC_FRAMES)
        is_head_tilt = (abs(head_tilt) > HEAD_TILT_THRESHOLD)
        is_score_high = (drowsiness_score >= 50)

        # --- ALERT: Trigger on ANY failure (eyes, yawn, tilt, score) ---
        if is_long_eye_closed or is_yawning or is_head_tilt or is_score_high:
            if not is_drowsy:
                is_drowsy = True
                alert_count += 1
                alert_triggered = True
                play_buzzer()  # SOUND PLAYS INSTANTLY
                if arduino:
                    send_to_arduino(arduino, 'on')
            label = "DROWSY"
            label_color = (0, 0, 255)
            status = 0
            causes = []
            if is_long_eye_closed: causes.append("Eyes Closed")
            if is_yawning: causes.append("Yawning")
            if is_head_tilt: causes.append("Head Tilted")
            if is_score_high: causes.append("Score High")
            cause_text = " + ".join(causes) if causes else "Multiple Factors"
        else:
            if is_drowsy:
                is_drowsy = False
                if arduino:
                    send_to_arduino(arduino, 'off')
            label = "AWAKE"
            label_color = (0, 255, 0)
            status = 1
            cause_text = "Alert & Focused"

        status_history.append(status)

        # --- Colorful, professional metrics dashboard ---
        # Top bar
        if is_drowsy:
            cv2.rectangle(frame, (0, 0), (w, 100), (0, 0, 200), -1)
            cv2.putText(frame,"DROWSINESS ALERT!",(w//2 - 300,60),cv2.FONT_HERSHEY_DUPLEX,1.5,(255,255,255),3,cv2.LINE_AA)
        else:
            cv2.rectangle(frame, (0, 0), (w, 80), (50, 150, 50), -1)
            cv2.putText(frame,"SYSTEM MONITORING",(w//2 - 200,50),cv2.FONT_HERSHEY_DUPLEX,1.0,(255,255,255),2,cv2.LINE_AA)

        # Left dashboard
        panel_x, panel_y = 20, 120
        panel_w, panel_h = 350, 400
        overlay = frame.copy()
        cv2.rectangle(overlay, (panel_x, panel_y), (panel_x + panel_w, panel_y + panel_h), (30,30,30), -1)
        cv2.addWeighted(overlay, 0.7, frame, 0.3, 0, frame)
        cv2.rectangle(frame, (panel_x, panel_y), (panel_x + panel_w, panel_y + panel_h), (255,255,255), 2)

        cv2.putText(frame, "METRICS DASHBOARD", (panel_x + 15, panel_y + 35),
                   cv2.FONT_HERSHEY_DUPLEX, 0.7, (255,255,255), 2, cv2.LINE_AA)
        cv2.line(frame, (panel_x + 10, panel_y + 45), (panel_x + panel_w - 10, panel_y + 45), (100,100,100), 2)

        y_off = panel_y + 80
        ear_color = (0, 255, 0) if ear >= EAR_THRESHOLD else (0, 0, 255)
        cv2.putText(frame, f"EAR: {ear:.3f}", (panel_x + 15, y_off),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.7, ear_color, 2, cv2.LINE_AA)
        cv2.rectangle(frame, (panel_x + 150, y_off - 15), (panel_x + 150 + int(ear * 300), y_off), ear_color, -1)
        y_off += 60
        mar_color = (0, 255, 0) if mar < MAR_THRESHOLD else (0, 165, 255)
        cv2.putText(frame, f"MAR: {mar:.3f}", (panel_x + 15, y_off),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.7, mar_color, 2, cv2.LINE_AA)
        cv2.rectangle(frame, (panel_x + 150, y_off - 15), (panel_x + 150 + int(mar * 150), y_off), mar_color, -1)
        y_off += 60
        tilt_color = (0, 255, 0) if abs(head_tilt) < HEAD_TILT_THRESHOLD else (0, 165, 255)
        cv2.putText(frame, f"Tilt: {head_tilt:.1f}", (panel_x + 15, y_off),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.7, tilt_color, 2, cv2.LINE_AA)
        y_off += 60
        score_color = (0,255,0) if drowsiness_score < 30 else (0,165,255) if drowsiness_score < 50 else (0,0,255)
        cv2.putText(frame,f"Score:{drowsiness_score}/100",(panel_x+15,y_off),cv2.FONT_HERSHEY_SIMPLEX,0.7,score_color,2,cv2.LINE_AA)
        cv2.rectangle(frame,(panel_x+150,y_off-15),(panel_x+150+int(drowsiness_score*1.8),y_off),score_color,-1)
        y_off += 60
        cv2.putText(frame, f"Blinks: {blink_counter_total}", (panel_x + 15, y_off),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 255), 2, cv2.LINE_AA)
        y_off += 40
        cv2.putText(frame, f"Yawns: {yawn_count_total}", (panel_x + 15, y_off),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2, cv2.LINE_AA)

        # Bottom status bar
        status_y = h - 120
        overlay = frame.copy()
        cv2.rectangle(overlay, (20, status_y), (w - 20, status_y + 100), (40,40,40), -1)
        cv2.addWeighted(overlay, 0.8, frame, 0.2, 0, frame)
        cv2.rectangle(frame, (20, status_y), (w - 20, status_y + 100), label_color, 4)
        cv2.putText(frame, f"STATUS: {label}", (40, status_y + 45), cv2.FONT_HERSHEY_DUPLEX, 1.2, label_color, 3, cv2.LINE_AA)
        cv2.putText(frame, f"Reason: {cause_text}", (40, status_y + 80), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (200,200,200), 2, cv2.LINE_AA)

        # Top right info
        cv2.putText(frame, f"Time: {current_time:.1f}s", (w - 250, 30),cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2, cv2.LINE_AA)
        cv2.putText(frame, f"FPS: {fps_live:.1f}", (w - 250, 60),cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2, cv2.LINE_AA)

        # ThingSpeak upload every 3 seconds
        if frame_counter % (FPS_ESTIMATE * 3) == 0:
            upload_to_thingspeak(
                THINGSPEAK_API_KEY,
                round(ear, 3),
                round(mar, 3),
                round(head_tilt, 1),
                blink_counter_total,
                status,
                drowsiness_score,
                yawn_count_total,
                alert_count
            )

    else:
        ear_history.append(last_ear)
        mar_history.append(0)
        tilt_history.append(0)
        blink_history.append(blink_counter_total)
        drowsiness_score_history.append(0)
        status_history.append(1)
        cv2.rectangle(frame, (0, 0), (w, 100), (0, 165, 255), -1)
        cv2.putText(frame, "NO FACE DETECTED", (w//2 - 300, 60),
                   cv2.FONT_HERSHEY_DUPLEX, 1.3, (255, 255, 255), 3, cv2.LINE_AA)

    cv2.imshow("Driver Drowsiness Detection System", frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
if arduino:
    send_to_arduino(arduino, 'off')
    arduino.close()


# In[5]:


# Cell 6: Metrics Visualization - Safe for history mismatch

# Sync all histories to the shortest available length
N = min(
    len(time_history),
    len(ear_history),
    len(mar_history),
    len(tilt_history),
    len(drowsiness_score_history),
    len(blink_history),
    len(status_history)
)

t_hist = list(time_history)[-N:]
ear_hist = list(ear_history)[-N:]
mar_hist = list(mar_history)[-N:]
tilt_hist = list(tilt_history)[-N:]
dscore_hist = list(drowsiness_score_history)[-N:]
status_hist = list(status_history)[-N:]
blink_hist = list(blink_history)[-N:]

fig, axes = plt.subplots(6, 1, figsize=(16, 16))

axes[0].plot(t_hist, ear_hist, 'b-', linewidth=2.5, label='EAR')
axes[0].axhline(y=EAR_THRESHOLD, color='r', linestyle='--', linewidth=2, label='Threshold')
axes[0].fill_between(t_hist, 0, EAR_THRESHOLD, alpha=0.2, color='red')
axes[0].set_ylabel('EAR', fontweight='bold')
axes[0].set_title('Eye Aspect Ratio (EAR)', fontweight='bold')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

axes[1].plot(t_hist, mar_hist, color='orange', linewidth=2.5, label='MAR')
axes[1].axhline(y=MAR_THRESHOLD, color='r', linestyle='--', linewidth=2, label='Threshold')
axes[1].set_ylabel('MAR', fontweight='bold')
axes[1].set_title('Yawn Detection (MAR)', fontweight='bold')
axes[1].legend()
axes[1].grid(True, alpha=0.3)

axes[2].plot(t_hist, tilt_hist, 'g-', linewidth=2.5, label='Head Tilt')
axes[2].axhline(y=HEAD_TILT_THRESHOLD, color='r', linestyle='--', linewidth=2)
axes[2].axhline(y=-HEAD_TILT_THRESHOLD, color='r', linestyle='--', linewidth=2)
axes[2].set_ylabel('Tilt Angle', fontweight='bold')
axes[2].set_title('Head Tilt Detection', fontweight='bold')
axes[2].legend()
axes[2].grid(True, alpha=0.3)

axes[3].plot(t_hist, dscore_hist, 'purple', linewidth=2.5, label='Score')
axes[3].axhline(y=50, color='r', linestyle='--', linewidth=2, label='Alert Threshold')
axes[3].fill_between(t_hist, 50, 100, alpha=0.2, color='red')
axes[3].set_ylabel('Score', fontweight='bold')
axes[3].set_title('Drowsiness Score (0-100)', fontweight='bold')
axes[3].legend()
axes[3].grid(True, alpha=0.3)

axes[4].plot(t_hist, blink_hist, 'magenta', linewidth=2.5, label='Blinks')
axes[4].set_ylabel('Blinks', fontweight='bold')
axes[4].set_title('Blink Counter', fontweight='bold')
axes[4].legend()
axes[4].grid(True, alpha=0.3)

axes[5].fill_between(t_hist, 0, status_hist, step='post', color='green', alpha=0.6, label='Awake')
axes[5].fill_between(t_hist, status_hist, 1, step='post', color='red', alpha=0.6, label='Drowsy')
axes[5].set_yticks([0, 1])
axes[5].set_yticklabels(['DROWSY', 'AWAKE'])
axes[5].set_xlabel('Time (seconds)', fontweight='bold')
axes[5].set_title('Status Timeline', fontweight='bold')
axes[5].legend()
axes[5].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()



# ## plt.figure(figsize=(10, 10))
# if face_graph_history:
#     last_shape = face_graph_history[-1]
#     xs = last_shape[:, 0]
#     ys = last_shape[:, 1]
#     plt.scatter(xs, ys, color='lime', s=50, edgecolors='black', linewidths=1.5, label='Landmarks', zorder=3)
#     plt.plot(xs[0:17], ys[0:17], 'b-', linewidth=2, alpha=0.6, label='Jaw')
#     plt.plot(xs[17:22], ys[17:22], 'orange', linewidth=2, alpha=0.6, label='Eyebrows')
#     plt.plot(xs[22:27], ys[22:27], 'orange', linewidth=2, alpha=0.6)
#     plt.plot(xs[36:42], ys[36:42], 'cyan', linewidth=2, alpha=0.6, label='Eyes')
#     plt.plot(xs[42:48], ys[42:48], 'cyan', linewidth=2, alpha=0.6)
#     plt.plot(xs[48:60], ys[48:60], 'red', linewidth=2, alpha=0.6, label='Mouth')
#     plt.title("68-Point Facial Landmark Detection", fontsize=18)
#     plt.gca().invert_yaxis()
#     plt.grid(True, alpha=0.3)
#     plt.gca().set_facecolor('#f5f5f5')
#     for idx, (x, y) in enumerate(zip(xs, ys)):
#         plt.text(x + 3, y, str(idx + 1), fontsize=7, color="blue")
#     plt.legend(fontsize=12)
#     plt.xlabel('X Coordinate', fontweight='bold')
#     plt.ylabel('Y Coordinate', fontweight='bold')
#     plt.tight_layout()
#     plt.show()
# else:
#     print("⚠ No face detected for visualization")
# 

# In[6]:


print("\n" + "="*70)
print("           📊 DROWSINESS DETECTION SUMMARY REPORT 📊")
print("="*70)
print("\n🕒 SESSION:")
print(f"   Runtime:        {list(time_history)[-1]:.1f}s")
print(f"   Frames:         {frame_counter}")
print(f"   Avg FPS:        {frame_counter / list(time_history)[-1]:.1f}")

print("\n👁 DETECTIONS:")
print(f"   Blinks:         {blink_counter_total}")
print(f"   Yawns:          {yawn_count_total}")
print(f"   Alerts:         {alert_count}")

print("\n📈 AVERAGES:")
print(f"   EAR:            {np.mean(list(ear_history)):.3f}")
print(f"   MAR:            {np.mean(list(mar_history)):.3f}")
print(f"   Head Tilt:      {np.mean([abs(t) for t in tilt_history]):.2f}°")
print(f"   Score:          {np.mean(list(drowsiness_score_history)):.1f}/100")

drowsy_frames = sum([1 for s in status_history if s == 0])
awake_frames = len(status_history) - drowsy_frames
drowsy_pct = (drowsy_frames / len(status_history)) * 100 if len(status_history) > 0 else 0

print("\n⏱ TIME:")
print(f"   Awake:          {awake_frames / FPS_ESTIMATE:.1f}s ({100 - drowsy_pct:.1f}%)")
print(f"   Drowsy:         {drowsy_frames / FPS_ESTIMATE:.1f}s ({drowsy_pct:.1f}%)")

print("\n🎯 THINGSPEAK:")
uploads = frame_counter // (FPS_ESTIMATE * 3)
print(f"   Uploads:        {uploads}")
print(f"   Total Points:   {uploads * 8}")

print("\n📋 FIELD MAPPING:")
print("   Field 1: EAR")
print("   Field 2: MAR")
print("   Field 3: Head Tilt")
print("   Field 4: Blinks")
print("   Field 5: Status")
print("   Field 6: Drowsiness Score")
print("   Field 7: Yawns")
print("   Field 8: Alerts")

if drowsy_pct > 20:
    print("\n⚠ HIGH DROWSINESS - Rest needed!")
elif drowsy_pct > 10:
    print("\n⚡ MODERATE DROWSINESS - Take break soon")
else:
    print("\n✅ LOW DROWSINESS - Good alertness!")

print("="*70 + "\n")


# In[ ]:




