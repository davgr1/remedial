import shipmentsModel from "../models/shipments.js";

const shipmentsController = {};

shipmentsController.createShipment = async (req, res) => {
  try {
    const { packageId, routeId, driverId, vehicleId, departureDate, deliveryDate, status } = req.body;

    const newShipment = new shipmentsModel({
      packageId,
      routeId,
      driverId,
      vehicleId,
      departureDate,
      deliveryDate,
      status,
    });

    await newShipment.save();
    return res.status(201).json({ message: "Shipment created successfully", shipment: newShipment });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

shipmentsController.getShipments = async (req, res) => {
  try {
    const shipments = await shipmentsModel.find()
      .populate("packageId")
      .populate("routeId")
      .populate("driverId")
      .populate("vehicleId");
    return res.status(200).json(shipments);
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

shipmentsController.getShipmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const shipment = await shipmentsModel.findById(id)
      .populate("packageId")
      .populate("routeId")
      .populate("driverId")
      .populate("vehicleId");

    if (!shipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    return res.status(200).json(shipment);
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

shipmentsController.updateShipment = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedShipment = await shipmentsModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedShipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    return res.status(200).json({ message: "Shipment updated successfully", shipment: updatedShipment });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

shipmentsController.deleteShipment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedShipment = await shipmentsModel.findByIdAndDelete(id);

    if (!deletedShipment) {
      return res.status(404).json({ message: "Shipment not found" });
    }

    return res.status(200).json({ message: "Shipment deleted successfully" });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default shipmentsController;
