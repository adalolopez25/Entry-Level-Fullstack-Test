import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { AppDataSource } from "../db/data-source";
import { User } from "../models/User";

const userRepository = AppDataSource.getRepository(User);

<<<<<<< HEAD
//  Registrar usuario
=======
//  REGISTRAR USUARIO
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existing = await userRepository.findOne({ where: { email } });
<<<<<<< HEAD
    if (existing)
      return res.status(400).json({ message: "El correo ya está registrado" });
=======
    if (existing) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be

    const hashed = await bcrypt.hash(password, 10);
    const user = userRepository.create({ name, email, password: hashed });
    await userRepository.save(user);

<<<<<<< HEAD
    res.json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
=======
    // Guardamos sesión automáticamente al registrar
    req.session.user = { id: user.id, name: user.name, email: user.email };

    res.json({
      message: "Usuario registrado correctamente",
      user: req.session.user,
    });
  } catch (error) {
    console.error("Error en registro:", error);
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
    res.status(500).json({ message: "Error en el registro" });
  }
};

<<<<<<< HEAD
// controllers/userControllers.ts → loginUser
=======
//  LOGIN
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

<<<<<<< HEAD
    const user = await userRepository.findOne({ 
      where: { email },
      select: ['id', 'name', 'email', 'password'] // Asegura que traiga password
    });
    
=======
    const user = await userRepository.findOne({ where: { email } });
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
    if (!user)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Contraseña incorrecta" });

<<<<<<< HEAD
    // GUARDA EN SESIÓN
    req.session.user = { id: user.id, name: user.name, email: user.email };

    // NO envíes password ni datos sensibles
    res.json({ 
      message: "Inicio de sesión exitoso",
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error(error);
=======
    // Guardar sesión
    req.session.user = { id: user.id, name: user.name, email: user.email };

    res.json({
      message: "Inicio de sesión exitoso",
      user: req.session.user,
    });
  } catch (error) {
    console.error("Error en login:", error);
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

<<<<<<< HEAD
//  Cerrar sesión
export const logoutUser = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Error al cerrar sesión" });
=======
//  LOGOUT
export const logoutUser = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Error al cerrar sesión" });
    res.clearCookie("connect.sid"); // limpia cookie de sesión
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
    res.json({ message: "Sesión cerrada correctamente" });
  });
};

<<<<<<< HEAD
// ✅ Obtener perfil del usuario autenticado
export const getProfile = (req: Request, res: Response) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "No autorizado" });
  }
  res.json(req.session.user);
};

//  Actualizar perfil del usuario autenticado
export const updateProfile = async (req: Request, res: Response) => {
  try {
    if (!req.session.user)
      return res.status(401).json({ message: "No autorizado" });

    const { id } = req.session.user;
    const { name, email, currentPassword, newPassword } = req.body;

    const user = await userRepository.findOne({ where: { id } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Si el usuario quiere cambiar la contraseña
    if (newPassword) {
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match)
        return res.status(400).json({ message: "Contraseña actual incorrecta" });

      user.password = await bcrypt.hash(newPassword, 10);
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await userRepository.save(user);
    req.session.user = { id: user.id, name: user.name, email: user.email };

    res.json({ message: "Perfil actualizado correctamente", user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar perfil" });
=======
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
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
  }
};
