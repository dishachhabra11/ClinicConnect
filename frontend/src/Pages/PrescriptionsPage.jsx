import React, { useEffect, useState } from "react";
import NavigationHeader from "../components/Headers/NavigationHeader";
import SearchBar from "../components/SearchBar";
import VisitedCard from "../components/Cards/VisitedCard";
import axios from "axios";


const PrescriptionsPage = () => {
  const [visitedClinics, setVisitedClinics] = useState([]);
  const fetchVisitedClinics = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/patient/getVisitedClinics`, {
        withCredentials: true,
      });
      console.log(res.data);
      setVisitedClinics(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVisitedClinics();
  }, []);

  return (
    <div>
      <NavigationHeader />
      <div className="px-8 bg-background">
        <div className="sm:w-1/3 pt-3">
          <SearchBar placeholder="Filter by Clinic Name.." />
        </div>

        <div className="flex justify-start">
          <div className="h-screen sm:w-[50%] w-full flex flex-col gap-4 m-5 items-center ">
            {
              visitedClinics.map((clinic) => {
                return <VisitedCard key={clinic._id} clinic={clinic} />
              }) 
                
              
            }
          </div>
        </div>
      </div>
      {/* <div className="w-[1000px] flex flex-col gap-3"></div> */}
    </div>
  );
};

export default PrescriptionsPage;
