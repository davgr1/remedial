import express from "express";
import packagesRoutes from "./src/routes/packages.js";
import vehiclesRoutes from "./src/routes/vehicles.js";
import driversRoutes from "./src/routes/drivers.js";
import routesRoutes from "./src/routes/routesRoutes.js";
import shipmentsRoutes from "./src/routes/shipments.js";
import customerRoutes from "./src/routes/customer.js";
import registerCustomerRoutes from "./src/routes/registerCustomer.js";
import registerDriverRoutes from "./src/routes/registerDriver.js";
import cookieParser from "cookie-parser";
import loginCustomerRoutes from "./src/routes/login.js";
import loginDriverRoutes from "./src/routes/loginDriver.js";
import logoutRoutes from "./src/routes/logout.js";
import cors from "cors";

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
}));


app.use(cookieParser());

app.use(express.json());

app.use("/api/packages", packagesRoutes);
app.use("/api/vehicles", vehiclesRoutes);
app.use("/api/drivers", driversRoutes);
app.use("/api/routes", routesRoutes);
app.use("/api/shipments", shipmentsRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/registerCustomer", registerCustomerRoutes);
app.use("/api/registerDriver", registerDriverRoutes);
app.use("/api/login", loginCustomerRoutes);
app.use("/api/loginDriver", loginDriverRoutes);
app.use("/api/logout", logoutRoutes);
export default app;