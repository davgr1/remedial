import { Router } from "express";
import routesController from "../controllers/routesController.js";

const router = Router();

router.post("/", routesController.createRoute);
router.get("/", routesController.getRoutes);
router.get("/:id", routesController.getRouteById);
router.put("/:id", routesController.updateRoute);
router.delete("/:id", routesController.deleteRoute);

export default router;
