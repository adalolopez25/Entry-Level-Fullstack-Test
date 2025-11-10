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
    },
  })
);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Base de datos conectada");

    app.use("/api/users", userRoutes);

    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
  })
  .catch((err) => console.error("Error al conectar la base de datos:", err));