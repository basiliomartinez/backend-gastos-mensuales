import { Router } from "express";
import gastosRoutes from "./gastos.routes.js";

const router = Router();

router.use("/gastos", gastosRoutes);

export default router;