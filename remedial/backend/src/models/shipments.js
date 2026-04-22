import mongoose, { Schema, model } from "mongoose";

const shipmentsSchema = new Schema(
  {
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Packages",
    },
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Routes",
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drivers",
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicles",
    },
    departureDate: { type: Date },
    deliveryDate: { type: Date },
    status: { type: String },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("Shipments", shipmentsSchema);
