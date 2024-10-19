import Patient from "../models/patientModel.js";

export const createPatient = async (req, res) => {
  try {
    const { name, email, mobileNo, city, pincode, state, gender, clinicsVisited } = req.body;

    // Validate the input
    if (!name || !email || !mobileNo || !city || !pincode || !state || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the email already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient with this email already exists" });
    }
    // Create a new patient
    const newPatient = new Patient({
      name,
      email,
      mobileNo,
      city,
      pincode,
      state,
      gender});

    // Save the new patient to the database
    const savedPatient = await newPatient.save();

    return res.status(201).json({ message: "Patient created successfully", patient: savedPatient });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
