import React, { useState } from "react";
import axios from "axios";
import EmailField from "../InputFields/EmailField";
import PasswordField from "../InputFields/PasswordField";
import { Header } from "../Headers/Header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const ClinicRegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    healthcareProfessional: false, // Include healthcareProfessional in formData
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value, // Update state correctly based on input type
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/clinic/signinClinic`,
        formData,
        { withCredentials: true } // Ensures cookies are included in the request
      );

      // Assuming the cookie `clinicConnectAdmin` is automatically set by the backend

      Cookies.set("clinicConnectAdmin", response.data.token); // Set the cookie with the token
      navigate(`/admin/${response.data.clinic._id}`); // Redirect to the admin page
      a
      alert("Clinic registered successfully!");

      // Optionally redirect or perform other actions
    } catch (error) {

      // Display a meaningful error message
      setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="flex-1 min-w-0 sm:w-1/2 bg-primary min-h-screen"></div>
        <div className="flex-2 w-full sm:w-1/2 bg-white h-screen">
          <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold text-center mb-6 font-roboto">Enter your Clinic</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <EmailField value={formData.email} onChange={handleChange} name="email" />
              <PasswordField value={formData.password} onChange={handleChange} name="password" placeholder="Enter Password" label={"Password"} />
              <input
                type="checkbox"
                id="healthcareProfessional"
                name="healthcareProfessional"
                checked={formData.healthcareProfessional}
                onChange={handleChange} // Update healthcareProfessional in formData
                className="mr-2"
              />
              <label htmlFor="healthcareProfessional" className="inline-block text-gray-700">
                My Clinic is verified healthcare services
              </label>
              {errorMessage && <div className="text-red-500 text-sm mt-2">{errorMessage}</div>}
              <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicRegisterForm;
