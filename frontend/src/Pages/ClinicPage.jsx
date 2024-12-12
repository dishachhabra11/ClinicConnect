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
import CommentSection from "../components/Cards/CommentSection";

function ClinicPage() {
  const { id } = useParams();
  const [clinic, setClinic] = useState({});
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([{}]);
  const navigate = useNavigate();

  // Fetch clinic data
  const getSingleClinic = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/clinic/${id}`, {
        withCredentials: true,
      });
      setClinic(res.data);
      setComments(res.data.comments || []);
    } catch (error) {
      console.log(error);
    }
  };

  // Add a new comment
  const addComment = async (text) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/clinic/postComment`,
        {
          clinicId: id,
          comment: text,
        },
        { withCredentials: true }
      );
      // Ensure the response contains the expected data format
      setComments([...comments, res.data.comment]);
      if (res.data && res.data.comment && typeof res.data.comment === "string") {
      }
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleClinic();
  }, []);
  const doctorName = clinic.doctor && clinic.doctor.length > 0 ? clinic.doctor[0].name : "Dr Geet Lalwani";
   const doctorSpecialties = clinic.doctor && clinic.doctor.length > 0 ? clinic.doctor[0].speciality : ["Diabetes", "Kidney"];

  const images = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSijvd4SoCLhCabJX9TEf10C84TzVGhBqSeyg&s", "https://via.placeholder.com/800x400.png?text=Image+2", "https://via.placeholder.com/800x400.png?text=Image+3"];
  return (
    <div>
      <NavigationHeader />
      <div className="p-4 bg-background flex sm:flex-row flex-col">
        <div className="bg-white flex-2 sm:w-1/3 h-[200px] sm:h-[400px] sm:p-6 overflow-hidden">
          <Carousel images={clinic.image || images} />
        </div>

        <div className="bg-white flex-1 h-[400px] p-6 flex flex-col gap-1">
          <p className="font-medium font-inter text-3xl text-slate-800">{clinic.name}</p>
          <p className="font-light font-inter text-sm text-slate-800">{clinic.description}</p>
          <div className="flex gap-2">
            <Widget>
              <HomeIcon className="text-white" />
            </Widget>
            <p className="font-light font-inter text-md text-slate-800">
              {clinic.address}, {clinic.city}, {clinic.pincode}
            </p>
          </div>
          <div className="flex gap-2">
            <Widget>
              <CurrencyRupeeIcon className="text-white" />
            </Widget>
            <p className="font-light font-inter text-md text-slate-800"> {clinic.priceRange ? (clinic.priceRange.low ? clinic.priceRange.low + "₹" : "400 ₹") + "-" + (clinic.priceRange.high ? clinic.priceRange.high + "₹" : "500 ₹") : "400 ₹ - 500 ₹"}/day</p>
          </div>
          <div className="my-4 text-2xl font-bold flex">
            <Avatar width="w-12" height="h-12" rounded="rounded" />
            <div className="flex flex-col px-2">
              <p className="font-medium font-inter text-xl text-slate-800">{doctorName}</p>
              <p className="font-light font-inter text-sm text-slate-800">{doctorSpecialties}</p>
            </div>
          </div>
          <div className="flex gap-3 my-2 sm:w-[50%]">
            <div className="flex-grow min-w-0" onClick={() => navigate(`/queue/${id}`, { state: { clinic } })}>
              <Button bgColor="bg-primary" borderColor="border-white" className="w-full">
                <p className="text-white text-xs sm:text-md">Enter queue now !!</p>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-inter font-bold">Comments</h2>
        <div className=" w-full">
          <textarea className="w-full p-2 border-b-2 border-b-slate-500 rounded-lg outline-none" placeholder="Add a comment..." rows="2" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
          <button onClick={() => addComment(newComment)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 border-none border-b-2">
            Add Comment
          </button>
          {comments.map((comment) => (
            <CommentSection key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClinicPage;
