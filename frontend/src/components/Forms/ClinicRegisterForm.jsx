import React, { useState } from "react";
import EmailField from "../InputFields/EmailField";
import TextField from "../InputFields/TextField";
import PasswordField from "../InputFields/PasswordField";

export const ClinicRegisterForm = () => {
  const [formData, setFormData] = useState({
    clinicName: "",
    email: "",
    password: "",
    healthcareProfessional: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to server)
    console.log(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-6 font-roboto ">Enter your Clinic</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <TextField value={formData.clinicName} onChange={handleChange} label={"Clinic Name"} placeholder="Enter Clinic Name" />
        </div>

        <EmailField value={formData.email} onChange={handleChange} />

        <PasswordField value={formData.password} onChange={handleChange} placeholder="Enter Password" label={"Password"} />

        <input type="checkbox" id="healthcareProfessional" name="healthcareProfessional" checked={formData.healthcareProfessional} onChange={handleChange} className="mr-2" />
        <label htmlFor="healthcareProfessional" className="inline-block text-gray-700">
          My Clinic is verified healthcare services
        </label>

        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">
          Continue
        </button>
      </form>
    </div>
  );
};

export default ClinicRegisterForm;
