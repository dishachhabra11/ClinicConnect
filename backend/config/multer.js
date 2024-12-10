import multer from "multer";
import {cloudinary} from "./cloudinaryConfig";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "clinic",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
    public_id: (req, file) => file.fieldname + "-" + Date.now(),
  },
});

export const clinicUploads = multer({ storage });


