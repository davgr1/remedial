import { Router } from "express";
import vehiclesController from "../controllers/vehiclesController.js";

const router = Router();

router.post("/", vehiclesController.createVehicle);
router.get("/", vehiclesController.getVehicles);
router.get("/:id", vehiclesController.getVehicleById);
router.put("/:id", vehiclesController.updateVehicle);
router.delete("/:id", vehiclesController.deleteVehicle);

export default router;
