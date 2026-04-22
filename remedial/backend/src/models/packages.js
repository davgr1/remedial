import mongoose, { Schema, model } from "mongoose";

const packagesSchema = new Schema(
  {
    trackingNumber: { type: String },
    weight: { type: Number },
    dimensions: { type: String },
    description: { type: String },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers",
    },
    status: { type: String },
  },
  {
    timestamps: true,
    strict: false,
  },
);

export default model("Packages", packagesSchema);
