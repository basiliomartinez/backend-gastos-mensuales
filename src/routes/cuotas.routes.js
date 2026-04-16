import { Router } from "express";
import {
  listarCuotas,
  crearCuota,
  pagarCuota,
  eliminarCuota,
} from "../controllers/cuotas.controllers.js";

const router = Router();

router.get("/", listarCuotas);
router.post("/", crearCuota);
router.put("/:id", pagarCuota);
router.delete("/:id", eliminarCuota);

export default router;