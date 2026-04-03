import { Router } from "express";
import {
  obtenerGastos,
  crearGasto,
  pagarGasto,
  eliminarGasto,
} from "../controllers/gastos.controllers.js";

const router = Router();

router.get("/", obtenerGastos);
router.post("/", crearGasto);
router.put("/:id", pagarGasto);
router.delete("/:id", eliminarGasto);

export default router;