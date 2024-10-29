import jwt from "jsonwebtoken";
import { unprotectedRoutes } from "../utils/unprotectedRoutes.js";
import patientModel from "../models/patientModel.js";

export const auth = async (req, res, next) => {
  try {
    if (unprotectedRoutes.includes(req.path)) {
      return next();
    }
    let token = "";
    token = req.cookies.clinicConnect;
    if (token==undefined || token=="") {
      return res.status(401).json({
        message: "your are not authorized because token is missing",
      });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).json({
        message: "your are not authorized, token expired",
      });
    }
    const user= await patientModel.findById(verifyToken.id);
    req.user = user;
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(501).json(error.message);
  }
};
