# 🩸 Blood Donation System

A full-stack **Blood Donation Management System** built with the **MERN stack (MongoDB, Express.js, React, Node.js)**. The application helps manage blood donors, blood requests, users, authentication, and administrative operations through a centralized platform.

---

## 📑 Table of Contents

* [✨ Features](#-features)
* [🛠️ Tech Stack](#️-tech-stack)
* [📁 Project Structure](#-project-structure)
* [🚀 Installation](#-installation)

  * [Prerequisites](#prerequisites)
  * [Backend Setup](#backend-setup)
  * [Frontend Setup](#frontend-setup)
* [⚙️ Configuration](#️-configuration)
* [📊 Database Schema](#-database-schema)
* [🔐 JWT Configuration](#-jwt-configuration)
* [📖 API Usage](#-api-usage)
* [🏗️ Architecture](#️-architecture)
* [📝 API Endpoints](#-api-endpoints)
* [🤝 Contributing](#-contributing)
* [📄 License](#-license)
* [👤 Author](#-author)
* [🙏 Acknowledgments](#-acknowledgments)

---

## ✨ Features

* 👤 User registration and login
* 🔐 JWT-based authentication
* 🩸 Donor registration and management
* 🔎 Search donors by blood group and city
* 🏥 Blood request submission
* 📋 Blood request tracking
* 👨‍💼 Staff and admin role management
* 📊 Admin dashboard and statistics
* 🔄 Blood request approval/rejection workflow
* 📧 Donor notification support
* 🛡️ Role-based access control
* 🗄️ MongoDB database integration
* ⚡ React + Vite frontend
* 🚀 Express.js REST API

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Context API
* JavaScript
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt

### Development Tools

* npm
* Git
* GitHub
* VS Code

---

# 📁 Project Structure

```text
blood-donation-system/
│
├── client/                              # Frontend React application
│   ├── src/
│   │   ├── components/                  # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── DonorForm.jsx
│   │   │   ├── RequestForm.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── pages/                       # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── DonorSearch.jsx
│   │   │   ├── RequestTracker.jsx
│   │   │   └── AdminPanel.jsx
│   │   │
│   │   ├── context/                     # React Context API
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── hooks/                       # Custom React hooks
│   │   │   ├── useAuth.js
│   │   │   └── useFetch.js
│   │   │
│   │   ├── services/                    # API service layer
│   │   │   ├── authService.js
│   │   │   ├── donorService.js
│   │   │   ├── requestService.js
│   │   │   └── adminService.js
│   │   │
│   │   ├── styles/                      # Global and component styles
│   │   │   ├── index.css
│   │   │   ├── components.css
│   │   │   └── pages.css
│   │   │
│   │   ├── App.jsx                      # Root component
│   │   └── main.jsx                     # Application entry point
│   │
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── README.md
│
├── server/                              # Backend Express application
│   ├── models/                          # Mongoose schemas
│   │   ├── User.js
│   │   ├── Donor.js
│   │   ├── BloodRequest.js
│   │   └── Admin.js
│   │
│   ├── routes/                          # API route definitions
│   │   ├── auth.js
│   │   ├── donors.js
│   │   ├── requests.js
│   │   ├── admin.js
│   │   └── users.js
│   │
│   ├── controllers/                     # Business logic
│   │   ├── authController.js
│   │   ├── donorController.js
│   │   ├── requestController.js
│   │   └── adminController.js
│   │
│   ├── middleware/                      # Custom middleware
│   │   ├── auth.js                      # JWT verification
│   │   ├── roleCheck.js                 # Role-based access
│   │   └── errorHandler.js              # Error handling
│   │
│   ├── config/                           # Configuration files
│   │   ├── database.js                  # MongoDB connection
│   │   └── constants.js                 # Application constants
│   │
│   ├── scripts/                          # Utility scripts
│   │   └── makeAdmin.js                 # Admin creation script
│   │
│   ├── utils/                            # Utility functions
│   │   ├── validators.js
│   │   ├── tokenGenerator.js
│   │   └── emailService.js
│   │
│   ├── server.js                         # Backend entry point
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── .gitignore
├── LICENSE                               # MIT License
└── README.md                             # Project documentation
```

---

# 🚀 Installation

## Prerequisites

Before installing the project, make sure you have:

* **Node.js v16 or higher**
* **MongoDB** local installation or MongoDB Atlas
* **npm** or **Yarn**
* **Git**

---

## Backend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/rajeshchowke4/blood-donation-system.git
cd blood-donation-system/server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blood-donation
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

> **Note:** Replace the MongoDB username, password, cluster URL, and JWT secret with your actual values.

### 4. Start the Backend Server

```bash
npm run dev
```

The backend server will run at:

```text
http://localhost:5000
```

---

# 💻 Frontend Setup

Open another terminal and navigate to the client directory:

```bash
cd ../client
```

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Update it with:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start the Development Server

```bash
npm run dev
```

The frontend application will run at:

```text
http://localhost:5173
```

---

# ⚙️ Configuration

The application uses environment variables for database connections, authentication, and frontend/backend communication.

### Backend `.env`

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

> **Security:** Never commit your `.env` file or expose your JWT secret and MongoDB credentials publicly.

---

# 📊 Database Schema

## Users Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,             // Unique
  password: String,          // Hashed
  role: String,              // "donor", "staff", "admin"
  bloodGroup: String,
  city: String,
  phone: String,
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Blood Requests Collection

```javascript
{
  _id: ObjectId,
  recipientName: String,
  bloodGroup: String,
  quantity: Number,
  hospital: String,
  city: String,
  status: String,            // "pending", "approved", "completed", "rejected"
  requiredBy: Date,
  submittedBy: ObjectId,     // User reference
  approvedBy: ObjectId,      // Staff reference
  createdAt: Date,
  updatedAt: Date
}
```

---

# 🔐 JWT Configuration

The application uses **JSON Web Tokens (JWT)** for authentication.

### Configuration

```text
Algorithm: HS256
Expiration: 24 hours
```

### JWT Payload

```javascript
{
  userId,
  role,
  email
}
```

The generated JWT is sent with protected API requests using the following header:

```http
Authorization: Bearer <jwt_token>
```

---

# 📖 API Usage

## User Registration

### Request

```http
POST /api/auth/register
Content-Type: application/json
```

### Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "bloodGroup": "O+",
  "city": "New York",
  "phone": "1234567890"
}
```

---

## User Login

### Request

```http
POST /api/auth/login
Content-Type: application/json
```

### Body

```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

---

## Search Donors

### Request

```http
GET /api/donors/search?bloodGroup=O+&city=New%20York
Authorization: Bearer <jwt_token>
```

This endpoint searches for donors based on blood group and city.

---

## Submit Blood Request

### Request

```http
POST /api/requests
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

### Body

```json
{
  "recipientName": "Patient Name",
  "bloodGroup": "O+",
  "quantity": 2,
  "hospital": "City Hospital",
  "city": "New York",
  "requiredBy": "2024-10-15"
}
```

---

# 🏗️ Architecture

## Authentication Flow

```text
┌──────────────┐
│    Client    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│     Login    │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│ Server validates     │
│ user credentials     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ JWT token generated  │
│ and returned         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Client stores token  │
│ localStorage /       │
│ sessionStorage       │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Token included in    │
│ protected requests   │
└──────────────────────┘
```

---

## Blood Request Workflow

```text
Donor Registration
        ↓
Donor Profile Creation
        ↓
Recipient Submits Blood Request
        ↓
Staff Reviews Request
        ↓
Request Approved / Rejected
        ↓
Donor Notified
        ↓
Request Completed
        ↓
Request Tracked
```

---

# 📝 API Endpoints

## Authentication

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/auth/register` | User registration |
| POST   | `/api/auth/login`    | User login        |
| POST   | `/api/auth/logout`   | User logout       |

## Donors

| Method | Endpoint             | Description                   |
| ------ | -------------------- | ----------------------------- |
| GET    | `/api/donors`        | List all donors — staff/admin |
| GET    | `/api/donors/search` | Search donors by criteria     |
| GET    | `/api/donors/:id`    | Get donor details             |
| PUT    | `/api/donors/:id`    | Update donor profile          |

## Blood Requests

| Method | Endpoint                   | Description                         |
| ------ | -------------------------- | ----------------------------------- |
| GET    | `/api/requests`            | List requests based on role         |
| POST   | `/api/requests`            | Create a blood request              |
| GET    | `/api/requests/:id`        | Get request details                 |
| PUT    | `/api/requests/:id/status` | Update request status — staff/admin |

## Admin

| Method | Endpoint                       | Description           |
| ------ | ------------------------------ | --------------------- |
| GET    | `/api/admin/users`             | List all users        |
| GET    | `/api/admin/statistics`        | Get system statistics |
| POST   | `/api/admin/users/:id/promote` | Promote a user role   |

---

# 🤝 Contributing

Contributions are welcome!

### 1. Fork the Repository

Fork this repository to your GitHub account.

### 2. Create a Feature Branch

```bash
git checkout -b feature/AmazingFeature
```

### 3. Commit Your Changes

```bash
git commit -m "Add some AmazingFeature"
```

### 4. Push the Branch

```bash
git push origin feature/AmazingFeature
```

### 5. Open a Pull Request

Create a Pull Request on GitHub describing your changes.

---

# 📄 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for more information.

---

# 👤 Author

## Rajesh Chowke

**GitHub:** [@rajeshchowke4](https://github.com/rajeshchowke4)

---

# 🙏 Acknowledgments

Special thanks to the communities and technologies that make this project possible:

* ⚛️ React and Vite communities for excellent frontend tooling
* 🍃 MongoDB and Mongoose for database solutions
* 🚀 Express.js for the backend framework
* 🟢 Node.js for the JavaScript runtime
* 🐙 GitHub for version control and collaboration

---

## ⭐ Project Overview

The **Blood Donation System** provides a centralized platform for connecting blood donors with people who need blood. It supports user authentication, donor searching, blood request management, staff approval workflows, and administrative operations.

### Key Components

| Component       | Technology                |
| --------------- | ------------------------- |
| Frontend        | React + Vite              |
| Backend         | Node.js + Express.js      |
| Database        | MongoDB + Mongoose        |
| Authentication  | JWT                       |
| Authorization   | Role-Based Access Control |
| API             | REST API                  |
| Version Control | Git + GitHub              |

---

## 🚀 Getting Started

After completing the setup, run the backend and frontend in separate terminals.

### Terminal 1 — Backend

```bash
cd blood-donation-system/server
npm install
npm run dev
```

### Terminal 2 — Frontend

```bash
cd blood-donation-system/client
npm install
npm run dev
```

Then open:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:5000
```

-
