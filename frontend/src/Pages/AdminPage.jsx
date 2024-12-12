import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../components/Headers/AdminHeader";
import PatientCard from "../components/Cards/PatientCard";
import Cookies from "js-cookie";

function AdminPage() {
  const { id } = useParams();
  const [clinic, setClinic] = useState({});
  const [currentToken, setCurrentToken] = useState("");
  const [lastToken, setLastToken] = useState("");
  const [patientData, setPatientData] = useState({
    name: "",
    symptoms: "",
    tokenNumber: "",
    gender: "",
  });

  const getClinic = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/clinic/${id}`, { withCredentials: true });

      setClinic(res.data);
      setCurrentToken(res.data.queue.currentToken);
      setLastToken(res.data.queue.lastToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getClinic();
  }, []);
  const deQueue = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/queue/dequeue`,
        {
          clinicId: id,
        },
        {
          withCredentials: true,
        }
      );
      setPatientData({
        ...patientData,
        gender: res.data.user.gender,
        name: res.data.user.name,
        symptoms: res.data.dequeuedUser.symptoms,
        tokenNumber: res.data.dequeuedUser.tokenNumber,
      });
      alert("Patient dequeued successfully");
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        alert("No user in the queue");
      }
    }
  };
  return (
    <div className="">
      <AdminHeader />
      <div className="text-center sm:text-3xl text-lg bg-slate-100 font-inter">Welcome to {clinic.name} !!</div>
      <div className="flex flex-col md:flex-row h-screen bg-background ">
        {/* Sidebar */}

        {/* Main Content */}
        <main className="flex-1 sm:p-6 space-y-6 mt-2">
          {/* Top Info Cards (Responsive Grid) */}

          <div className="sm:max-w-[60%] p-2 mx-auto">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-gray-600">Today patient flow</p>
                <p className="text-3xl font-bold">1</p>
                {/* <p className="text-green-500">+30%</p> */}
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-gray-600">Monthly Patient flow</p>
                <p className="text-3xl font-bold">320</p>
                {/* <p className="text-green-500">+20%</p> */}
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-gray-600">Queue Length</p>
                <p className="text-3xl font-bold">{lastToken - currentToken}</p>
                {/* <p className="text-green-500">+30%</p> */}
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="text-gray-600">Current token</p>
                <p className="text-3xl font-bold">{currentToken}</p>
                {/* <p className="text-green-500">+30%</p> */}
              </div>
              <div className=" py-8 px-4  hidden md:flex"></div>
              <div className="bg-primary py-8 px-4 rounded-lg shadow-md flex justify-center items-center">
                <button className="sm:text-2xl text-lg font-semibold text-white font-inter  " onClick={deQueue}>
                  Dequeue Patient
                </button>
              </div>
              <div className="bg-primary p-4 rounded-lg shadow-md flex justify-center items-center">
                <button className="sm:text-2xl text-lg font-semibold text-white font-inter ">Close queue</button>
              </div>
            </div>
          </div>
          {patientData.name && (
            <div className="flex justify-center">
              <PatientCard patient={patientData} />
            </div>
          )}

          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Active Users</h2>
             
              <div className="h-32 bg-gray-200 mt-4"></div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold">Most common symtomps in last 7 days</h2>
              
              <div className="h-32 bg-gray-200 mt-4"></div>
            </div>
          </div>

          {/* Order History or Follower Stats */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold">Order History / Follower Stats</h2>
           
            <div className="h-32 bg-gray-200 mt-4"></div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
