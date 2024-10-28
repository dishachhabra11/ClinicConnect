import mongoose from "mongoose";

const ClinicVisitSchema = new mongoose.Schema({
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
    required: true, // Reference to the clinic the patient is visiting
  },
  symptoms: {
    type: String,
    required: true,
  },
  registrationTime: {
    type: Date,
    default: Date.now, 
  },
  status: {
    type: String,
    enum: ["waiting", "missed", "completed", "discarded"],
    default: "waiting", // Initial status
  },
});

export default mongoose.model("ClinicVisit", ClinicVisitSchema);
