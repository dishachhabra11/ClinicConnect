import mongoose from "mongoose";

export const Doctor = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },  
  speciality: [
    {
      type: String,
      required: true,
    },
  ],
});

export default mongoose.model("DoctorModel", Doctor);
