import vehiclesModel from "../models/vehicles.js";

const vehiclesController = {};

vehiclesController.createVehicle = async (req, res) => {
  try {
    const { plate, model, capacity, status, driverId } = req.body;

    const newVehicle = new vehiclesModel({
      plate,
      model,
      capacity,
      status,
      driverId,
    });

    await newVehicle.save();
    return res.status(201).json({ message: "Vehicle created successfully", vehicle: newVehicle });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

vehiclesController.getVehicles = async (req, res) => {
  try {
    const vehicles = await vehiclesModel.find().populate("driverId");
    return res.status(200).json(vehicles);
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

vehiclesController.getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const vehicle = await vehiclesModel.findById(id).populate("driverId");

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    return res.status(200).json(vehicle);
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

vehiclesController.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVehicle = await vehiclesModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    return res.status(200).json({ message: "Vehicle updated successfully", vehicle: updatedVehicle });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

vehiclesController.deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVehicle = await vehiclesModel.findByIdAndDelete(id);

    if (!deletedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    return res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default vehiclesController;
