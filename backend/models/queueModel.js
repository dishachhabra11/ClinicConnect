import mongoose from "mongoose";
import UserInQueue from "./userInQueue.js"; // Import UserInQueue schema

const queueSchema = new mongoose.Schema({
  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
    required: true,
  },
  patients: {
    type: [UserInQueue.schema], // Array of UserInQueue schema
    required: false, // Make this field optional
  },
  lastToken: {
    type: Number,
    default: 0,
    required: false,
  },
  currentToken: {
    type: Number,
    default: 0,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Queue model
const Queue = mongoose.model("Queue", queueSchema);

export default Queue;
