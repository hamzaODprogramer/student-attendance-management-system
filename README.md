<div align="center">

# Student Attendance Management System

[![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Python](https://img.shields.io/badge/Python-3.10-3776AB?style=flat-square&logo=python&logoColor=white)](https://python.org)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![Expo](https://img.shields.io/badge/Expo-51-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev)
[![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=flat-square&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

A full-stack facial recognition attendance tracking system with three interconnected services: an admin dashboard, a face recognition API, and a mobile app.

[Architecture](#architecture) • [Services](#services) • [Prerequisites](#prerequisites) • [Setup](#setup) • [Usage](#usage) • [Environment Variables](#environment-variables)

</div>

---

## Architecture

The system is composed of three independent services that communicate over HTTP:

```
┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
│     Mobile App       │      │  Face Recognition    │      │   Admin Dashboard    │
│   (React Native)     │ ──►  │   API (Flask/Python) │ ──►  │  (Next.js + MongoDB) │
│                      │      │                      │      │                      │
│  • Takes classroom   │      │  • Detects faces     │      │  • CRUD operations   │
│    photos            │      │  • Matches students  │      │  • Attendance stats  │
│  • Shows attendance  │      │  • Returns presence  │      │  • User management   │
│  • Generates PDFs    │      │    list              │      │  • REST API          │
└──────────────────────┘      └──────────────────────┘      └──────────────────────┘
```

The teacher uses the mobile app to photograph the classroom. The image is sent to the Flask API, which uses facial recognition (dlib + OpenCV) to detect which students are present. The results are returned to the mobile app and stored via the admin dashboard's API.

## Services

### Admin Dashboard
A Next.js 14 web application for managing the entire attendance system. It provides a complete CRUD interface for students, teachers, classes, subjects, rooms, and academic sessions.

- **Framework**: Next.js 14 with App Router
- **Database**: MongoDB via Mongoose
- **UI**: Material UI + Ant Design + Tailwind CSS
- **i18n**: English and French support
- **Features**: Dashboard statistics, account management, password reset

### Face Recognition API
A Flask service that processes classroom photos and identifies students using facial recognition.

- **Framework**: Flask with gunicorn
- **Computer Vision**: OpenCV, dlib, face-recognition
- **Deployment**: Ready for Render/Heroku (includes Procfile)
- **Endpoint**: `POST /getPersences` — accepts an image URL, returns a list of present student CNEs

> [!NOTE]
> The face recognition process compares faces detected in the classroom photo against each student's stored face image, using the `face_recognition` library.

### Mobile App
A React Native (Expo) application that teachers use to take attendance in real time.

- **Framework**: Expo SDK 51
- **UI**: NativeWind (Tailwind for RN) + React Native Paper
- **Features**:
  - Camera integration for classroom photos
  - Real-time attendance results
  - Statistics per class with charts
  - PDF report generation
  - Teacher authentication

## Project Structure

```
├── admin-dashboard/              # Next.js admin web dashboard
│   ├── app/[locale]/
│   │   ├── components/           # Reusable UI components
│   │   ├── models/               # Mongoose schemas
│   │   ├── pages/                # Page components
│   │   └── login/                # Authentication pages
│   └── messages/                 # i18n translations (en, fr)
│
├── face-recognition-api/         # Flask face recognition service
│   ├── server.py                 # Flask API entry point
│   ├── Main.py                   # Face detection & recognition logic
│   └── connectDB.py              # Database client
│
└── mobile-apps/
    ├── mobile-app/               # React Native (Expo) mobile app
    │   ├── screens/              # App screens
    │   ├── components/           # UI components
    │   ├── functions/            # API client & utilities
    │   └── constants/            # Configuration
    │
    ├── AwesomeProject/           # (unused — excluded from git)
    └── test-react-native-app-stage/  # (prototype — excluded from git)
```

## Prerequisites

- **Node.js 20+**
- **Python 3.10+**
- **MongoDB** instance (local or Atlas)
- **npm** or **yarn**
- **Expo CLI** (for mobile development)

## Setup

Each service can be run independently. Follow the instructions for each component.

### 1. Admin Dashboard

```bash
cd admin-dashboard
npm install
cp .env.example .env     # Configure your environment variables
npm run dev
```

The dashboard will be available at `http://localhost:3000`.

### 2. Face Recognition API

```bash
cd face-recognition-api
pip install -r requirements.txt
python server.py
```

The API will listen on `http://localhost:5000`.

> [!TIP]
> On Windows, you may need to install [Visual C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) and [CMake](https://cmake.org/) for `dlib` to compile.

### 3. Mobile App

```bash
cd mobile-apps/mobile-app
npm install
npx expo start
```

Scan the QR code with Expo Go, or run on an emulator.

## Environment Variables

### Admin Dashboard
| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string |
| `NEXTAUTH_SECRET` | Authentication secret |

### Face Recognition API (`face-recognition-api/.env`)
| Variable | Description |
|---|---|
| `API_URL` | Admin dashboard API base URL |
| `API_KEY` | API key for dashboard authentication |
| `DATABASE_URL` | MongoDB connection string |

### Mobile App (`mobile-apps/mobile-app/.env`)
| Variable | Description |
|---|---|
| `EXPO_PUBLIC_API_KEY` | API key for dashboard authentication |
| `EXPO_PUBLIC_API_URL` | Admin dashboard API base URL |
| `EXPO_PUBLIC_HANDLE_IMAGE_SERVER_URL` | Face recognition API URL |

## API Endpoints

### Face Recognition API
| Method | Path | Description |
|---|---|---|
| `GET` | `/getTest` | Health check |
| `POST` | `/getPersences` | Send image URL, receive present student list |

### Admin Dashboard API
The dashboard provides REST endpoints for CRUD operations on students, teachers, classes, subjects, rooms, and sessions. These are consumed by both the mobile app and the face recognition API.
