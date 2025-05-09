import { useState } from "react";
import "./App.css";
import LandingPage from "./Pages/LandingPage";
import ClinicRegisterForm from "./components/Forms/ClinicRegisterForm";
import ClinicSignupForm from "./components/Forms/ClinicSignupForm";
import PatientSignupForm from "./components/Forms/PatientSignupForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchedClinic from "./Pages/SearchedClinic";
import ClinicPage from "./Pages/ClinicPage";
import QueuePage from "./Pages/QueuePage";
import PatientSignInPage from "./Pages/PatientSignInPage";
import CategorySelect from "./Pages/CategorySelect";
import PrescriptionsPage from "./Pages/PrescriptionsPage";
import NotFoundPage from "./Pages/NotFoundPage";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPage from "./Pages/AdminPage";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/clinics" element={<SearchedClinic />} />
            <Route path="/clinic/register" element={<ClinicSignupForm />} />
            <Route path="/clinic/signin" element={<ClinicRegisterForm />} />
            <Route path="/patient/signin" element={<PatientSignInPage />} />
            <Route path="/patient/signup" element={<PatientSignupForm />} />
            <Route path="/clinic/:id" element={<ClinicPage />} />
            <Route path="/queue/:id" element={ <ProtectedRoute element={<QueuePage/>}/>} />
            <Route path="/select" element={<CategorySelect />} />
            <Route path="/prescriptions" element={<PrescriptionsPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/admin/:id" element={<AdminPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
