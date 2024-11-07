import mongoose from "mongoose";
import Medicine from "./medicineModel.js";

const Prescription = new mongoose.Schema({
  clinic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  medications: [Medicine],
  dateIssued: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model("Prescription", Prescription);
