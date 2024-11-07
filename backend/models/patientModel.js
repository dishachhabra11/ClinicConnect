import mongoose from "mongoose";
import ClinicVisit from "./clinicsVisitedModel.js"; // Correct import for the ClinicVisit model

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required:true,
  },
  mobileNo: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  // Define the array with the schema reference
  clinicsVisited: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClinicVisit",// Referencing the schema, not the model itself
      required: false, // Optional field
    },
  ]
});

export default mongoose.model("Patient", PatientSchema);
