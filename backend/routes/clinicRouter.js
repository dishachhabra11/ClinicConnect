import express from "express";
import { createClinic, updateClinic, deleteClinic, getAllClinics, getClinicById, searchClinics, clinicSignIn, getQueueByqueueIdandStatus } from "../controllers/clinicController.js";
import clinicUploads from "../middlewares/clinicImage.js";
const router = express.Router();

router.post("/createClinic", clinicUploads, createClinic);
router.post("/signinClinic", clinicSignIn);
router.get("/filter", searchClinics); // Create a clinic
router.get("/getQueue/:queueId", getQueueByqueueIdandStatus); // Search clinics

router.put("/:id", updateClinic); // Update clinic by ID
router.delete("/:id", deleteClinic); // Delete clinic by ID
router.get("/", getAllClinics); // Get all clinics
router.get("/:id", getClinicById); // Get clinic by ID
// Search clinics

export default router;
