import { Router } from "express";
import packagesController from "../controllers/packagesController.js";

const router = Router();

router.post("/", packagesController.createPackage);
router.get("/", packagesController.getPackages);
router.get("/:id", packagesController.getPackageById);
router.put("/:id", packagesController.updatePackage);
router.delete("/:id", packagesController.deletePackage);

export default router;
