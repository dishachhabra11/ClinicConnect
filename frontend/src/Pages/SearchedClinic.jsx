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
        <LandingPageHeader />
        <div className="flex justify-center items-center h-screen bg-[#F3F3F3]  p-4 w-screen">
          <div className="h-screen bg-[#F3F5F3] p-4 ">
            {/* //carrds in grid */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {
                // map over clinics and pass them to ClinicCard component
                clinics.map((clinic) => {
                  return (
                    <div onClick={() => navigate("/clinic/" + clinic._id)}>
                      <ClinicCard clinic={clinic} />
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchedClinic;
