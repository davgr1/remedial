import { Schema, model } from "mongoose";

const routesSchema = new Schema(
  {
    origin: { type: String },
    destination: { type: String },
    distance: { type: Number },
    estimatedTime: { type: String },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("Routes", routesSchema);
