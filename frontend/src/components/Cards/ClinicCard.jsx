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

    <div class="max-w-sm bg-white rounded-2xl  shadow border-none">
      <img class="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSijvd4SoCLhCabJX9TEf10C84TzVGhBqSeyg&s" alt="" className="w-full h-full object-contain" />

      <div class="p-5">
        <h5 class="mb-2 text-2xl font-semibold font-inter">Indore health clinic</h5>

        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Dr geet Lalwani</p>
        <div className="gap-1 flex flex-row">
          <div className="badge badge-outline">Diabetes</div>
          <div className="badge badge-outline">Kidney</div>
        </div>
      </div>
      <div className="p-[2px] bg-primary">
        <div className="flex flex-row gap-2 justify-between bg-primary">
          <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary   ">
            Visit Now
            <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ClinicCard;
