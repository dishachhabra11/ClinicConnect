import { useState } from "react";

import "./App.css";
import { Header } from "./components/Headers/Header";
import LandingPage from "./Pages/LandingPage";
import ClinicRegisterForm from "./components/Forms/ClinicRegisterForm";
import ClinicSignupForm from "./components/Forms/ClinicSignupForm";
import PatientSigninForm from "./components/Forms/PatientSigninForm";
import PatientSignupForm from "./components/Forms/PatientSignupForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchedClinic from "./Pages/SearchedClinic";
import ClinicPage from "./Pages/ClinicPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/clinics" element={<SearchedClinic />} />
          <Route path="/clinic/register" element={<ClinicRegisterForm />} />
          <Route path="/clinic/signup" element={<ClinicSignupForm />} />
          <Route path="/patient/signin" element={<PatientSigninForm />} />
          <Route path="/patient/signup" element={<PatientSignupForm />} />
          <Route path="/clinic" element={<ClinicPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
