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
    type: String,
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
