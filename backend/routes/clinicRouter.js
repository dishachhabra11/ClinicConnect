import express from "express";
import { createClinic, updateClinic, deleteClinic, getAllClinics, getClinicById, searchClinics, clinicSignIn, getQueueByqueueIdandStatus, addCommentToClinic, commonSymptoms } from "../controllers/clinicController.js";
import { upload } from "../config/cloudinaryConfig.js";
import { auth } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.post("/createClinic", upload.single("image"), createClinic);
router.post("/signinClinic", clinicSignIn);
router.post("/postComment",auth, addCommentToClinic);
router.get("/filter", searchClinics);
router.get("/getQueue/:queueId", auth, getQueueByqueueIdandStatus); // Search clinics
router.get("/commonSymptoms/:id");
router.put("/:id", updateClinic); // Update clinic by ID
router.delete("/:id", deleteClinic); // Delete clinic by ID
router.get("/",auth, getAllClinics); // Get all clinics
router.get("/:id",auth, getClinicById); // Get clinic by ID

export default router;
