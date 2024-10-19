import mongoose from "mongoose";

const ClinicVisitSchema = new mongoose.Schema({
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
    required: true,
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
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
});

// Export the schema
export default mongoose.model("ClinicVisit", ClinicVisitSchema);
