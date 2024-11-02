import React, { useEffect, useState } from "react";
import NavigationHeader from "../components/Headers/NavigationHeader";
import Carousel from "../components/Carousel";
import Button from "../components/Buttons/Button";
import HomeIcon from "@mui/icons-material/Home";
import Widget from "../components/Widget";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Avatar from "../components/Avatar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ClinicPage() {
  const { id } = useParams();
  const [clinic, setClinic] = useState({});
  const navigate = useNavigate();
  const getSingleClinic = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/clinic/${id}`, {
        withCredentials: true,
      });
      setClinic(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleClinic();
  }, []);
  const images = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSijvd4SoCLhCabJX9TEf10C84TzVGhBqSeyg&s", "https://via.placeholder.com/800x400.png?text=Image+2", "https://via.placeholder.com/800x400.png?text=Image+3"];

  return (
    <div>
      <NavigationHeader />
      <div className="p-4 bg-background flex sm:flex-row flex-col">
        <div className="bg-white flex-2 sm:w-1/3 h-[200px] sm:h-[400px] sm:p-6 overflow-hidden">
          <div className="h-full">
            <Carousel images={clinic.images ? clinic.images : images} />
          </div>
        </div>

        <div className="bg-white flex-1 h-[400px] p-6 flex flex-col gap-1">
          <p className="font-medium font-inter text-3xl text-slate-800 inline-flex">{clinic.name}</p>
          <p className="font-light font-inter text-sm text-slate-800 inline-flex">{clinic.description}</p>
          <div className="flex gap-2">
            <Widget>
              <HomeIcon className="text-white" />
            </Widget>
            <p className="font-light font-inter text-md text-slate-800 inline-flex items-center ">
              {clinic.address},{clinic.city},{clinic.pincode}
            </p>
          </div>
          <div className="flex gap-2">
            <Widget>
              <CurrencyRupeeIcon className="text-white" />
            </Widget>
            <p className="font-light font-inter text-md text-slate-800 inline-flex items-center"> ₹ 400-500/day</p>
          </div>
          <div className="my-4 text-2xl font-bold flex">
            <Avatar width="w-12" height="h-12" rounded="rounded" />
            <div className="flex flex-col px-2">
              <p className="font-medium font-inter text-xl text-slate-800 inline-flex items-start">Dr. John Doe</p>
              <p className="font-light font-inter text-sm text-slate-800 inline-flex">General Physician</p>
            </div>
          </div>
          <div className="flex gap-3 my-2 sm:w-[50%]">
            <div
              className="flex-grow min-w-0"
              onClick={() =>
                navigate(`/queue/${id}`, {
                  state: { clinic },
                })
              }>
              <Button bgColor="bg-primary" borderColor="border-white" className="w-full">
                <p className="text-white text-xs sm:text-md">Enter queue now !!</p>
              </Button>
            </div>
            <div className="flex-grow min-w-0">
              <Button bgColor="bg-white" borderColor="border-primary" className="w-full">
                <p className="text-primary text-xs sm:text-md">Book Appointment</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClinicPage;
