import mongoose from "mongoose";

export const Doctor = new mongoose.Schema({
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
  // clinic: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: false,
  // },
});

export default mongoose.model("DoctorModel", Doctor);
