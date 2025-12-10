# 🎓 Web-Based FYP Portal

A comprehensive Project (FYP) management system for the Department of Software Engineering, Bahria University Islamabad.

## 🌟 Features

### Authentication & Security
- ✅ **Secure Authentication** - Bcrypt password hashing with 10 salt rounds
- ✅ **JWT Tokens** - Token-based authentication with 24-hour expiry
- ✅ **Password Reset** - OTP-based password reset via email
- ✅ **Multi-User Support** - Students, Teachers, and Coordinators
- ✅ **Email Verification** - Nodemailer integration for OTP delivery

### User Management
- ✅ **Student Portal** - Registration, login, project browsing
- ✅ **Teacher Portal** - Project posting, student management
- ✅ **Coordinator Portal** - System administration and oversight
- ✅ **Profile Management** - User profile updates and management

### Project Management
- ✅ **Project Posting** - Teachers can post FYP projects
- ✅ **Project Browsing** - Students can browse available projects
- ✅ **Request System** - Students can request projects
- ✅ **Assignment System** - Teachers can assign projects to students
- ✅ **Archive System** - Completed projects archiving

### Additional Features
- ✅ **File Upload** - Project document uploads
- ✅ **Notifications** - Real-time notifications system
- ✅ **Edit Requests** - Project modification requests
- ✅ **Responsive Design** - Mobile-friendly interface
- ✅ **Toast Notifications** - User-friendly feedback messages

## 🚀 Tech Stack

### Frontend
- **React** 18.2.0 - UI framework
- **React Router** 6.30.0 - Navigation
- **Bootstrap** 5.3.2 - UI components
- **React Bootstrap** 2.9.1 - React Bootstrap components
- **Axios** 1.8.4 - HTTP client
- **React Toastify** 9.1.3 - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express** 4.21.2 - Web framework
- **MongoDB** - Database
- **Mongoose** 8.12.2 - ODM
- **Bcrypt** 5.1.0 - Password hashing
- **JWT** 9.0.1 - Token authentication
- **Nodemailer** 6.9.4 - Email service
- **Multer** 1.4.5 - File uploads

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Gmail account (for email OTP)

## 🔧 Installation

### 1. Clone the repository
```bash
.....................
cd Web-Based-FYP-Portal
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables

Create a `src/.env` file:

```env
MONGODB_URI=mongodb+srv://faisalkhancodes_db_user:hZMCUTF6KKx0Ddtn@cluster0.ynfuvk4.mongodb.net/
PORT=8000

# Email Configuration for OTP
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_SERVICE=gmail

# JWT Secret
JWT_SECRET=your-secret-key-change-in-production
```

**Important:** Generate a Gmail App Password:
1. Go to Google Account Security
2. Enable 2-Step Verification
3. Generate App Password for "Mail"
4. Use that password in `EMAIL_PASS`

### 4. Start MongoDB

Make sure MongoDB is running:
```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
```

### 5. Migrate Existing Passwords (if upgrading)

If you have existing users with plain text passwords:
```bash
node migrate-passwords.js
```

### 6. Start the Application

```bash
# Development mode (runs both frontend and backend)
npm run dev

# Or run separately:
npm run server  # Backend only
npm start       # Frontend only
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

## 📱 Usage

### For Students
1. **Sign Up**: Create an account at `/signup`
2. **Login**: Access your dashboard at `/`
3. **Browse Projects**: View available FYP projects
4. **Request Projects**: Send requests to teachers
5. **Manage Profile**: Update your information

### For Teachers
1. **Login**: Access teacher portal at `/teacherlogin`
2. **Post Projects**: Add new FYP projects
3. **Manage Requests**: Review student requests
4. **Assign Projects**: Assign projects to students
5. **Track Progress**: Monitor student progress

### For Coordinators
1. **Login**: Access coordinator portal at `/coordlogin`
2. **Manage Users**: Oversee all users
3. **Approve Projects**: Review and approve projects
4. **System Administration**: Manage the system

### Password Reset
1. Click "Forgot Password" on any login page
2. Enter your email address
3. Check email for 6-digit OTP
4. Enter OTP and set new password

## 🔒 Security Features

- **Password Hashing**: All passwords hashed with bcrypt (10 salt rounds)
- **JWT Authentication**: Secure token-based authentication
- **OTP Verification**: Email-based OTP for password reset
- **Input Validation**: Server-side and client-side validation
- **CORS Protection**: Configured CORS policies
- **Environment Variables**: Sensitive data in .env files
- **SQL Injection Prevention**: MongoDB parameterized queries
- **XSS Protection**: React's built-in XSS protection

## 📁 Project Structure

```
Web-Based-FYP-Portal/
├── src/
│   ├── auth/
│   │   ├── authController.js      # Authentication logic
│   │   ├── authRoutes.js          # Auth API routes
│   │   └── passwordUtils.js       # Password utilities
│   ├── components/
│   │   ├── auth/                  # Login/Signup components
│   │   ├── Home.js                # Teacher dashboard
│   │   ├── projects.js            # Projects page
│   │   ├── uploads.js             # Upload management
│   │   └── ...
│   ├── server.js                  # Main server file
│   ├── App.js                     # React app entry
│   └── .env                       # Environment variables
├── public/                        # Static files
├── uploads/                       # Uploaded files
├── migrate-passwords.js           # Password migration script
├── check-all-users.js            # User verification script
├── package.json                   # Dependencies
└── README.md                      # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login/student` - Student login
- `POST /api/auth/login/teacher` - Teacher login
- `POST /api/auth/login/coordinator` - Coordinator login
- `POST /api/auth/forgot-password/{type}` - Request password reset
- `POST /api/auth/verify-otp` - Verify OTP
- `POST /api/auth/reset-password/{type}` - Reset password

### User Management
- `POST /signup/student` - Student registration
- `POST /signup/coordinator` - Coordinator registration
- `POST /addteacher` - Teacher registration
- `GET /teachers` - Get all teachers

### Legacy Endpoints (Backward Compatible)
- `POST /studentlogin` - Legacy student login
- `POST /teacherlogin` - Legacy teacher login
- `POST /coordinatorlogin` - Legacy coordinator login

## 🧪 Testing

### Check All Users
```bash
node check-all-users.js
```

### Migrate Passwords
```bash
node migrate-passwords.js
```

## 🚀 Deployment

### Production Checklist
- [ ] Update `JWT_SECRET` in production .env
- [ ] Configure production MongoDB URI
- [ ] Set up SSL/HTTPS
- [ ] Configure production email service
- [ ] Run password migration if needed
- [ ] Build React app: `npm run build`
- [ ] Set up reverse proxy (nginx/Apache)
- [ ] Configure firewall rules
- [ ] Set up monitoring and logging

### Build for Production
```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- Faisal & Huzaifa
- Department of Software Engineering
- Bahria  University Islamabad

## 📞 Support

For support, email faisalkhan.codes@gmail.com or create an issue in the repository.

## 🙏 Acknowledgments

- Bahria University Islamabad
- Department of Software Engineering
- All contributors and users

---

**Made with ❤️ for FYP Management**
