import React from "react";
import PatientSigninForm from "../components/Forms/PatientSigninForm";
import { Header } from "../components/Headers/Header";

const PatientSignInPage = () => {
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="flex-1 min-w-0 sm:w-1/2 bg-primary min-h-screen"></div>
        <div className="flex-2 w-full sm:w-1/2 bg-white h-screen">
          <PatientSigninForm />
        </div>
      </div>
    </div>
  );
};

export default PatientSignInPage;
