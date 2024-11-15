import Queue from "../models/queueModel.js";
import UserInQueue from "../models/userInQueue.js";
import clinicModel from "../models/clinicModel.js";
const maxQueueLength = 15;
import patientModel from "../models/patientModel.js";
import clinicsVisitedModel from "../models/clinicsVisitedModel.js";

export const addUserToQueue = async (req, res, io) => {
  const { clinicId, symptoms } = req.body;
  const userId = req.user._id;

  // Input validation
  if (!clinicId || !userId) {
    return res.status(400).json({ message: "clinicId and userId are required" });
  }

  try {
    // Check if the clinic exists
    const clinic = await clinicModel.findById(clinicId);
    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    // Retrieve the queue associated with the clinic
    const queueId = clinic.queue;
    const queue = await Queue.findById(queueId);
    if (!queue) {
      return res.status(404).json({ message: "Queue not found for this clinic" });
    }
    if (queue.patients.length >= maxQueueLength) {
      return res.status(400).json({ message: "Queue is full" });
    }
    for (let i = 0; i < queue.patients.length; i++) {
      if (queue.patients[i].userId.toString() === userId.toString()) {
        return res.status(400).json({ message: "User already in queue" });
      }
    }
    // Increment token number
    const tokenNumber = (queue.lastToken || 0) + 1;

    // Create a new user in the queue
    const newUser = new UserInQueue({
      userId,
      tokenNumber,
      symptoms, // Include symptoms if necessary
    });

    // Update the queue with the new user
    queue.patients.push(newUser);
    queue.lastToken = tokenNumber;
    await queue.save();

    const clinicVisited = new clinicsVisitedModel({
      clinicId: clinicId,
      symptoms: symptoms || "Not specified",
      status: "waiting",
    });
    await clinicVisited.save();

    // Emit the new patient to the clinic
    io.to(clinicId).emit("newPatient", newUser);

    return res.status(201).json({ message: "User added to queue successfully", newUser, currentToken: queue.currentToken });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const dequeueUser = async (req, res, io) => {
  try {
    const { clinicId } = req.body;
    const clinic = await clinicModel.findById(clinicId);
    if (!clinic) {
      return res.status(404).json({ message: "Clinic not found" });
    }

    const queueId = clinic.queue;
    const queue = await Queue.findById(queueId);

    if (!queue || queue.patients.length === 0) {
      return res.status(404).json({ message: "No users in queue" });
    }

    // Dequeue the first user
    const dequeuedUser = queue.patients.shift();
    if (!dequeuedUser) {
      return res.status(500).json({ message: "Dequeued user is undefined" });
    }

    // Update the status of the dequeued user
    dequeuedUser.status = "completed";
    await dequeuedUser.save();

    queue.currentToken = dequeuedUser.tokenNumber;
    await queue.save();

    const clinicVisited = await clinicsVisitedModel.findOneAndUpdate(
      { clinicId },
      { status: "completed" },
      { new: true } // Return the updated document
    );

    if (!clinicVisited) {
      return res.status(500).json({ message: "Clinic visited record error" });
    }

    const patient = await patientModel.findById(dequeuedUser.userId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Update patient's clinicsVisited
    patient.clinicsVisited.push(clinicVisited._id);
    await patient.save();

    io.to(clinicId).emit("userDequeued", {
      tokenNumber: dequeuedUser.tokenNumber,
      userId: dequeuedUser.userId,
    });
    const user = await patientModel.findById(dequeuedUser.userId);
    return res.status(200).json({ message: "User dequeued", user, dequeuedUser });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};
