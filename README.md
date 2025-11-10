# Fullstack User Profile Management App

A full-stack web application built for a technical test at **Gases del Caribe**.  
This project allows users to register, log in, manage their personal profile, and update their data securely.  
It includes both **frontend (React + TypeScript + TailwindCSS)** and **backend (Node.js + Express + TypeORM + PostgreSQL)** components.

## 🧰 Tech Stack

### Frontend
- **React** with **TypeScript**
- **React Router DOM**
- **React Hook Form** for form handling
- **Axios** for HTTP requests
- **TailwindCSS** for responsive design and styling

### Backend
- **Node.js** + **Express**
- **TypeORM** with **PostgreSQL**
- **express-session** for authentication
- **bcryptjs** for password encryption
- **dotenv** for environment variable management
- **CORS** and **middleware logging**

## 📂 Project Structure

```
project-root/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── userControllers.ts
│   │   ├── db/
│   │   │   └── data-source.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   └── logger.ts
│   │   ├── models/
│   │   │   └── User.ts
│   │   ├── routes/
│   │   │   └── userRoutes.ts
│   │   ├── types/
│   │   │   └── express-session.d.ts
│   │   └── index.ts
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ProtectedRoute.tsx
    │   │   └── PublicRoute.tsx
    │   ├── pages/
    │   │   ├── LoginPage.tsx
    │   │   ├── RegisterPage.tsx
    │   │   └── DashboardPage.tsx
    │   ├── App.tsx
    │   ├── main.tsx
    │   └── index.css
    ├── tailwind.config.js
    └── package.json
```

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/fullstack-profile-app.git
cd fullstack-profile-app
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_user
DB_PASS=your_postgres_password
DB_NAME=your_database_name
PORT=3000
```

Run the backend server:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Access frontend at `http://localhost:5173`  
Backend runs at `http://localhost:3000`

## 🧩 Core Functionalities

- User registration and login
- Session-based authentication
- Profile view and update
- Secure password change (requires current password)
- Logout and session destruction
- Protected and public routes

## 🧠 Backend Endpoints

| Method | Endpoint | Description | Auth |
|:------:|:----------|:-------------|:-----:|
| POST | `/api/users/register` | Register a new user | ❌ |
| POST | `/api/users/login` | Authenticate user and create session | ❌ |
| POST | `/api/users/logout` | Destroy session | ✅ |
| GET | `/api/users/profile` | Get logged-in user profile | ✅ |
| PUT | `/api/users/profile` | Update logged-in user profile | ✅ |

## 🎨 Design & UI

- Fully responsive with **TailwindCSS**
- Clean and modern interface
- Smooth hover and focus animations
- Works on **mobile, tablet, and desktop**

## 🧾 Example Usage

1. Register a new account at `/register`
2. Log in at `/login`
3. Manage your profile at `/dashboard`
4. Update your data or change password
5. Logout to end the session

## 👨‍💻 Author

**Andrés Armenta**  
Fullstack Developer | React, Node.js & PostgreSQL  
📧 your.email@example.com

## 📝 License

This project is distributed for educational and evaluation purposes.
