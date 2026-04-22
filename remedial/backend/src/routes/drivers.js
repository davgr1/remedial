import { Router } from "express";
import driversController from "../controllers/driversController.js";

const router = Router();

router.get("/", driversController.getDrivers);
router.get("/:id", driversController.getDriverById);
router.put("/:id", driversController.updateDriver);
router.delete("/:id", driversController.deleteDriver);

export default router;
