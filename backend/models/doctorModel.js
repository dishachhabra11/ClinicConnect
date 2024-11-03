import mongoose from "mongoose";

const Doctor = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },  
  mobileNo: {
    type: String,
    required: false,
  },

  speciality: [
    {
      type: String,
      required: true,
    },
  ],
  clinic: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

export default mongoose.model("Doctor", Doctor);
