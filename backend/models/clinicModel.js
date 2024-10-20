import mongoose from "mongoose";

const Clinic = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  priceRange: {
    low: {
      type: Number,
      required: true,
    },
    high: {
      type: Number,
      required: true,
    },
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  doctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: false,
    },
  ],
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: false,
    },
  ],
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
      _id: false,
    },
  ],
  openDays: {
    type: [String],
    enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    required: true,
  },
});

export default mongoose.model("Clinic", Clinic);
