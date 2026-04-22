import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import driverModel from "../models/drivers.js";

import { config } from "../../config.js";

const registerDriverController = {};

registerDriverController.register = async (req, res) => {
  const { name, lastName, licenseNumber, phone, email, password, isActive } = req.body;

  try {
    const existsDriver = await driverModel.findOne({ email });
    if (existsDriver) {
      return res.status(400).json({ message: "Driver already exists" });
    }

    const passwordHashed = await bcryptjs.hash(password, 10);

    const randomNumber = crypto.randomBytes(3).toString("hex");

    const token = jsonwebtoken.sign(
      {
        randomNumber,
        name,
        lastName,
        licenseNumber,
        phone,
        email,
        password: passwordHashed,
        isActive,
      },
      config.JWT.secret,
      { expiresIn: "15m" },
    );

    res.cookie("registrationDriverCookie", token, { maxAge: 15 * 60 * 1000 });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_email,
        pass: config.email.user_password,
      },
    });

    const mailOptions = {
      from: config.email.user_email,
      to: email,
      subject: "Verificación de cuenta - Conductor",
      text:
        "Para verificar tu cuenta de conductor, utiliza este código: " +
        randomNumber +
        " expira en 15 minutos",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Error sending email" });
      }
      return res.status(200).json({ message: "Email sent" });
    });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

registerDriverController.verifyCode = async (req, res) => {
  try {
    const { verificationCodeRequest } = req.body;

    const token = req.cookies.registrationDriverCookie;

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const {
      randomNumber: storedCode,
      name,
      lastName,
      licenseNumber,
      phone,
      email,
      password,
      isActive,
    } = decoded;

    if (verificationCodeRequest !== storedCode) {
      return res.status(400).json({ message: "Invalid code" });
    }

    const newDriver = new driverModel({
      name,
      lastName,
      licenseNumber,
      phone,
      email,
      password,
      isActive,
      isVerified: true,
    });

    await newDriver.save();

    res.clearCookie("registrationDriverCookie");

    return res.status(200).json({ message: "Driver registered" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default registerDriverController;
