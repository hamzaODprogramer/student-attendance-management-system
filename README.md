# Student Attendance Management System

A full-stack attendance tracking system using facial recognition technology. The system consists of three interconnected applications that work together to automate student attendance tracking.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Mobile App (React Native)                   │
│  - Teacher takes classroom photo                             │
│  - Sends image to face recognition API                      │
│  - Displays attendance results & statistics                  │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTP
                        ▼
┌─────────────────────────────────────────────────────────────┐
│             Face Recognition API (Flask / Python)             │
│  - Detects faces in classroom photos                         │
│  - Matches against student face database                     │
│  - Returns list of present/absent students                   │
└───────────────────────┬─────────────────────────────────────┘
                        │ HTTP
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              Admin Dashboard (Next.js)                        │
│  - Manages students, teachers, classes, subjects, rooms      │
│  - Provides REST API for all CRUD operations                 │
│  - Dashboard with attendance statistics                      │
│  - MongoDB for data persistence                              │
└─────────────────────────────────────────────────────────────┘
```

## Project Structure

```
├── admin-dashboard/           # Next.js admin web dashboard
│   ├── app/                   # App router pages
│   ├── components/            # React components
│   ├── models/                # MongoDB Mongoose models
│   ├── messages/              # i18n translations (EN/FR)
│   └── pages/                 # Page components
│
├── face-recognition-api/      # Flask face recognition service
│   ├── server.py              # Flask API entry point
│   ├── Main.py                # Face recognition logic
│   └── connectDB.py           # Database connection
│
└── mobile-apps/
    └── mobile-app/            # React Native (Expo) mobile app
        ├── screens/           # App screens
        ├── components/        # UI components
        ├── constants/         # Configuration
        ├── functions/         # API calls & utilities
        └── enums/             # Type definitions
```

## Technologies

| Component     | Stack                                      |
|---------------|--------------------------------------------|
| Dashboard     | Next.js 14, TypeScript, MongoDB, Tailwind  |
| API           | Flask, Python, OpenCV, dlib, face-recognition |
| Mobile App    | React Native, Expo, NativeWind             |

## Prerequisites

- Node.js 18+
- Python 3.10+
- MongoDB instance
- Expo CLI

## Setup

### 1. Admin Dashboard

```bash
cd admin-dashboard
npm install
cp .env.example .env   # Configure your environment
npm run dev
```

### 2. Face Recognition API

```bash
cd face-recognition-api
pip install -r requirements.txt
python server.py
```

### 3. Mobile App

```bash
cd mobile-apps/mobile-app
npm install
npx expo start
```

## Environment Variables

Each service requires specific environment variables. Copy the example files and configure accordingly:

- `admin-dashboard/.env` - MongoDB URI, API keys
- `face-recognition-api/.env` - Database URL, API credentials
- `mobile-apps/mobile-app/.env` - Server URLs, Cloudinary config

## License

MIT
