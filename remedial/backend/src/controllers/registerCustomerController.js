import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import customerModel from "../models/customers.js";

import { config } from "../../config.js";

const registerCustomerController = {};

registerCustomerController.register = async (req, res) => {
  const { name, lastName, email, password, phone, address, isVerified } = req.body;

  try {
    const existsCustomer = await customerModel.findOne({ email });
    if (existsCustomer) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    const passwordHashed = await bcryptjs.hash(password, 10);

    const randomNumber = crypto.randomBytes(3).toString("hex");

    const token = jsonwebtoken.sign(
      {
        randomNumber,                                                        
        name,
        lastName,
        email,
        password: passwordHashed,
        phone,
        address,
        isVerified,
      },
      config.JWT.secret,
      { expiresIn: "15m" },
    );

    res.cookie("resgistrationCookie", token, { maxAge: 15 * 60 * 1000 });

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
      subject: "Verificación de cuenta",
      text:
        "Para verificar tu cuenta, utiliza este código: " +
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

registerCustomerController.verifyCode = async (req, res) => {
  try {
    const { verificationCodeRequest } = req.body;

    const token = req.cookies.resgistrationCookie;

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const {
      randomNumber: storedCode,
      name,
      lastName,
      email,
      password,
      phone,
      address,
      isVerified,
    } = decoded;

    if (verificationCodeRequest !== storedCode) {
      return res.status(400).json({ message: "Invalid code" });
    }

    const NewCustomer = new customerModel({
      name,
      lastName,
      email,
      password,
      phone,
      address,
      isVerified,
      isVerified: true,
    });

    await NewCustomer.save();

    res.clearCookie("resgistrationCookie")

    return res.status(200).json({message: "Customer registered"})

  } catch (error) {
    console.log("error"+error)
    return res.status(500).json({message: "Internal server error"})
  }
};

export default registerCustomerController