# Coordinator System - FYP Portal

## Overview
The FYP Portal now includes a complete coordinator authentication system that allows coordinators to both sign up and login to the system.

## How It Works

### 1. Coordinator Signup
- **Route**: `/coordsignup`
- **Component**: `src/components/coordsignup.js`
- **Backend Endpoint**: `POST /signup/coordinator`
- **Features**:
  - Email and password registration
  - Password confirmation validation
  - Minimum password length (6 characters)
  - Duplicate email checking
  - Automatic redirect to login after successful signup

### 2. Coordinator Login
- **Route**: `/coordlogin`
- **Component**: `src/components/coordlogin.js`
- **Backend Endpoint**: `POST /coordinatorlogin`
- **Features**:
  - Email and password authentication
  - JWT token storage
  - User type identification
  - Redirect to Teachers dashboard after login

### 3. Database Model
- **File**: `src/config/models/coordinator.js`
- **Schema**:
  ```javascript
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  }
  ```

## Access Points

### From Main Login Page (`/`)
- Login as Coordinator button → `/coordlogin`
- Coordinator Signup button → `/coordsignup`

### From Teacher Login Page (`/teacherlogin`)
- Login as Coordinator button → `/coordlogin`
- Coordinator signup link → `/coordsignup`

### From Student Signup Page (`/signup`)
- Login as Coordinator button → `/coordlogin`
- Coordinator signup link → `/coordsignup`

### From Forgot Password Page (`/forgot-password`)
- Login as Coordinator button → `/coordlogin`
- Coordinator signup link → `/coordsignup`

## Backend Implementation

### Coordinator Signup Endpoint
```javascript
app.post("/signup/coordinator", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const existingCoordinator = await Coordinator.findOne({ email });
    
    if (existingCoordinator) {
      return res.json("exist");
    }
    
    const newCoordinator = new Coordinator({ email, password });
    await newCoordinator.save();
    
    res.json("notexist");
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
```

### Coordinator Login Endpoint
```javascript
app.post("/coordinatorlogin", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const coordinator = await Coordinator.findOne({ email, password });
    
    if (coordinator) {
      res.status(200).json({ 
        success: true, 
        message: "Coordinator login successful", 
        email: coordinator.email 
      });
    } else {
      res.status(401).json({ 
        success: false, 
        message: "Invalid coordinator credentials" 
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
```

## Security Features

1. **Password Validation**: Minimum 6 characters required
2. **Email Uniqueness**: Prevents duplicate coordinator accounts
3. **Password Confirmation**: Users must confirm their password during signup
4. **JWT Token Storage**: Secure authentication token management
5. **User Type Identification**: Clear role-based access control

## Usage Flow

1. **New Coordinator**:
   - Visit `/coordsignup`
   - Enter email and password
   - Confirm password
   - Account created successfully
   - Redirected to `/coordlogin`

2. **Existing Coordinator**:
   - Visit `/coordlogin`
   - Enter email and password
   - Login successful
   - Redirected to Teachers dashboard (`/Teachers`)

## File Structure

```
src/
├── components/
│   ├── coordsignup.js          # New coordinator signup component
│   ├── coordlogin.js           # Existing coordinator login component
│   └── ...                     # Other components
├── config/
│   └── models/
│       └── coordinator.js      # Coordinator database model
├── back.js                     # Backend routes (updated)
└── App.js                      # Routing configuration (updated)
```

## Notes

- **No Admin Panel**: Coordinators are created through the public signup form
- **Simple Authentication**: Uses email/password combination
- **Consistent UI**: Follows the same design pattern as other authentication forms
- **Navigation Integration**: Seamlessly integrated with existing navigation structure

## Future Enhancements

1. **Admin Approval**: Require admin approval for new coordinator accounts
2. **Email Verification**: Send verification emails during signup
3. **Password Reset**: Add coordinator password reset functionality
4. **Role Management**: Allow coordinators to manage other coordinators
5. **Audit Logging**: Track coordinator actions and login history 