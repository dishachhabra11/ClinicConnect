import React, { useEffect, useState } from "react";
import landingImage from "../assets/images/landing.jpg";
import SearchBar from "../components/SearchBar";
import LandingPageHeader from "../components/Headers/LandingPageHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [relatedClinics, setRelatedClinics] = useState([]);
  const navigate = useNavigate();
  const callSearchApi = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/clinic/filter?query=${e.target.value}`, {
        withCredentials: true,
      });
      setRelatedClinics(res.data.clinics);
      return res.data.clinics;
    } catch (error) {
      console.log(error);
    }
    console.log(res);
  };
  const debouncedSearch = debounce(callSearchApi, 500);
  const searchClinics = (e) => {
    setSearchQuery(e.target.value);
    callSearchApi(e);
  };
  return (
    <div>
      <LandingPageHeader />
      <div className="mx-[10%] h-screen  flex flex-col justify-center">
        <div className="relative rounded-xl h-[450px] w-full overflow-hidden">
          <img src={landingImage} alt="Landing" className="absolute top-0 left-0 w-full h-full object-cover" />
          <div className="relative flex flex-col  w-full h-full p-5 bg-blue-100 bg-opacity-60">
            <h1 className="text-5xl font-bold text-black mt-10 text-center">Delivering high-quality healthcare</h1>
            <p className="text-xl text-gray-200 font-semibold text-center mt-4">Find the right clinic for you..</p>

            <div className="w-[60%] mt-5 mx-auto" onKeyDown={(e) => {
              if (e.key == "Enter") {
                console.log("Enter pressed");
                const clinics = relatedClinics;
                navigate("/clinics", { state: { clinics } });
              }
            }}>
              <SearchBar placeholder="Search by clinics or hospitals" searchQuery={searchQuery} onChange={searchClinics} />
              {relatedClinics.length > 0 && (
                <div className="w-full bg-white rounded-lg h-auto max-h-[150px] overflow-y-scroll">
                  {relatedClinics.map((clinic) => (
                    <div className="w-full h-[50px] flex justify-between items-center px-3 py-[2px] shadow cursor-pointer" onClick={() => {
                      navigate("/clinic/" + clinic._id);
                    }}>
                      <p className="text-md font-normal text-gray-700">{clinic.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
