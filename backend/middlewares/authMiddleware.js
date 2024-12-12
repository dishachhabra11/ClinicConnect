import jwt from "jsonwebtoken";
import { unprotectedRoutes } from "../utils/unprotectedRoutes.js";
import patientModel from "../models/patientModel.js";
import clinicModel from "../models/clinicModel.js";

export const auth = async (req, res, next) => {
  try {
    const isUnprotected = unprotectedRoutes.some((route) => (route instanceof RegExp ? route.test(req.path) : route === req.path));
    if (isUnprotected) {
      return next();
    }

    let token = req.cookies.clinicConnect;
    let role = "patient";

    console.log("user token", token);

    if (!token) {
      console.log("role is admin");
      token = req.cookies.clinicConnectAdmin;
      role = "admin";
      if (!token) {
        return res.status(401).json({
          message: "You are not authorized because the token is missing",
        });
      } else {
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!verifyToken) {
          return res.status(401).json({
            message: "You are not authorized, token expired",
          });
        } else {
        }
        const clinic = await clinicModel.findById(verifyToken.id);
        req.user = clinic;
        next();
      }
    }

    else {
       console.log("role is user");
       const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
       if (!verifyToken) {
         return res.status(401).json({
           message: "You are not authorized, token expired",
         });
       } else {
       }

       const user = await patientModel.findById(verifyToken.id);
       req.user = user;
       next();
   }
  } catch (error) {
    return res.status(501).json({ message: error.message });
  }
};
