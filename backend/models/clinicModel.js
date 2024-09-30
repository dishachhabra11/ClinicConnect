import mongoose from "mongoose";

const Clinic = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
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
  doctors: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  patients: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  openTimeSlots: [
    {
      startTime: {
        type: String, // e.g., "09:00 AM"
        required: true,
      },
      endTime: {
        type: String, // e.g., "05:00 PM"
        required: true,
      },
    },
  ],
  openDays: {
    type: Array,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    required: true,
  },
});

export default mongoose.model("Clinic", Clinic);
