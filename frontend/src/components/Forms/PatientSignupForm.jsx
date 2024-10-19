import React, { useState } from "react";
import EmailField from "../InputFields/EmailField";
import TextField from "../InputFields/TextField";
import PasswordField from "../InputFields/PasswordField";

const PatientSignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    zipCode: "",
    city: "",
    state: "",
    mobileNumber: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-6 font-roboto">Sign Up</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        {/* Name */}
        <TextField value={formData.name} onChange={handleChange} label="Name" placeholder="Enter your name" name="name" />

        {/* Email */}
        <EmailField value={formData.email} onChange={handleChange} label="Email" placeholder="Enter your email" name="email" />

        {/* Password */}
        <PasswordField value={formData.password} onChange={handleChange} label="Password" placeholder="Enter your password" name="password" />

        {/* Date of Birth */}
        <TextField value={formData.dob} onChange={handleChange} label="Date of Birth" placeholder="Enter your Date of Birth" name="dob" type="date" />

        {/* Zip Code */}
        <TextField value={formData.zipCode} onChange={handleChange} label="Zip Code" placeholder="Enter your Zip Code" name="zipCode" />

        {/* City */}
        <TextField value={formData.city} onChange={handleChange} label="City" placeholder="Enter your City" name="city" />

        {/* State */}
        <TextField value={formData.state} onChange={handleChange} label="State" placeholder="Enter your State" name="state" />

        {/* Mobile Number */}
        <TextField value={formData.mobileNumber} onChange={handleChange} label="Mobile Number" placeholder="Enter your Mobile Number" name="mobileNumber" />

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
  );
};

export default PatientSignupForm;
