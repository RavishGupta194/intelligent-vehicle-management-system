# CARVIA - Intelligent IoT Vehicle Management & Driver Safety Platform

CARVIA is an all-in-one Smart Mobility and Fleet Management ecosystem that integrates modern car rentals, a buy/sell marketplace, vehicle maintenance logging, and an advanced AI-powered **Driver Safety & Drowsiness Monitoring System** connected to IoT cloud channels.

---

## 🚀 Key Features

### 🧠 Driver Safety & Live Monitoring (AI & IoT)
* **Real-time Computer Vision:** Monitors Eye Aspect Ratio (EAR), Mouth Aspect Ratio (MAR - yawning), and Head Tilt using a webcam with Python, OpenCV, and Dlib.
* **IoT Cloud Telemetry:** Live data is pushed automatically to **ThingSpeak Cloud** channels for real-time visualization.
* **MATLAB Analytics:** Real-time signal reconstruction and health analytics integrated into the frontend dashboard.
* **Live Safety Alerts:** Auto-detects driver fatigue, distraction, or drowsiness and triggers immediate safety warnings.

### 🚗 Smart Mobility Modules
* **Car Rental System:** End-to-end car rental booking interface with user profile tracking.
* **Vehicle Marketplace (Buy & Sell):** A clean interface for users to list, trade, buy, and sell cars.
* **Diagnostics & Maintenance:** Track vehicle health logs, system diagnostics, and book maintenance/repair services.
* **Admin Command Center:** Complete panel for managers to oversee the fleet, monitor system statuses, and check security logs.
* **AI Support Chatbot:** Integrated assistant to resolve user queries on the go.

---

## 🛠️ Technology Stack

* **Frontend:** React, Vite, Vanilla CSS, Lucide Icons, ThingSpeak/MATLAB iframe charts
* **Backend Services:** Node.js, Express, SQLite/MongoDB database setup
* **AI & IoT Backend:** Python 3, OpenCV, Dlib Face Landmarks (68 points model), ThingSpeak API Client

---

## 📁 Repository Structure

```
├── backend/                  # Node.js backend server & database config
├── python_backend/           # Python OpenCV + Dlib AI driver monitoring script
├── my-react-app/             # React (Vite) frontend application
├── .gitignore                # Root gitignore (excludes heavy node_modules, envs, and ML models)
└── README.md                 # Project documentation
```

---

## ⚙️ Installation & Running the Project

### 1. Prerequisite Checklist
* Install [Node.js](https://nodejs.org/) (v16+)
* Install [Python 3.9+](https://www.python.org/)
* Get a webcam (for the Driver Drowsiness detection feature)

### 2. Set Up the Node.js Backend
```bash
cd backend
npm install
node server.js
```

### 3. Set Up the React Frontend
```bash
cd my-react-app
npm install
npm run dev
```
*(Open the link displayed, typically `http://localhost:5173`)*

### 4. Set Up the Python AI & IoT Backend
```bash
cd python_backend
# 1. Create a virtual environment
python -m venv venv
# 2. Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# 3. Install required libraries
pip install opencv-python dlib numpy requests flask flask-cors

# 4. Start the AI script
python app.py
```
*(Make sure to download `shape_predictor_68_face_landmarks.dat` and place it in the `python_backend` folder if it is not present.)*

---

## 👥 Contributors & Collaboration
This project is open to contributions. To get started:
1. Clone this repository: `git clone <YOUR_REPOSITORY_URL>`
2. Create a new branch: `git checkout -b feature/awesome-feature`
3. Commit your changes: `git commit -m 'Add awesome feature'`
4. Push to the branch: `git push origin feature/awesome-feature`
5. Open a Pull Request!
