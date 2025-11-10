import { Request, Response, NextFunction } from "express";


export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session && req.session.user) {
    // Usuario autenticado → permitir acceso
    return next();
  }

  // si No hay sesión activa - denegar acceso
  return res.status(401).json({
    message: "No autorizado. Por favor, inicia sesión primero.",
  });
};
