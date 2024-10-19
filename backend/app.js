import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import clinicRouter from "./routes/clinicRouter.js";
import patientRouter from "./routes/patientRouter.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

app.use("/api/clinic", clinicRouter);
app.use("/api/patient", patientRouter);

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.listen(port, () => {
  console.log("Server is running on port 4000");
});
