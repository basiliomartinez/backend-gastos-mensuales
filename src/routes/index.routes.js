import { Router } from "express";
import gastosRoutes from "./gastos.routes.js";
import cuotasRoutes from "./cuotas.routes.js";

const router = Router();

router.use("/gastos", gastosRoutes);
router.use("/cuotas", cuotasRoutes);

export default router;