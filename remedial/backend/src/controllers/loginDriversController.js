import driverModel from "../models/drivers.js";

import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import { config } from "../../config.js";

const loginDriversController = {};

loginDriversController.login = async (req, res) => {
  const { email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Correo inválido" });
  }

  try {
    const driverFound = await driverModel.findOne({ email });

    if (!driverFound) {
      return res.status(400).json({ message: "Driver not found" });
    }

    if (driverFound.timeOut && driverFound.timeOut > Date.now()) {
      return res.status(403).json({ message: "Cuenta bloqueada" });
    }

    const isMatch = await bcrypt.compare(password, driverFound.password);

    if (!isMatch) {
      driverFound.loginAttemps = (driverFound.loginAttemps || 0) + 1;

      if (driverFound.loginAttemps >= 5) {
        driverFound.timeOut = Date.now() + 5 * 60 * 1000;
        driverFound.loginAttemps = 0;

        await driverFound.save();

        return res
          .status(403)
          .json({ message: "Cuenta bloqueada por multiples intentos fallidos" });
      }

      await driverFound.save();

      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    driverFound.loginAttemps = 0;
    driverFound.timeOut = null;

    const token = jsonwebtoken.sign(
      { id: driverFound._id, userType: "Driver" },
      config.JWT.secret,
      { expiresIn: "30d" },
    );

    res.cookie("authDriverCookie", token);

    return res.status(200).json({ message: "Login exitoso" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default loginDriversController;
