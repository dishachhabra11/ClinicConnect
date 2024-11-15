import mongoose from "mongoose";
import Queue from "./queueModel.js";
import { Doctor } from "./doctorModel.js";

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
      required: false,
    },
    high: {
      type: Number,
      required: false,
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
  queue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Queue",
    required: false,
  },
  doctor: [
    {
      type: Doctor,
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
  openTimeSlots: 
    {
      type: String,
      required: false,
    },
  
  openDays: [
    {
      type: String,
      enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
      required: false,
    },
  ],
  image: [
    {
      type: String,
      required: false,
      default: "https://via.placeholder.com/150",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: false,
   }
  ]
});

export default mongoose.model("Clinic", Clinic);
