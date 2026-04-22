import mongoose, { Schema, model } from "mongoose";

const vehiclesSchema = new Schema(
  {
    plate: { type: String },
    model: { type: String },
    capacity: { type: Number },
    status: { type: String },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Drivers",
    },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("Vehicles", vehiclesSchema);
