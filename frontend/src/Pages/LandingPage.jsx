import React from "react";
import { Header } from "../components/Header";
import landingImage from "../assets/images/landing.jpg";
import doctorImage from "../assets/images/doctor.png";
import patientImage from "../assets/images/patient.png";
const LandingPage = () => {
  return (
    <div>
      <Header />
      <div className="mx-[10%] h-screen  flex flex-col justify-center">
        <div className="relative rounded-xl h-[450px] w-full overflow-hidden">
          <img src={landingImage} alt="Landing" className="absolute top-0 left-0 w-full h-full object-cover" />
          <div className="relative flex flex-col  w-full h-full p-5 bg-blue-100 bg-opacity-60">
            <h1 className="text-5xl font-bold text-black mt-10 text-center">Deliver high-quality healthcare</h1>
            <p className="text-xl text-gray-200 font-semibold text-center mt-4">Join millions of people who trust healthcare.io</p>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 justify-center gap-10 mt-10">
              <div className="w-40 h-40 md:w-50 md:h-50 bg-slate-50 rounded-full flex items-center justify-center cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-105 active:translate-y-1 shadow-2xl">
                <img
                  src={patientImage}
                  alt="Description of image 1"
                  className="object-contain w-full h-full rounded-full" // Ensure the image is also circular
                />
              </div>
              <div className=" w-40 h-40 md:w-50 md:h-50 bg-white rounded-full flex items-center justify-center cursor-pointer transform transition-transform duration-200 ease-in-out hover:scale-105 active:translate-y-1 shadow-2xl">
                <img
                  src={doctorImage}
                  alt="Description of image 2"
                  className="object-contain w-full h-full rounded-full" // Ensure the image is also circular
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
