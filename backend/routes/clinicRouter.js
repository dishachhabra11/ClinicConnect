import express from "express";
import { createClinic, updateClinic, deleteClinic, getAllClinics, getClinicById, searchClinics } from "../controllers/clinicController.js";
const router = express.Router();

router.post("/", createClinic);
router.get("/filter", searchClinics);// Create a clinic
router.put("/:id", updateClinic); // Update clinic by ID
router.delete("/:id", deleteClinic); // Delete clinic by ID
router.get("/", getAllClinics); // Get all clinics
router.get("/:id", getClinicById); // Get clinic by ID
 // Search clinics

export default router;
