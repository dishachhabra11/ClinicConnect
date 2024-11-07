import express from "express";
import { createPatient,getClinicsByClinicIds,signinPatient } from "../controllers/patientController.js";

const router = express.Router();

router.post("/create-patient", createPatient);
router.post("/signin-patient", signinPatient);
router.get("/getVisitedClinics", getClinicsByClinicIds);

export default router;
