// PatientCard.js
import React from "react";

const PatientCard = ({ patient }) => {
  return (
    <div className="w-full rounded overflow-hidden shadow-lg bg-white p-6 flex flex-col gap-2">
      <div className="text-lg font-inter mb-2 flex gap-2">
        <p className="font-semibold">Patient Name:</p>
        {patient.name}
      </div>
      <div className="text-lg font-inter mb-2 flex gap-2">
        <p className="font-semibold">Symptoms:</p> {patient.symptoms}
      </div>
      <div className="text-lg font-inter mb-2 flex gap-2 ">
        <p className="font-semibold"> Token Number:</p> {patient.tokenNumber}
      </div>
      <div className="text-lg font-inter mb-2 flex gap-2 ">
        <p className="font-semibold">Gender:</p> {patient.gender}
      </div>
    </div>
  );
};

export default PatientCard;
