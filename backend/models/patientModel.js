import mongoose from "mongoose";

const Patient = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
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
  clinicsVisited: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  prescriptions: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});
export default mongoose.model("Patient", Patient);
