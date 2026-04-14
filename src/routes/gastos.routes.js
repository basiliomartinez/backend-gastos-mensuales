import { Router } from "express";
import {
  listarGastos,
  crearGasto,
  pagarGasto,
  eliminarGasto,
} from "../controllers/gastos.controllers.js";

const router = Router();

router.get("/", listarGastos);
router.post("/", crearGasto);
router.put("/:id", pagarGasto);
router.delete("/:id", eliminarGasto);

export default router;