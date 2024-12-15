import Clinic from "../models/clinicModel.js";
import Queue from "../models/queueModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import clinicsVisitedModel from "../models/clinicsVisitedModel.js";
import Comment from "../models/comments.js";

export const createClinic = async (req, res) => {
  try {
    const { name, email, password, address, city, pincode, state, openTimeSlots, openDays, doctorName, doctorSpeciality } = req.body;

    console.log(req); // Handle image URLs from uploaded files
    let imageUrls = [];

    imageUrls.push(req.file.path);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the clinic object
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
      doctor: [
        {
          name: doctorName,
          speciality: doctorSpeciality,
        },
      ],
    });

    // Save clinic to the database
    await clinic.save();
    console.log("Clinic saved:", clinic);

    // Create a queue associated with the clinic
    const queue = new Queue({
      clinicId: clinic._id,
    });
    // // Save the queue to the database
    await queue.save();
    console.log("Queue saved:", queue);

    // Link the queue ID to the clinic and save again
    clinic.queue = queue._id;
    await clinic.save();
    console.log("Updated clinic with queue reference:", clinic);

    // Generate JWT token
    const token = jwt.sign({ id: clinic._id, role: "clinic" }, process.env.JWT_SECRET, { expiresIn: "15d" });

    // Set cookie for the clinic
    res.cookie("clinicConnectAdmin", token, { httpOnly: true, secure: true, sameSite: "None", maxAge: 1000 * 60 * 60 * 24 * 15 });

    // Respond with success
    res.status(201).json({
      message: "Clinic created successfully",
      clinic,
      queue,
      token,
    });
  } catch (error) {
    console.error("Error in createClinic function:", error); // Detailed error logging
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
      return res.status(401).json({ message: "Wrong password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: clinic._id, role: "clinic" }, process.env.JWT_SECRET, { expiresIn: "15d" });

    // Set cookie
    res.cookie("clinicConnectAdmin", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24 * 15, // 15 days
    });

    // Send success response
    return res.status(200).json({
      message: "Clinic signed in successfully",
      clinic: clinic,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error signing in clinic", error });
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
    const clinic = await Clinic.findById(clinicId).populate("comments").populate("queue");

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

    let clinics;

    if (isNumber) {
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
    if (queue.patients.length > 0) {
      for (let i = 0; i < queue.patients.length; i++) {
        if (queue.patients[i].userId == req.user.id) {
          isPresent = queue.patients[i];
          break;
        }
      }
    }
    res.status(200).json({ queue, isPresent });
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve queue", error });
  }
};

// Controller to get clinic details for a given array of clinic IDs
export const getClinicsByClinicIds = async (req, res) => {
  try {
    // Extract clinicsVisited from req.user or set it to an empty array if not available
    const clinicsVisited = req.user.clinicsVisited ? req.user.clinicsVisited : [];

    // Map over clinicsVisited to extract only the _id values
    const clinicIds = clinicsVisited.map((clinic) => clinic._id);

    if (!clinicIds || clinicIds.length === 0) {
      return res.status(400).json({ message: "Invalid or missing clinicIds array" });
    }

    // Find all clinics with the provided IDs
    const clinics = await clinicsVisitedModel.find({ _id: { $in: clinicIds } });

    if (clinics.length === 0) {
      return res.status(404).json({ message: "No clinics found for the provided IDs" });
    }

    res.status(200).json(clinics);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const addCommentToClinic = async (req, res) => {
  try {
    const { clinicId, comment } = req.body;

    // Create a new comment document
    const newComment = new Comment({
      comment,
      username: req.user.name,
    });

    // Save the new comment to the Comment collection
    const savedComment = await newComment.save();

    // Find the clinic and push the comment ObjectId to its comments array
    const clinic = await Clinic.findById(clinicId);

    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    // Add the saved comment's ID to the clinic's comments array
    clinic.comments.push(savedComment._id);

    // Save the clinic document with the updated comments array
    await clinic.save();

    res.status(201).json({ message: "Comment added successfully", comment: savedComment });
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment", error });
  }
};

export const commonSymptoms = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic = await Clinic.findById(id).populate("patients");
    const past_date = new Date();
    past_date.setDate(past_date.getDate() - 7);

    let patients = clinic.patients;

    const commonSymptoms = new Map();

    patients.forEach((patient) => {
      let date = new Date(patient.registrationTime);
      if (date > past_date) {
        let symptoms = patient.symptoms;
        symptoms.map((symptom) => {
          if (commonSymptoms.has(symptom)) {
            commonSymptoms.set(symptom, commonSymptoms.get(symptom) + 1);
          } else {
            commonSymptoms.set(symptom, 1);
          }
        });
      }
    });
    const sortedSymptoms = Array.from(commonSymptoms)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7)
      .map(([symptom, count]) => ({ symptom, count }));

    res.status(200).json({ sortedSymptoms });
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve common symptoms", error });
  }
};
export const getClinicMonthlyPatientFlow = async (req, res) => {
  try {
    const { id } = req.params;
    const clinic = await Clinic.findById(id).populate("patients");
    const patients = clinic.patients;
    const curr_date = new Date();
    const curr_year = curr_date.getFullYear();
    const curr_month = curr_date.getMonth();
    let todayPatientFlow = 0;

    const monthlyPatientFlow = new Map();
    patients.forEach((patient) => {
      let date = new Date(patient.registrationTime);
      let month = date.getMonth();
      let year = date.getFullYear();
      if (year === curr_year) {
        if (monthlyPatientFlow.has(month)) {
          monthlyPatientFlow.set(month, monthlyPatientFlow.get(month) + 1);
        } else {
          monthlyPatientFlow.set(month, 1);
        }
        if(date==curr_date){
          todayPatientFlow++;
        }
      }
    });
    const sortedMonthlyPatientFlow = Array.from(monthlyPatientFlow)
      .sort((a, b) => a[0] - b[0])
      .map(([month, count]) => ({ month, count }));

    return res.status(200).json({ sortedMonthlyPatientFlow, thisMonthPatientFlow: monthlyPatientFlow.get(curr_month) || 0 },todayPatientFlow);
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve monthly patient flow", error });
  }
};

export const closeQueue = async (req, res) => {
  try {
    const clinicId = req.params.id;
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) {
      return { message: "Clinic not found" };
    }
    const queue = await Queue.findById(clinic.queue);
    queue.lastToken = 0;
    queue.currentToken = 0;
    queue.status = "closed";
    await queue.save();
    return res.status(200).json({ message: "Queue closed successfully" });
  } catch (error) {
    console.log(error);
  }
};

export const openQueue = async (req, res) => {
  try {
    const clinicId = req.params.id;
    const clinic = await Clinic.findById(clinicId);
    if (!clinic) {
      return { message: "Clinic not found" };
    }
    const queue = await Queue.findById(clinic.queue);
    queue.status = "open";
    await queue.save();
    return res.status(200).json({ message: "Queue opened successfully" });
  } catch (error) {
    console.log(error);
  }
};
