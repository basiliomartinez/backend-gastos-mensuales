import { Router } from "express";
import { obtenerGastos } from "../controllers/gastos.controllers.js";

const router = Router();

router.get("/", obtenerGastos);

export default router;