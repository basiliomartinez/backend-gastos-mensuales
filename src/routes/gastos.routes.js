import { Router } from "express";
import {
  listarGastos,
  crearGasto,
  pagarGasto,
  eliminarGasto,
  activarGastoFuturo,
  editarGasto,
} from "../controllers/gastos.controllers.js";
import verificarJWT from "../middlewares/verificarJWT.js";

const router = Router();

router.get("/", verificarJWT, listarGastos);
router.post("/", verificarJWT, crearGasto);

router.put("/editar/:id", verificarJWT, editarGasto);
router.put("/activar/:id", verificarJWT, activarGastoFuturo);
router.put("/:id", verificarJWT, pagarGasto);

router.delete("/:id", verificarJWT, eliminarGasto);

export default router;