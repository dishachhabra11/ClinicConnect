import patientModel from "../models/patientModel";

const auth = async (req, res, next) => {
  try {
    const id = req.user._id;
    if (!id) {
      return res.status(401).json({
        message: "your are not authorized",
      });
    }
    const patient = await patientModel.findById(id);
    if (!patient) {
      return res.status(401).json({
        message: "your are not authorized",
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(501).json(error.message);
  }
};
