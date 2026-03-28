import { Router } from "express";
import {
  obtenerGastos,
  crearGasto,
} from "../controllers/gastos.controllers.js";

const router = Router();

router.get("/", obtenerGastos);
router.post("/", crearGasto);

export default router;