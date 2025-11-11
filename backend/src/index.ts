// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import { AppDataSource } from './db/data-source';
import userRoutes from './routes/userRoutes';
import { logger } from './middleware/logger';

dotenv.config();

const app = express();

// Configuración para producción (Render, Vercel, etc.)
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // Necesario detrás de proxy (Render/Vercel)
}

// CORS: permite frontend (local o producción)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());
app.use(logger);

// CONFIGURACIÓN SEGURA DE SESIÓN
const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'fallback-secret-very-secure-123',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // HTTPS en producción
    maxAge: 1000 * 60 * 60 * 24, // 24 horas
    sameSite: 'lax' as const,
  },
};

app.use(session(sessionConfig));

// Rutas
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

// Conexión a la base de datos
AppDataSource.initialize()
  .then(() => {
    console.log('Base de datos conectada');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      if (process.env.NODE_ENV === 'production') {
        console.log(`URL pública: ${process.env.RENDER_EXTERNAL_URL || 'https://tu-app.onrender.com'}`);
      }
    });
  })
  .catch((err) => {
    console.error('Error al conectar la base de datos:', err);
    process.exit(1);
  });