import React, { useState } from "react";
import EmailField from "../InputFields/EmailField";
import TextField from "../InputFields/TextField";
import PasswordField from "../InputFields/PasswordField";

const PatientSigninForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
      <h2 className="text-3xl font-semibold text-center mb-6 font-roboto">Log in</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        {/* Name */}
        <TextField value={formData.name} onChange={handleChange} label="Name" placeholder="Enter your name" name="name" />

        {/* Email */}
        <EmailField value={formData.email} onChange={handleChange} label="Email" placeholder="Enter your email" name="email" />

        {/* Password */}
        <PasswordField value={formData.password} onChange={handleChange} label="Password" placeholder="Enter your password" name="password" />

        {/* Submit Button */}
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default PatientSigninForm;
