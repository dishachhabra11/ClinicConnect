import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import clinicRouter from "./routes/clinicRouter.js";
import patientRouter from "./routes/patientRouter.js";
import middlewareRouter from "./routes/middlewares.js";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";
import queueRouter from "./routes/queueRouter.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

dotenv.config();
connectDB();
// const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
const port = process.env.PORT || 4000;

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for the "join clinic" event
  socket.on("joinClinic", (clinicId) => {
    socket.join(clinicId);
    console.log("user joined clinic of id", clinicId);
  });


});

app.use("/", middlewareRouter);
app.use("/api/clinic", clinicRouter);
app.use("/api/patient", patientRouter);
app.use("/api/queue", queueRouter(io));

server.listen(port, () => {
  console.log("Server is running on port 4000");
});
