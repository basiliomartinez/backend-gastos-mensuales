import { Router } from "express";
import {
  listarCuotas,
  crearCuota,
  pagarCuota,
  editarCuota,
  eliminarCuota,
} from "../controllers/cuotas.controllers.js";
import verificarJWT from "../middlewares/verificarJWT.js";

const router = Router();

router.get("/", verificarJWT, listarCuotas);
router.post("/", verificarJWT, crearCuota);
router.put("/editar/:id", verificarJWT, editarCuota);
router.put("/:id", verificarJWT, pagarCuota);
router.delete("/:id", verificarJWT, eliminarCuota);

export default router;