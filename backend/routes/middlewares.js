import { Router } from "express";
import { auth } from "../middlewares/authMiddleware.js";

const router = Router();

router.use((req, res, next) => {
  auth(req, res, next);
});

export default router;
