import React from "react";

const ClinicCard = () => {
  return (
    // <div className="w-full sm:w-[330px] h-[450px] border relative rounded-2xl hover:shadow-lg overflow-hidden flex flex-col transition-all bg-white border-none">
    //   {/* Image Section */}
    //   <img alt={event.title} className="w-full h-[200px] sm:h-[250px] object-cover" />

    //   {/* Event Details */}
    //   <div className="p-4 flex-1">
    //     <p className="font-semibold text-base sm:text-lg text-black mb-2">dr ratan tata</p>
    //     <div className="flex justify-between text-sm sm:text-base">
    //       <div className="flex flex-col gap-2">
    //         <div className="flex items-center">
    //           {/* <CiLocationOn /> */}
    //           <p className="px-2">hii</p>
    //         </div>
    //         <div className="flex items-center">
    //           {/* <MdOutlinePerson /> */}
    //           <p className="px-2">organizer</p>
    //         </div>
    //       </div>
    //       <div className="flex flex-col gap-2">
    //         <div className="flex items-center">
    //           {/* <LuCalendarDays /> */}
    //           <p className="px-2">date</p>
    //         </div>
    //         <div className="flex items-center">
    //           {/* <IoTimeOutline /> */}

    //           <p className="px-2">time</p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Buttons Section */}
    //   <div className="mt-auto p-3 bg-orange-50 flex justify-between items-center font-semibold text-sm sm:text-base uppercase">
    //     <p>Explore</p>
    //   </div>
    // </div>

    <div class="max-w-sm bg-white rounded-xl shadow border-none">
     
        <img class="rounded-t-lg" src="data:image/jpeg;base64,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" alt="" className="w-full h-full object-cover" />
      
      <div class="p-5">
       
          <h5 class="mb-2 text-2xl font-semibold font-inter">Indore health clinic</h5>
       
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Dr geet Lalwani</p>
        <div className="flex flex-row gap-2 justify-between">
          <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg  focus:ring-4 focus:outline-none focus:ring-blue-300 ">
            Visit Now
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
          <div className="gap-1 flex flex-row">
            <div className="badge badge-outline">Diabetes</div>
            <div className="badge badge-outline">Kidney</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicCard;
