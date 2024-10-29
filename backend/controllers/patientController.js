import Patient from "../models/patientModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createPatient = async (req, res) => {
  try {
    const { name, email, mobileNo, city, pincode, state, gender, password } = req.body;

    // Validate the input
    if (!name || !email || !mobileNo || !city || !pincode || !state || !gender || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the email already exists
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Patient with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new patient
    const newPatient = new Patient({
      name,
      email,
      mobileNo,
      city,
      pincode,
      state,
      gender,
      password: hashedPassword, // Store the hashed password
    });

    // Save the new patient to the database
    const savedPatient = await newPatient.save();

    // Generate a JWT token
    const token = jwt.sign(
      { id: savedPatient._id },
      process.env.JWT_SECRET, // Make sure to set this in your environment variables
      { expiresIn: "15d" } // Token expires in 1 hour
    );
    res.cookie("clinicConnect", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "Patient created successfully",
      patient: savedPatient,
      token, // Send the token back in the response
    });
  } catch (error) {
    console.error("Error creating patient:", error);
    return res.status(500).json({ message: error.messages });
  }
};

export const signinPatient = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find patient by email
    const patient = await Patient.findOne({ email: email });
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Compare provided password with the hashed password
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, { expiresIn: "15d" });
    res.cookie("clinicConnect", token, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
      maxAge: 15 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    // Send the token back to the client
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
