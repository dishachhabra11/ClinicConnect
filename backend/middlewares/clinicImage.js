import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinaryConfig.js";
import multer from "multer";


const clinicStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "clinic",
        allowedFormats: ["jpg", "png"],
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        public_id: (req, file) => file.fieldname + "-" + Date.now(),
    }
})

const clinicUploads = multer({ storage: clinicStorage });
export default clinicUploads.array("clinicImages", 5);