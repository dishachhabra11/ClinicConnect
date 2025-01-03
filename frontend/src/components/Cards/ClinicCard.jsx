import React from "react";

const ClinicCard = ({ clinic }) => {
  // Extract doctor details if they exist
  const doctorName = clinic.doctor && clinic.doctor.length > 0 ? clinic.doctor[0].name : "Dr Geet Lalwani";
  const doctorSpecialties = clinic.doctor && clinic.doctor.length > 0 ? clinic.doctor[0].speciality : ["Diabetes", "Kidney"];

  return (
    <div className="max-w-xl flex flex-col overflow-hidden bg-white rounded-xl h-auto shadow border-none">
      <div className="max-w-lg h-[150px] flex items-center justify-center">
        <img src={clinic.image[0] ? clinic.image[0] : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSijvd4SoCLhCabJX9TEf10C84TzVGhBqSeyg&s"} alt="clinic" className="w-full h-full object-contain" />
      </div>

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-semibold font-inter">{clinic.name}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{doctorName}</p>

        <div className="gap-1 flex flex-row">
          {doctorSpecialties.map((specialty, index) => (
            <div key={index} className="badge badge-outline">
              {specialty}
            </div>
          ))}
        </div>
      </div>

      <div className="p-[2px] bg-primary">
        <div className="flex flex-row gap-2 justify-between">
          <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-primary">
            Visit Now
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ClinicCard;
