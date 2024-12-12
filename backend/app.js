import dotenv from "dotenv";
dotenv.config("/.env");
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import clinicRouter from "./routes/clinicRouter.js";
import patientRouter from "./routes/patientRouter.js";
import middlewareRouter from "./routes/middlewares.js";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import queueRouter from "./routes/queueRouter.js";
import suggestionRouter from "./routes/suggestionRouter.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://clinicconnect-2.onrender.com",
    credentials: true,
  },
});
connectDB();

app.use(express.json());

app.use(
  cors({
    origin: "https://clinicconnect-2.onrender.com",
    credentials: true,
  })
);
app.use(cookieParser());
const port = process.env.PORT || 4000;
app.use("/api/clinic", clinicRouter);

io.on("connection", (socket) => {
  // Listen for the "join clinic" event
  socket.on("joinClinic", (clinicId) => {
    socket.join(clinicId);
  });
});

app.use("/", middlewareRouter);
app.use("/api/patient",middlewareRouter, patientRouter);
app.use("/api/queue", queueRouter(io));
app.use("/api/suggestion", suggestionRouter);

server.listen(port, () => {
  console.log("Server is running on port 4000");
});
