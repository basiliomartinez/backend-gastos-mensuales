import { Router } from "express";
import {
  obtenerGastos,
  crearGasto,
  pagarGasto,
} from "../controllers/gastos.controllers.js";

const router = Router();

router.get("/", obtenerGastos);
router.post("/", crearGasto);
router.put("/:id", pagarGasto);

export default router;