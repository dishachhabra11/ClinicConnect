import Clinic from "../models/clinicModel.js";
import bycrpt from "bcryptjs";
import Queue from "../models/queueModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const createClinic = async (req, res) => {
  const { name, email, password, address, city, pincode, state, openTimeSlots, openDays } = req.body;

  try {
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      console.log(req.files);
      imageUrls = req.files.map((file) => file.path);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const clinic = new Clinic({
      name,
      email,
      password: hashedPassword,
      address,
      city: city.toLowerCase(),
      pincode,
      state: state.toLowerCase(),
      openTimeSlots,
      openDays,
      image: imageUrls || [],
    });

    await clinic.save();

    const queue = new Queue({
      clinicId: clinic._id,
      patients: [],
    });

    clinic.queue = queue._id;
    await queue.save();
    await clinic.save();

    // Generate JWT token
    const token = jwt.sign({ id: clinic._id, role: "clinic" }, process.env.JWT_SECRET, { expiresIn: "15d" });

    // Set cookie
    res.cookie("clinicToken", token, { httpOnly: true, secure: false, sameSite: "Strict", maxAge: 1000 * 60 * 60 * 24 * 15 });

    res.status(201).json({ message: "Clinic created successfully", clinic, queue, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating clinic", error });
  }
};
export const clinicSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the clinic by email
    const clinic = await Clinic.findOne({ email });
    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, clinic.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: clinic._id, role: "clinic" }, process.env.JWT_SECRET, { expiresIn: "15d" });

    // Set cookie
    res.cookie("clinicToken", token, { httpOnly: true, secure: true, sameSite: "Strict", maxAge: 1000 * 60 * 60 * 24 * 15 });

    res.status(200).json({ message: "Clinic signed in successfully", clinic });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error signing in clinic", error });
  }
};

// Update an existing clinic by ID
export const updateClinic = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, address, city, pincode, state, openTimeSlots, openDays } = req.body;

  try {
    const updateData = { name, email, address, city, pincode, state, openTimeSlots, openDays };

    // Hash the password if it is being updated
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const clinic = await Clinic.findByIdAndUpdate(id, updateData, { new: true });

    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }
    res.json({ message: "Clinic updated successfully", clinic });
  } catch (error) {
    res.status(500).json({ message: "Error updating clinic", error });
  }
};

// Delete a clinic by ID
export const deleteClinic = async (req, res) => {
  const { id } = req.params;

  try {
    const clinic = await Clinic.findByIdAndDelete(id);

    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    res.json({ message: "Clinic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting clinic", error });
  }
};

// Get all clinics
export const getAllClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find();
    res.status(200).json(clinics);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve clinics", error });
  }
};

// Get a clinic by ID
export const getClinicById = async (req, res) => {
  try {
    const clinicId = req.params.id;
    const clinic = await Clinic.findById(clinicId);

    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    res.status(200).json(clinic);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve clinic", error });
  }
};

export const searchClinics = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    // Check if the query is a number (could be a pincode)
    const isNumber = !isNaN(query);
    console.log(isNumber);
    console.log(query);

    let clinics;

    if (isNumber) {
      // Search by pincode
      console.log("pincode");
      clinics = await Clinic.find({ pincode: query });
    } else {
      // Search by clinic name using regex for partial matches (case-insensitive)
      clinics = await Clinic.find({
        name: { $regex: new RegExp(query, "i") }, // case-insensitive regex search
      });
    }

    if (clinics.length === 0) {
      return res.status(404).json({ message: "No clinics found" });
    }

    // Return the found clinics
    return res.json({ message: "Clinics found", clinics });
  } catch (error) {
    // Explicitly handle CastError if it occurs
    if (error.name === "CastError") {
      return res.status(400).json({
        message: `Invalid query value: ${error.value}`,
        error: error.message,
      });
    }

    // General error handling for other issues
    return res.status(500).json({ message: "Failed to retrieve clinics", error });
  }
};

export const getQueueByqueueIdandStatus = async (req, res) => {
  try {
    const { queueId } = req.params;
    const queue = await Queue.findById(queueId);
    if (!queue) {
      return res.status(404).json({ message: "Queue not found" });
    }
    let isPresent = false;
    for (let i = 0; i < queue.patients.length; i++) {
      if (queue.patients[i].userId == req.user.id) {
        isPresent = queue.patients[i];
        break;
      }
    }
    res.status(200).json({ queue, isPresent });
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve queue", error });
  }
};
