import express from "express";
import { createPatient,signinPatient } from "../controllers/patientController.js";

const router = express.Router();

router.post("/create-patient", createPatient);
router.post("/signin-patient", signinPatient);

export default router;
