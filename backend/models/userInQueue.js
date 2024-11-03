import mongoose, { Mongoose } from "mongoose";
import patientModel from "./patientModel.js";

const userInQueueSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  tokenNumber: {
    type: Number,
    required: true,
  },
  symptoms: {
    type: [String],
    enum: ["Fever", "Cough", "Cold", "Headache", "Body Pain", "Fatigue", "Shortness of Breath", "Nausea", "Vomiting", "Diarrhea", "Muscle Pain", "Sore Throat", "Dizziness", "Chest Pain", "Loss of Appetite", "Abdominal Pain", "Chills", "Joint Pain", "Swelling", "Rash", "Constipation", "Heart Palpitations", "Back Pain", "Numbness", "Excessive Sweating", "Blurred Vision", "Frequent Urination", "Skin Itching", "Dry Mouth", "Ear Pain", "Weight Loss"],
    required: false,
  },
  status: {
    type: String,
    enum: ["waiting", "called", "completed"], // Adjust statuses as needed
    default: "waiting",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the UserInQueue model
const UserInQueue = mongoose.model("UserInQueue", userInQueueSchema);

export default UserInQueue;
