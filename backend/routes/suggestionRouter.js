import Router from 'express';
import run from '../controllers/healthSuggestions.js';

import dotenv from "dotenv";
import { Mistral } from "@mistralai/mistralai";

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY || "",
});

// Load environment variables
dotenv.config();
const router = Router();
router.post("/", run);

export default router;