import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userControllers";
import { isAuthenticated } from "../middleware/auth";

const router = Router();

/**
 * Rutas públicas
 */

router.post("/register", registerUser); // Crear cuenta
router.post("/login", loginUser);       // Iniciar sesión

/**
 * Rutas protegidas (solo usuarios autenticados)
 */
router.post("/logout", isAuthenticated, logoutUser);

//  Obtener datos del usuario autenticado
router.get("/me", isAuthenticated, (req, res) => {
  return res.json(req.session.user);
});

//  Actualizar perfil del usuario autenticado
router.put("/me", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user!.id;
    req.params.id = userId.toString();
    await updateUser(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
});

//  Eliminar cuenta del usuario autenticado
router.delete("/me", isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user!.id;
    req.params.id = userId.toString(); // reutilizamos el controlador existente
    await deleteUser(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
});



export default router;
