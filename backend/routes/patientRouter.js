import express from "express";
import { createPatient, getClinicsByClinicIds, signinPatient } from "../controllers/patientController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-patient", createPatient);
router.post("/signin-patient", signinPatient);
router.get("/getVisitedClinics",auth, getClinicsByClinicIds);

export default router;
