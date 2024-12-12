import React, { useState } from "react";
import EmailField from "../InputFields/EmailField";
import TextField from "../InputFields/TextField";
import PasswordField from "../InputFields/PasswordField";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";

const PatientSigninForm = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/patient/signin-patient`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (!response.data.token) {
        alert("login unsuccessful");
      } else {
        login(response.data.token);
        navigate("/");
        alert("User successfully signed in");
      }
      console.log("login successful", response.data.token);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="sm:text-2xl text-lg font-semibold text-center mb-6 font-roboto">Log in</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        {/* Email */}
        <EmailField value={formData.email} onChange={handleChange} label="Email" placeholder="Enter your email" name="email" />

        {/* Password */}
        <PasswordField value={formData.password} onChange={handleChange} label="Password" placeholder="Enter your password" name="password" />

        {/* Submit Button */}
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all" onClick={handleSubmit}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default PatientSigninForm;
