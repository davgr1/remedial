import packagesModel from "../models/packages.js";

const packagesController = {};

packagesController.createPackage = async (req, res) => {
  try {
    const { trackingNumber, weight, dimensions, description, senderId, receiverId, status } = req.body;

    const newPackage = new packagesModel({
      trackingNumber,
      weight,
      dimensions,
      description,
      senderId,
      receiverId,
      status,
    });

    await newPackage.save();
    return res.status(201).json({ message: "Package created successfully", package: newPackage });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

packagesController.getPackages = async (req, res) => {
  try {
    const packages = await packagesModel.find().populate("senderId receiverId");
    return res.status(200).json(packages);
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

packagesController.getPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const package_ = await packagesModel.findById(id).populate("senderId receiverId");

    if (!package_) {
      return res.status(404).json({ message: "Package not found" });
    }

    return res.status(200).json(package_);
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

packagesController.updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPackage = await packagesModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    return res.status(200).json({ message: "Package updated successfully", package: updatedPackage });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

packagesController.deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPackage = await packagesModel.findByIdAndDelete(id);

    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    return res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default packagesController;
