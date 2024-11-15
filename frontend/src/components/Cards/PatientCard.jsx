// PatientCard.js
import React from "react";

const PatientCard = ({ patient }) => {
  return (
    <div className="max-w-[80%] rounded overflow-hidden shadow-lg bg-white p-6 m-4">
      <div className="text-lg font-inter mb-2 flex gap-2">
        <p className="font-semibold">Patient Name:</p>
        {patient.name}
      </div>
      <p className="text-lg font-inter mb-2 flex gap-2">
        <p className="font-semibold">Symptoms:</p> {patient.symptoms}
      </p>
      <p className="text-lg font-inter mb-2 flex gap-2 ">
        <p className="font-semibold"> Token Number:</p> {patient.tokenNumber}
      </p>
      <p className="text-lg font-inter mb-2 flex gap-2 ">
        <p className="font-semibold">Gender:</p> {patient.gender}
      </p>
    </div>
  );
};

export default PatientCard;
