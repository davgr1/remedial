import driversModel from "../models/drivers.js";

const driversController = {};

driversController.getDrivers = async (req, res) => {
  try {
    const drivers = await driversModel.find();
    return res.status(200).json(drivers); 
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

driversController.getDriverById = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await driversModel.findById(id);

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    return res.status(200).json(driver);
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

driversController.updateDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDriver = await driversModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    return res.status(200).json({ message: "Driver updated successfully", driver: updatedDriver });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

driversController.deleteDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDriver = await driversModel.findByIdAndDelete(id);

    if (!deletedDriver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    return res.status(200).json({ message: "Driver deleted successfully" });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default driversController;
