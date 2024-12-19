import React from "react";
import NavigationHeader from "../components/Headers/NavigationHeader";
import LandingPageHeader from "../components/Headers/LandingPageHeader";
import ClinicCard from "../components/Cards/ClinicCard";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SearchedClinic = () => {
  const location = useLocation();
  const clinics = location.state.clinics;
  const navigate = useNavigate();

  return (
    <>
      <div>
        <NavigationHeader />
        <div className="flex justify-center items-center h-screen bg-[#F3F3F3] p-4 w-screen">
          <div className="h-screen bg-[#F3F5F3] p-4 w-full">
            {/* Cards container with flexbox */}
            <div className="flex flex-wrap justify-center gap-4">
              {clinics.length > 0 ? (
                clinics.map((clinic) => {
                  return (
                    <div onClick={() => navigate("/clinic/" + clinic._id)} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 max-w-xs">
                      <ClinicCard clinic={clinic} />
                    </div>
                  );
                })
              ) : (
                <p className="text-xl font-semibold text-dark-gray font-inter">No clinics found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchedClinic;
