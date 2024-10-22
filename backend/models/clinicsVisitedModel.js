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
  priorityNumber: {
    type: Number, // Could be generated based on the queue logic
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true, // Available for consultation, set to false if they miss their turn
  },
  status: {
    type: String,
    enum: ["waiting", "missed", "completed", "discarded"],
    default: "waiting", // Initial status
  },
  missedAttempts: {
    type: Number,
    default: 0, // Keeps track of how many times the patient has missed their turn
  },
});

export default mongoose.model("ClinicVisit", ClinicVisitSchema);
