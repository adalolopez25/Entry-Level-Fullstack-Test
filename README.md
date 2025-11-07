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
│   ├── migrations/         # Database migrations
│   ├── models/             # Sequelize models
│   │   ├── index.js        # Models index
│   │   └── user.js         # User model
│   ├── services/           # Business logic layer
│   │   ├── auth.service.js      # Authentication service
│   │   └── users.service.js     # User service
│   ├── .env.example        # Environment variables template
│   ├── .sequelizerc        # Sequelize CLI configuration
│   ├── index.js            # Main server file
│   └── package.json        # Backend dependencies
├── frontend/               # React frontend
│   ├── src/                # React source files
│   ├── public/             # Public assets
│   └── package.json        # Frontend dependencies
└── README.md               # This file
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

### Routing
Application routes are defined in a centralized `routes.js` file as an enum for consistency and maintainability.

## Development

- Backend runs on port 3001 by default
- Frontend runs on port 3000 by default
- Both applications need to be running simultaneously for full functionality

## Database Management

### Using TypeORM With Postgresql ##



