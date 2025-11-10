import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
<<<<<<< HEAD
  getProfile,
  updateProfile,
=======
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
} from "../controllers/userControllers";
import { isAuthenticated } from "../middleware/auth";

const router = Router();

<<<<<<< HEAD
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Perfil autenticado
router.get("/profile", isAuthenticated, getProfile);
router.put("/profile", isAuthenticated, updateProfile);
=======
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


>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be

export default router;
