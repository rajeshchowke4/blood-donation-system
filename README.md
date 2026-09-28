# 🩸 Blood Donation Management System

A comprehensive full-stack web application designed to streamline blood donation management by connecting donors with recipients, managing requests, and providing role-based administrative workflows.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This application facilitates blood donation management with multiple user roles and workflows:

- **Donors**: Register profiles and manage their donation information
- **Recipients**: Submit blood requests and track their status
- **Staff**: Review and manage blood requests
- **Administrators**: Oversee the entire system with elevated privileges

The system prioritizes security through JWT authentication, password hashing, and role-based access control (RBAC).

## ✨ Features

### Donor Management
- User registration with validation
- Donor profile creation and management
- Blood group and location-based registration
- Donation history tracking

### Search & Discovery
- Advanced search by blood group
- Location-based donor filtering
- Real-time availability status
- Donor verification indicators

### Blood Request System
- Submit blood requests with required specifications
- Request status tracking (Pending, Approved, Completed, Rejected)
- Request history and management
- Automated notifications

### Role-Based Access Control
- **Donor Role**: Create profiles, view requests
- **Staff Role**: Review and manage requests
- **Admin Role**: System configuration, user management, analytics

### Security
- JWT-based authentication
- Password hashing with bcryptjs
- Secure session management
- CORS protection
- Environment-based configuration

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.2.8
- **Build Tool**: Vite 8.3.0
- **Routing**: React Router DOM 7.18.4
- **Styling**: CSS (custom)
- **Authentication**: JWT with React context

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5.2.1
- **Database**: MongoDB
- **ODM**: Mongoose 9.10.2
- **Security**: bcryptjs 3.0.3, jsonwebtoken 9.0.3
- **Middleware**: CORS 2.8.6, dotenv 18.0.4

### Development Tools
- **Server Auto-reload**: Nodemon 3.1.14
- **Code Quality**: ESLint 10.10.0
- **Type Checking**: React TypeScript support

## 📁 Project Structure
blood-donation-system/ ├── client/ # Frontend React application │ ├── src/ │ │ ├── components/ # Reusable React components │ │ │ ├── Navbar.jsx │ │ │ ├── Footer.jsx │ │ │ ├── DonorForm.jsx │ │ │ ├── RequestForm.jsx │ │ │ └── Dashboard.jsx │ │ ├── pages/ # Page components │ │ │ ├── Home.jsx │ │ │ ├── Login.jsx │ │ │ ├── Register.jsx │ │ │ ├── DonorSearch.jsx │ │ │ ├── RequestTracker.jsx │ │ │ └── AdminPanel.jsx │ │ ├── context/ # React Context API │ │ │ └── AuthContext.jsx │ │ ├── hooks/ # Custom React hooks │ │ │ ├── useAuth.js │ │ │ └── useFetch.js │ │ ├── services/ # API service layer │ │ │ ├── authService.js │ │ │ ├── donorService.js │ │ │ ├── requestService.js │ │ │ └── adminService.js │ │ ├── styles/ # Global and component styles │ │ │ ├── index.css │ │ │ ├── components.css │ │ │ └── pages.css │ │ ├── App.jsx # Root component │ │ └── main.jsx # Entry point │ ├── package.json │ ├── vite.config.js │ ├── eslint.config.js │ └── README.md │ ├── server/ # Backend Express application │ ├── models/ # Mongoose schemas │ │ ├── User.js │ │ ├── Donor.js │ │ ├── BloodRequest.js │ │ └── Admin.js │ ├── routes/ # API route definitions │ │ ├── auth.js │ │ ├── donors.js │ │ ├── requests.js │ │ ├── admin.js │ │ └── users.js │ ├── controllers/ # Business logic │ │ ├── authController.js │ │ ├── donorController.js │ │ ├── requestController.js │ │ └── adminController.js │ ├── middleware/ # Custom middleware │ │ ├── auth.js # JWT verification │ │ ├── roleCheck.js # Role-based access │ │ └── errorHandler.js # Error handling │ ├── config/ # Configuration files │ │ ├── database.js # MongoDB connection │ │ └── constants.js # App constants │ ├── scripts/ # Utility scripts │ │ └── makeAdmin.js # Admin creation script │ ├── utils/ # Utility functions │ │ ├── validators.js │ │ ├── tokenGenerator.js │ │ └── emailService.js │ ├── server.js # Application entry point │ ├── package.json │ ├── .env.example │ └── README.md │ ├── .gitignore ├── LICENSE # MIT License └── README.md # This file

Code

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/rajeshchowke4/blood-donation-system.git
   cd blood-donation-system/server
Install dependencies

bash
npm install
Environment configuration

bash
cp .env.example .env
Update .env with your configuration:

env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blood-donation
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:5173
Start the server

bash
npm run dev
Server runs on http://localhost:5000

Frontend Setup
Navigate to client directory

bash
cd ../client
Install dependencies

bash
npm install
Environment configuration

bash
cp .env.example .env
Update .env:

env
VITE_API_URL=http://localhost:5000/api
Start development server

bash
npm run dev
Application runs on http://localhost:5173

⚙️ Configuration
Database Schema
Users Collection

JavaScript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (enum: ["donor", "staff", "admin"]),
  bloodGroup: String,
  city: String,
  phone: String,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
Blood Requests Collection

JavaScript
{
  _id: ObjectId,
  recipientName: String,
  bloodGroup: String,
  quantity: Number,
  hospital: String,
  city: String,
  status: String (enum: ["pending", "approved", "completed", "rejected"]),
  requiredBy: Date,
  submittedBy: ObjectId (User reference),
  approvedBy: ObjectId (Staff reference),
  createdAt: Date,
  updatedAt: Date
}
JWT Configuration
Algorithm: HS256
Expiration: 24 hours
Payload: { userId, role, email }
📖 Usage
User Registration
bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "bloodGroup": "O+",
  "city": "New York",
  "phone": "1234567890"
}
User Login
bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
Search Donors
bash
GET /api/donors/search?bloodGroup=O+&city=New%20York
Authorization: Bearer <jwt_token>
Submit Blood Request
bash
POST /api/requests
Content-Type: application/json
Authorization: Bearer <jwt_token>

{
  "recipientName": "Patient Name",
  "bloodGroup": "O+",
  "quantity": 2,
  "hospital": "City Hospital",
  "city": "New York",
  "requiredBy": "2024-10-15"
}
🏗️ Architecture
Authentication Flow
Code
Client → Login → Server
  ↓
Server validates credentials against hashed password
  ↓
JWT token generated and returned
  ↓
Client stores token in localStorage/sessionStorage
  ↓
Token included in Authorization header for protected routes
Request Workflow
Code
Donor Registration
  ↓
Donor Profile Creation
  ↓
Recipient submits Blood Request
  ↓
Staff reviews request
  ↓
Request Approved/Rejected
  ↓
Donor notified (via email/notification)
  ↓
Request completed and tracked
📝 API Endpoints
Authentication
POST /api/auth/register - User registration
POST /api/auth/login - User login
POST /api/auth/logout - User logout
Donors
GET /api/donors - List all donors (staff/admin only)
GET /api/donors/search - Search donors by criteria
GET /api/donors/:id - Get donor details
PUT /api/donors/:id - Update donor profile
Blood Requests
GET /api/requests - List requests (role-based)
POST /api/requests - Create new request
GET /api/requests/:id - Get request details
PUT /api/requests/:id/status - Update request status (staff/admin)
Admin
GET /api/admin/users - List all users
GET /api/admin/statistics - System statistics
POST /api/admin/users/:id/promote - Promote user role
🤝 Contributing
Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit changes (git commit -m 'Add some AmazingFeature')
Push to branch (git push origin feature/AmazingFeature)
Open a Pull Request
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👤 Author
Rajesh Chowke

GitHub: @rajeshchowke4
🙏 Acknowledgments
React and Vite communities for excellent tooling
MongoDB and Mongoose for database solutions
Express.js for robust backend framework
Code

This professional README includes:
- ✅ Comprehensive table of contents
- ✅ Detailed project structure with descriptions
- ✅ Complete installation instructions
- ✅ Environment configuration
- ✅ Database schema examples
- ✅ API endpoints documentation
- ✅ Architecture diagrams
- ✅ Usage examples
- ✅ Contributing guidelines
- ✅ Professional formatting and organization

You can now use this README as your repository's main documentation!
