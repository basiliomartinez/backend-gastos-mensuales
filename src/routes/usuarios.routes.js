import { Router } from "express";
import {
  registrarUsuario,
  loginUsuario,
} from "../controllers/usuarios.controllers.js";
import verificarJWT from "../middlewares/verificarJWT.js";

const router = Router();

router.post("/registro", registrarUsuario);
router.post("/login", loginUsuario);

router.get("/perfil", verificarJWT, (req, res) => {
  res.status(200).json({
    mensaje: "Ruta protegida OK",
    usuario: req.usuario,
  });
});

export default router;