import React, { useState } from "react";
import axios from "axios"; // Import axios
import EmailField from "../InputFields/EmailField";
import TextField from "../InputFields/TextField";
import PasswordField from "../InputFields/PasswordField";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Header } from "../Headers/Header";

const PatientSignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    pincode: "",
    city: "",
    state: "",
    mobileNo: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/patient/create-patient",
        {
          name: formData.name,
          email: formData.email,
          mobileNo: formData.mobileNo, // Ensure this matches the API
          city: formData.city,
          pincode: formData.pincode, // Change this to pincode as per API structure
          state: formData.state,
          gender: formData.gender,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Handle success (e.g., display a success message or redirect)
      console.log("Patient created successfully:", response.data);
      Cookies.set("token", response.data.token, {
        expires: 7, // Optional, set expiry in days
        secure: process.env.NODE_ENV === "production", // Only use secure flag in production
        sameSite: "Lax", // Ensures cookies are sent in cross-site requests
        path: "/",
      });
      navigate("/");
    } catch (error) {
      // Handle error (e.g., display an error message)
      alert("errro occured while sign up");
      console.error("Error creating patient:", error.response.data.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="flex-1 min-w-0 sm:w-1/2 bg-primary min-h-screen"></div>
        <div className="flex-2 w-full sm:w-1/2 bg-white h-screen">
          <div className="container mx-auto px-4 py-8">
            <h2 className="sm:text-xl text-lg font-semibold text-center mb-6 font-roboto">Sign Up</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              {/* Name */}
              <TextField value={formData.name} onChange={handleChange} label="Name" placeholder="Enter your name" name="name" />

              {/* Email */}
              <EmailField value={formData.email} onChange={handleChange} label="Email" placeholder="Enter your email" name="email" />

              {/* Password */}
              <PasswordField value={formData.password} onChange={handleChange} label="Password" placeholder="Enter your password" name="password" />

              {/* Zip Code */}
              <TextField value={formData.pincode} onChange={handleChange} label="Pincode" placeholder="Enter your Pincode" name="pincode" />

              {/* City */}
              <TextField value={formData.city} onChange={handleChange} label="City" placeholder="Enter your City" name="city" />

              {/* State */}
              <TextField value={formData.state} onChange={handleChange} label="State" placeholder="Enter your State" name="state" />

              {/* Mobile Number */}
              <TextField value={formData.mobileNo} onChange={handleChange} label="Mobile Number" placeholder="Enter your Mobile Number" name="mobileNo" />

              {/* Gender */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-dark-gray border-light-gray outline-none font-roboto">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSignupForm;
