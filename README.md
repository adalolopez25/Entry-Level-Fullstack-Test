<<<<<<< HEAD
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
=======
# Entry-Level-Fullstack-Test

A simple fullstack application with Node.js/Express backend and React frontend.

## Project Structure

```
├── backend/                # Node.js + Express backend
│   ├── config/             # Database configuration
│   │   └── config.js       # Sequelize database config
│   ├── controllers/        # Route controllers
│   │   ├── auth.controller.js   # Authentication endpoints
│   │   └── users.controller.js  # User endpoints
│   ├── models/             # TYPEORM Model
│   │   ├── Task.ts       # Task Model
│   │   └── User.ts        # User model
│   │   └── project.ts        # Project model
│   │   └── category.ts        # Category model
│   │   └── comment.ts        # Comment model

│   ├── db           # Database Connection
│   │   ├── data.source.ts     # Authentication service
│   ├── routes
│   │   ├── taskRoutes.ts Router managemente for task
│   │   ├── userRoutes.ts Router maganement for user
│   ├── .env        # Environment variables template
│   ├── index.js            # Main server file
│   └── package.json        # Backend dependencies


├── frontend/               # React frontend
│   ├── src/                # React source files
│   ├── public/             # Public assets
│   └── package.json        # Frontend dependencies
│   └── tsconfig.json        # TypeScript setting
└── README.md               # This file here show all function that I use and this project
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database server

### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your database credentials and JWT secret:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=mydatabase
   DB_USER=myuser
   DB_PASSWORD=mypassword
   PORT=3000
   ```


The backend server will run on `http://localhost:3000`

Available endpoints:
- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint
- `GET /users` - Get all users
- `POST /auth/login` 


### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The React app will run on `http://localhost:3000`

## Technologies Used

### Backend
- [Node.js](https://nodejs.org/docs/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web application framework
- [PostgreSQL](https://www.postgresql.org/docs/) - Relational database (via [pg](https://node-postgres.com/) driver)
- [dotenv](https://github.com/motdotla/dotenv#readme) - Environment variable management

### Backend Development Tools
- [ESLint](https://eslint.org/docs/latest/) - Linting tool
- [eslint-config-standard](https://github.com/standard/eslint-config-standard) - Standard JavaScript style guide

### Frontend
- [React](https://react.dev/) - JavaScript library for building user interfaces
- [React DOM](https://react.dev/reference/react-dom) - React package for working with the DOM
- [React Scripts](https://create-react-app.dev/docs/getting-started) - Configuration and scripts for Create React App
- [React Router DOM](https://reactrouter.com/) - Declarative routing for React
- [React Hook Form](https://react-hook-form.com/) - Performant form validation library


## Frontend Development Patterns

### Form Handling
This project uses **React Hook Form** with the `Controller` component pattern for form inputs. This pattern is preferred for better integration with Material-UI components and controlled form state management.

Example:
```tsx

const { useForm} = useForm();

 <input
            type="email"
            {...register("email", {
              required: "El email es obligatorio",
              minLength: {
                value: 10,
                message: "Email must be at least 10 character",
              },
              maxLength: {
                value: 20,
                message: "Email tiene que tener maximo 20 caracteres",
              },
            })}
```

For more information, visit the [React Hook Form documentation](https://react-hook-form.com/).

## Rutas Protegidas##
si el usuario no esta logeado no puede entrar al dashboard
y si esta logeado si intenta ingresar al "/login" desde la URL lo enviara de nuevo al login hasta que ingrese

### Routing
Application routes are defined in a centralized `routes.js` file as an enum for consistency and maintainability.

## Development

- Backend runs on port 3001 by default
- Frontend runs on port 3000 by default
- Both applications need to be running simultaneously for full functionality

## Database Management

### Using TypeORM With Postgresql ##


#Entry-Level-Fullstack-Test

A simple fullstack application with Node.js/Express backend and React frontend.

## Project Structure

```
├── backend/ # Node.js + Express backend
│ ├── config/ # Database configuration
│ │ └── config.js # Sequelize database config
│ ├── controllers/ # Route controllers
│ │ ├── auth.controller.js # Authentication endpoints
│ │ └── users.controller.js # User endpoints
│ ├── models/ # TYPEORM Model
│ │ ├── Task.ts # Task Model
│ │ └── User.ts # User model
│ │ └── project.ts # Project model
│ │ └── category.ts # Category model
│ │ └── comment.ts # Comment model

│ ├── db # Database Connection
│ │ ├── data.source.ts # Authentication service
│ ├── routes
│ │ ├── taskRoutes.ts Router managemente for task
│ │ ├── userRoutes.ts Router magazine for user
│ ├── .env # Environment variables template
│ ├── index.js # Main server file
│ └── package.json # Backend dependencies


├── frontend/ # React frontend
│ ├── src/ # React source files
│ ├── public/ # Public assets
│ └── package.json # Frontend dependencies
│ └── tsconfig.json # TypeScript setting
└── README.md # This file here show all function that I use and this project
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database server

###Backend

1. Navigate to the backend directory: 
```bash 
cd backend 
```

2. Install dependencies: 
```bash 
npm install 
```

3. Create a `.env` file based on `.env.example`: 
```bash 
cp .env.example .env 
```

4. Update the `.env` file with your database credentials and JWT secret: 
``` 
DB_HOST=localhost 
DB_PORT=5432 
DB_NAME=mydatabase 
DB_USER=myuser 
DB_PASSWORD=mypassword 
PORT=3000 
```


The backend server will run on `http://localhost:3000`

Available endpoints:
- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint
- `GET /users` - Get all users
- `POST /auth/login`


### Frontend

1. Navigate to the frontend directory: 
```bash 
CD frontend 
```

2. Install dependencies: 
```bash 
npm install 
```

3. Start the development server: 
```bash 
npm start 
```

The React app will run on `http://localhost:3000`

## Technologies Used

###Backend
- [Node.js](https://nodejs.org/docs/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web application framework
- [PostgreSQL](https://www.postgresql.org/docs/) - Relational database (via [pg](https://node-postgres.com/) driver)
- [dotenv](https://github.com/motdotla/dotenv#readme) - Environment variable management

### Backend Development Tools
- [ESLint](https://eslint.org/docs/latest/) - Linting tool
- [eslint-config-standard](https://github.com/standard/eslint-config-standard) - Standard JavaScript style guide

### Frontend
- [React](https://react.dev/) - JavaScript library for building user interfaces
- [React DOM](https://react.dev/reference/react-dom) - React package for working with the DOM
- [React Scripts](https://create-react-app.dev/docs/getting-started) - Configuration and scripts for Create React App
- [React Router DOM](https://reactrouter.com/) - Declarative routing for React
- [React Hook Form](https://react-hook-form.com/) - Performant form validation library


## Frontend Development Patterns

### Form Handling
This project uses **React Hook Form** with the `Controller` component pattern for form inputs. This pattern is preferred for better integration with Material-UI components and controlled form state management.

Example:
```tsx

const { useForm } = useForm(); 

<input 
type="email" 
{...register("email", { 
required: "Email is required", 
minLength: { 
value: 10, 
message: "Email must be at least 10 characters", 
}, 
maxLength: { 
value: 20, 
message: "Email must have a maximum of 20 characters", 
}, 
})}
```

For more information, visit the [React Hook Form documentation](https://react-hook-form.com/).

## Protected Routes##
If the user is not logged in, they cannot access the dashboard.
If they are logged in, attempting to access "/login" from the URL will redirect them back to the login page until they log in.

### Routing
Application routes are defined in a centralized `routes.js` file as an enum for consistency and maintainability.

## Development

- Backend runs on port 3001 by default
- Frontend runs on port 3000 by default
- Both applications need to be running simultaneously for full functionality

## Database Management

### Using TypeORM With PostgreSQL ##

## IMPROVEMENTS ##

Deleting tasks is not currently working; this will be implemented in a future project. Upon accessing the dashboard, it only displays



## MEJORAS ##

El eliminar de las tareas no funciona actualmente sera implementada en un siguiente proyecto
al ingresar al dashboard solo muestra Sr Usuario como mensaje posible mejora mostrar el nombre del usuario que ingreso


## IMPROVEMENTS ##

Deleting tasks is not currently working; this will be implemented in a future project. Upon logging into the dashboard, only the "Mr. User" message is displayed. A possible improvement would be to show the name of the logged-in user.

Responsive design functionality works on computers and tablets, but it doesn't yet work properly on mobile devices.
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
