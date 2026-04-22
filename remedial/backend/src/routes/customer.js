import express from "express";
import customerController from "../controllers/customerController.js";

const router = express.Router();

router.route("/")
    .get(customerController.getCustomer);

router.route("/:id")
  .get(customerController.getCustomerById)
  .put(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

export default router;
