import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import { AppDataSource } from './db/data-source';
import userRoutes from './routes/userRoutes';
import { logger } from './middleware/logger';

dotenv.config();

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
    },
  })
);

const PORT = process.env.PORT || 3000;

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
