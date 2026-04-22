import customerModel from "../models/customers.js";

const customerController = {};

customerController.getCustomer = async (req, res) => {
  try {
    const customers = await customerModel.find();
    return res.status(200).json(customers);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

customerController.getCustomerById = async (req, res) => {
  try {
    const customer = await customerModel.findById(req.params.id);
    
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    
    return res.status(200).json(customer);
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

customerController.updateCustomer = async (req, res) => {
  try {
    let {
      name,
      lastName,
      email,
      password,
      phone,
      address,
      isVerified,
      loginAttemps,
      timeOut,
    } = req.body;

    name = name?.trim();
    email = email?.trim();

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Fields required" });
    }

    const customerUpdated = await customerModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        lastName,
        email,
        password,
        phone,
        address,
        isVerified,
        loginAttemps,
        timeOut,
      },
      { new: true },
    );

    if (!customerUpdated) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ message: "Customer updated" });
  } catch (error) {
    console.log("error " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

customerController.deleteCustomer = async (req, res) => {
  try {
    const deleteCustomer = await customerModel.findByIdAndDelete(req.params.id);

    if (!deleteCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ message: "customer deleted" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default customerController;
