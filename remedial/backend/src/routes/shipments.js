import { Router } from "express";
import shipmentsController from "../controllers/shipmentsController.js";

const router = Router();

router.post("/", shipmentsController.createShipment);
router.get("/", shipmentsController.getShipments);
router.get("/:id", shipmentsController.getShipmentById);
router.put("/:id", shipmentsController.updateShipment);
router.delete("/:id", shipmentsController.deleteShipment);

export default router;
