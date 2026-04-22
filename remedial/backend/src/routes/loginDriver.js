import { Router } from "express";
import loginDriversController from "../controllers/loginDriversController.js";

const router = Router();

router.post("/", loginDriversController.login);

export default router;
