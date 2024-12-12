import { Router } from "express";
import { addUserToQueue, dequeueUser } from "../controllers/queueController.js";
import { auth } from "../middlewares/authMiddleware.js";
const queueRouter = (io) => {
  const router = Router();

  // Route to add a user to the queue
  router.post("/add",auth, (req, res) => addUserToQueue(req, res, io));
  router.post("/dequeue",auth, (req, res) => dequeueUser(req, res, io));
    return router;

}

export default queueRouter;
