import jwt from "jsonwebtoken";
import { unprotectedRoutes } from "../utils/unprotectedRoutes.js";

export const auth = async (req, res, next) => {
  try {
    console.log(req.path);
    if (unprotectedRoutes.includes(req.path)) {
      return next();
    }
    let token = "";
    token = req.cookies.clinicConnect;
    console.log("token", token);
    if (token==undefined || token=="") {
      return res.status(401).json({
        message: "your are not authorized",
      });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).json({
        message: "your are not authorized, token expired",
      });
    }
    req.userId = verifyToken.id;
    next();
  } catch (error) {
    return res.status(501).json(error.message);
  }
};
