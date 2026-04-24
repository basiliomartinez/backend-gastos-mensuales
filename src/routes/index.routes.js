import { Router } from "express";
import gastosRoutes from "./gastos.routes.js";
import cuotasRoutes from "./cuotas.routes.js";
import usuariosRoutes from "./usuarios.routes.js";

const router = Router();

router.use("/gastos", gastosRoutes);
router.use("/cuotas", cuotasRoutes);
router.use("/usuarios", usuariosRoutes);

export default router;