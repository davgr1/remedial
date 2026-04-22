import { Router } from "express";
import registerDriverController from "../controllers/registerDriverController.js";

const router = Router();

router.post("/", registerDriverController.register);
router.post("/verify", registerDriverController.verifyCode);

export default router;
