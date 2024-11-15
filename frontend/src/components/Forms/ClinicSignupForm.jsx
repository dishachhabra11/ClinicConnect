import React, { useState } from "react";
import EmailField from "../InputFields/EmailField";
import TextField from "../InputFields/TextField";
import PasswordField from "../InputFields/PasswordField";
import { Header } from "../Headers/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ClinicSignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    pincode: "",
    city: "",
    state: "",
    address: "",
    openTimeSlots: "",
    openDays: "",
    doctorName: "",
    doctorSpeciality: "",
    healthcareProfessional: false,
  });
  const [clinicImages, setClinicImages] = useState(null); // For image file upload

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    setClinicImages(e.target.files[0]); // Update image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });
    if (clinicImages) form.append("clinicImages", clinicImages);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/clinic/createClinic`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { token } = response.data;
      Cookies.set("clinicConnectAdmin", token, { expires: 15, sameSite: "strict" });

      const clinicId = response.data.clinic._id;
      navigate(`/admin/${clinicId}`);
      alert("Clinic created successfully");
    } catch (error) {
      console.error("Error creating clinic:", error);
    }
  };
  console.log(formData);

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="flex-1 min-w-0 sm:w-1/2 bg-primary min-h-screen"></div>
        <div className="flex-2 w-full sm:w-1/2 bg-white h-screen">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold text-center mb-6 font-roboto">Clinic Registration</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              {/* Clinic Name */}
              <TextField value={formData.name} onChange={handleChange} label="Clinic Name" placeholder="Enter Clinic Name" name="name" />

              {/* Email */}
              <EmailField value={formData.email} onChange={handleChange} label="Email" placeholder="Enter your Email" name="email" />

              {/* Password */}
              <PasswordField value={formData.password} onChange={handleChange} placeholder="Enter your Password" label="Password" name="password" />

              {/* Zip Code */}
              <TextField value={formData.pincode} onChange={handleChange} label="Zip Code" placeholder="Enter Zip Code" name="pincode" type="number" />

              {/* Address */}
              <TextField value={formData.address} onChange={handleChange} label="Address" placeholder="Enter Address" name="address" />

              {/* City */}
              <TextField value={formData.city} onChange={handleChange} label="City" placeholder="Enter City" name="city" />

              {/* State */}
              <TextField value={formData.state} onChange={handleChange} label="State" placeholder="Enter State" name="state" />

              {/* Open Time Slots */}
              <TextField value={formData.openTimeSlots} onChange={handleChange} label="Open Time Slots" placeholder="Enter Open Time Slots (e.g. 9 AM - 5 PM)" name="openTimeSlots" />

              {/* Open Days */}
              <TextField value={formData.openDays} onChange={handleChange} label="Open Days" placeholder="Enter Open Days (e.g. Mon - Fri)" name="openDays" />

              {/* Doctor Name */}
              <TextField value={formData.doctorName} onChange={handleChange} label="Doctor Name" placeholder="Enter Doctor Name" name="doctorName" />

              {/* Doctor Speciality */}
              <TextField value={formData.doctorSpeciality} onChange={handleChange} label="Doctor Speciality" placeholder="Enter Doctor Speciality" name="doctorSpeciality" />

              {/* Image Upload */}
              <label className="block font-medium mb-2">Clinic Image</label>
              <input type="file" onChange={handleImageChange} className="w-full" accept="image/*" />

              {/* Submit Button */}
              <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicSignupForm;
