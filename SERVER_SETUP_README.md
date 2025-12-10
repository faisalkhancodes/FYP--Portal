# Server Setup Guide

## Problem Identified
The coordinator couldn't add teachers because **no server was running on port 9000** to handle the API requests. The `back.js` file contained all the endpoints but was never executed as a server.

## Solution Implemented
Created a comprehensive `server.js` file that combines all necessary endpoints and runs on port 9000.

## How to Run the Server

### Option 1: Run Server Only
```bash
npm run server
```
This will start only the backend server on port 9000.

### Option 2: Run Both Server and React App (Recommended)
```bash
npm run dev
```
This will start both the backend server (port 9000) and React app (port 3000) simultaneously.

### Option 3: Manual Start
```bash
node server.js
```

## What the Server Provides

### Teacher Management (Port 9000)
- `POST /addteacher` - Add new teacher
- `GET /teachers` - Get all teachers
- `PUT /teachers/:id` - Update teacher
- `DELETE /teachers/:id` - Delete teacher

### Authentication
- `POST /studentlogin` - Student login
- `POST /teacherlogin` - Teacher login
- `POST /coordinatorlogin` - Coordinator login
- `POST /signup/student` - Student registration
- `POST /signup/coordinator` - Coordinator registration

### Projects & Requests
- `POST /upload-project` - Upload project files
- `GET /projects` - Get all projects
- `POST /submit-request` - Submit project request
- `GET /requests` - Get all requests

## Database Connection
- MongoDB running on `mongodb://0.0.0.0:27017/Fyplogin`
- Collections: Students, Teachers, Coordinators, Projects, Requests

## Troubleshooting

### If MongoDB is not running:
1. Start MongoDB service
2. Ensure it's running on port 27017
3. Check if the database "Fyplogin" exists

### If port 9000 is already in use:
1. Change the PORT variable in `server.js`
2. Update the frontend API calls accordingly

### If you get module not found errors:
1. Run `npm install` to install dependencies
2. Ensure all required packages are in package.json

## Testing the Teacher Addition

1. Start the server: `npm run server`
2. Open the React app: `npm start`
3. Login as coordinator
4. Navigate to "Add Teachers"
5. Fill the form and submit
6. Check the server console for logs
7. Verify in MongoDB that the teacher was added

## Server Logs
The server will show detailed logs including:
- MongoDB connection status
- API request details
- Teacher creation logs
- Any errors that occur

## File Structure
```
├── server.js (Main server file - NEW)
├── src/
│   ├── mongo.js (Database models)
│   ├── components/AddTeach.js (Teacher management UI)
│   └── ...
└── package.json (Updated with server scripts)
``` 