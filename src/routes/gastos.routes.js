import { Router } from "express";
import {
  listarGastos,
  crearGasto,
  pagarGasto,
  eliminarGasto,
  activarGastoFuturo,
} from "../controllers/gastos.controllers.js";

const router = Router();

router.get("/", listarGastos);
router.post("/", crearGasto);
router.put("/:id", pagarGasto);
router.put("/activar/:id", activarGastoFuturo);
router.delete("/:id", eliminarGasto);

export default router;