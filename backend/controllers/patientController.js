import Patient from "../models/patientModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import clinicsVisitedModel from "../models/clinicsVisitedModel.js";
import clinicModel from "../models/clinicModel.js";

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
      {
        id: savedPatient._id,
        name: savedPatient.name,
      },
      process.env.JWT_SECRET, // Make sure to set this in your environment variables
      { expiresIn: "15d" } // Token expires in 1 hour
    );
    res.cookie("clinicConnect", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 15 * 24 * 60 * 60 * 1000,
      domain: ".onrender.com",
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
    const token = jwt.sign({ id: patient._id, name: patient.name }, process.env.JWT_SECRET, { expiresIn: "15d" });
    res.cookie("clinicConnect", token, {
      httpOnly: true,
      secure: false,
      sameSite: "None",
      maxAge: 15 * 24 * 60 * 60 * 1000,
     
    });

    // Send the token back to the client
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getClinicsByClinicIds = async (req, res) => {
  try {
    // Extract clinicsVisitedIds from req.user or set to an empty array if not available
    const clinicsVisitedIds = req.user.clinicsVisited ? req.user.clinicsVisited : [];

    if (clinicsVisitedIds.length === 0) {
      return res.status(400).json({ message: "No clinics visited" });
    }

    // Fetch all visited clinics' details from clinicsVisitedModel
    const clinicsVisited = await clinicsVisitedModel.find({
      _id: { $in: clinicsVisitedIds },
    });

    // Map clinicId to find associated clinic details from clinicModel
    const clinicIds = clinicsVisited.map((clinic) => clinic.clinicId);
    const clinics = await clinicModel.find({ _id: { $in: clinicIds } });

    // Combine details of clinicsVisited with the clinic name and other fields from clinicModel
    const clinicsWithDetails = clinicsVisited.map((visited) => {
      const clinic = clinics.find((c) => c._id.toString() === visited.clinicId.toString());
      return {
        ...visited.toObject(), 
        clinicName: clinic ? clinic.name : null,
      };
    });

    // Check if any clinics were found
    if (clinicsWithDetails.length === 0) {
      return res.status(404).json({ message: "No clinics found for the provided IDs" });
    }

    res.status(200).json(clinicsWithDetails);
  } catch (error) {
    console.error("Error fetching clinics by clinic IDs:", error);
    res.status(500).json({ message: error.message });
  }
};

