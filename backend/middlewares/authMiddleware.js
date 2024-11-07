import jwt from "jsonwebtoken";
import { unprotectedRoutes } from "../utils/unprotectedRoutes.js";
import patientModel from "../models/patientModel.js";

export const auth = async (req, res, next) => {
  try {
    
    const isUnprotected = unprotectedRoutes.some((route) => (route instanceof RegExp ? route.test(req.path) : route === req.path));
  console.log("Auth middlewares");
    if (isUnprotected) {
      console.log("Unprotected route");
      return next();
      
    }

    let token = req.cookies.clinicConnect;
    if (!token) {
      return res.status(401).json({
        message: "You are not authorized because the token is missing",
      });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).json({
        message: "You are not authorized, token expired",
      });
    }
    else {
      console.log("Token verified");
    }

    const user = await patientModel.findById(verifyToken.id);
    req.user = user;
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }
};
