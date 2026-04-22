import routesModel from "../models/routes.js";

const routesController = {};

routesController.createRoute = async (req, res) => {
  try {
    const { origin, destination, distance, estimatedTime } = req.body;

    const newRoute = new routesModel({
      origin,
      destination,
      distance,
      estimatedTime,
    });

    await newRoute.save();
    return res.status(201).json({ message: "Route created successfully", route: newRoute });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

routesController.getRoutes = async (req, res) => {
  try {
    const routes = await routesModel.find();
    return res.status(200).json(routes);
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

routesController.getRouteById = async (req, res) => {
  try {
    const { id } = req.params;
    const route = await routesModel.findById(id);

    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    return res.status(200).json(route);
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

routesController.updateRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRoute = await routesModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedRoute) {
      return res.status(404).json({ message: "Route not found" });
    }

    return res.status(200).json({ message: "Route updated successfully", route: updatedRoute });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

routesController.deleteRoute = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRoute = await routesModel.findByIdAndDelete(id);

    if (!deletedRoute) {
      return res.status(404).json({ message: "Route not found" });
    }

    return res.status(200).json({ message: "Route deleted successfully" });
  } catch (error) {
    console.log("error: " + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default routesController;
