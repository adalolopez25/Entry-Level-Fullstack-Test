import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../db/data-source";
import { User } from "../models/User";

const userRepository = AppDataSource.getRepository(User);

//  REGISTRAR USUARIO
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existing = await userRepository.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = userRepository.create({ name, email, password: hashed });
    await userRepository.save(user);

    // Guardamos sesión automáticamente al registrar
    req.session.user = { id: user.id, name: user.name, email: user.email };

    res.json({
      message: "Usuario registrado correctamente",
      user: req.session.user,
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ message: "Error en el registro" });
  }
};

//  LOGIN
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    // Guardar sesión
    req.session.user = { id: user.id, name: user.name, email: user.email };

    res.json({
      message: "Inicio de sesión exitoso",
      user: req.session.user,
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

//  LOGOUT
export const logoutUser = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Error al cerrar sesión" });
    res.clearCookie("connect.sid"); // limpia cookie de sesión
    res.json({ message: "Sesión cerrada correctamente" });
  });
};

//  OBTENER USUARIO AUTENTICADO
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "No hay usuario autenticado" });
    }

    const { id } = req.session.user;
    const user = await userRepository.findOne({
      where: { id },
      select: ["id", "name", "email"],
    });

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(user);
  } catch (error) {
    console.error("Error al obtener usuario actual:", error);
    res.status(500).json({ message: "Error al obtener usuario actual" });
  }
};

//  ACTUALIZAR USUARIO (solo el propio)
export const updateUser = async (req: Request, res: Response) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const userId = req.session.user.id;
    const { name, email, password } = req.body;

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    user.name = name || user.name;
    user.email = email || user.email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await userRepository.save(user);

    // Actualizamos la sesión
    req.session.user = { id: user.id, name: user.name, email: user.email };

    res.json({
      message: "Usuario actualizado correctamente",
      user: req.session.user,
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};
