import { useState } from "react";

import "./App.css";
import { Header } from "./components/Header";
import LandingPage from "./Pages/LandingPage";
import ClinicRegisterForm from "./components/Forms/ClinicRegisterForm";

function App() {
  return (
    <>
      {/* <LandingPage /> */}
      <ClinicRegisterForm/>
    </>
  );
}

export default App;
