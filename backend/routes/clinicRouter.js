import express from "express";
import { createClinic, updateClinic, deleteClinic, getAllClinics, getClinicById, searchClinics, clinicSignIn, getQueueByqueueIdandStatus, addCommentToClinic } from "../controllers/clinicController.js";
import { upload } from "../config/cloudinaryConfig.js";
const router = express.Router();

router.post("/createClinic", upload.single("image"), createClinic);
router.post("/signinClinic", clinicSignIn);
router.post("/postComment", addCommentToClinic);
router.get("/filter", searchClinics); // Create a clinic
router.get("/getQueue/:queueId", getQueueByqueueIdandStatus); // Search clinics
router.put("/:id", updateClinic); // Update clinic by ID
router.delete("/:id", deleteClinic); // Delete clinic by ID
router.get("/", getAllClinics); // Get all clinics
router.get("/:id", getClinicById); // Get clinic by ID

export default router;
