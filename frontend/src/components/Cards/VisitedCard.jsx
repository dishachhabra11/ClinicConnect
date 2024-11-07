import React from 'react'
import { formatDate } from "../../../utils/formatDate";


const VisitedCard = ({ clinic }) => {
  const formattedDate = clinic.registrationTime ? formatDate(clinic.registrationTime) : "N/A";
  const symptoms = clinic.symptoms.join(", ") || "No symptoms provided";
  return (
    <div className="w-full">
      <div className="p-4  bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
        {/* Clinic Name */}
        <div className="h- rounded-md mb-4">
          <p className=" text-gray-800 sm:text-3xl text-lg font-inter font-semibold">{clinic.clinicName}</p>
        </div>

        {/* Date Visited */}
        <div className="mb-2 flex gap-2">
          <p className="text-sm text-gray-500">Date Visited</p>
          <p className="text-sm text-gray-700 font-medium">{formattedDate}</p>
        </div>

        {/* Symptoms */}
        <div className="mb-4 flex gap-2">
          <p className="text-sm text-gray-500">Symptoms</p>
          <p className="text-sm text-gray-700 font-medium">{symptoms}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center border-t pt-2 mt-2">
          <button className="text-sm text-primary font-bold">Download Prescription</button>
        </div>
      </div>
    </div>
  );
}

export default VisitedCard