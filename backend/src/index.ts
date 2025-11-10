<<<<<<< HEAD
// src/index.ts
=======
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import { AppDataSource } from './db/data-source';
import userRoutes from './routes/userRoutes';
import { logger } from './middleware/logger';

dotenv.config();
<<<<<<< HEAD
const app = express();

app.set('trust proxy', 1); // Necesario si usas proxy (opcional, pero recomendado)

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, // Crucial para cookies
}));

app.use(express.json());
app.use(logger);

// CONFIGURACIÓN CORRECTA DE SESIÓN
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Cambia a true si usas HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 día
      sameSite: 'lax', // Importante para CORS
=======

const app = express();

//  Configuración general
app.use(express.json());
app.use(logger);

//  CORS: permite peticiones del frontend (ajusta el puerto según tu frontend)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

//  Sesiones (puedes cambiar el secreto a una variable de entorno)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'mi-secreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // solo HTTPS en producción
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 2, // 2 horas
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
    },
  })
);

const PORT = process.env.PORT || 3000;

<<<<<<< HEAD
AppDataSource.initialize()
  .then(() => {
    console.log("Base de datos conectada");

    app.use("/api/users", userRoutes);

    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch((err) => console.error("Error al conectar la base de datos:", err));
=======
//  Conexión a la base de datos
AppDataSource.initialize()
  .then(() => {
    console.log('✅ Base de datos conectada');

    //  Rutas
    app.use('/api/users', userRoutes);

    //  Inicio del servidor
    app.listen(PORT, () =>
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error('❌ Error al conectar la base de datos:', err));
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
