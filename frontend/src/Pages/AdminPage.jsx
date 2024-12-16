import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../components/Headers/AdminHeader";
import PatientCard from "../components/Cards/PatientCard";
import SymptomsChart from "../components/Charts/SymptomsChart";
import MonthlyChart from "../components/Charts/MonthlyChart";

function AdminPage() {
  const { id } = useParams();
  const [clinic, setClinic] = useState({});
  const [currentToken, setCurrentToken] = useState("");
  const [lastToken, setLastToken] = useState("");
  const [sortedSymptoms, setSortedSymptoms] = useState([]);
  const [thisMonthPatient, setThisMonthPatient] = useState();
  const [thisDayPatient, setThisDayPatient] = useState();
  const [monthlyPatientFlow, setMonthlyPatientFlow] = useState([]);
  const [patientData, setPatientData] = useState({
    name: "",
    symptoms: "",
    tokenNumber: "",
    gender: "",
  });

  const getClinic = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/clinic/${id}`, { withCredentials: true });
      console.log(res.data);
      setClinic(res.data);
      setCurrentToken(res.data.queue.currentToken);
      setLastToken(res.data.queue.lastToken);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/clinic/commonSymptoms/675aca594ef792efbe5d5ed1`, { withCredentials: true });

      setSortedSymptoms(response.data.sortedSymptoms); // Access API data
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMonthlyData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/clinic/monthlyPatientFlow/${id}`, { withCredentials: true });
      const data = res.data;
      setMonthlyPatientFlow(data.sortedMonthlyPatientFlow);
      setThisDayPatient(data.todayPatientFlow);
      setThisMonthPatient(data.thisMonthPatientFlow);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    getClinic();
    fetchMonthlyData();
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
  const closeQueue = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/clinic/closeQueue/${id}`, { withCredentials: true });
      alert("Queue closed successfully");
    } catch (error) {
      alert("Error closing queue,please try again");
      console.log(error);
    }
  }

  return (
    <div>
      <AdminHeader />
      <div>
        <div className="p-2 ">
          <div className="text-center sm:text-3xl text-lg font-inter">Welcome to {clinic.name} !!</div>
          <main className=" sm:p-6 space-y-6 mt-2">
            <div className="sm:w-full p-2 mx-auto ">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <StatCard title="Todays Patient flow" value={thisDayPatient} />
                <StatCard title="Monthly Patient flow" value={thisMonthPatient} />
                <StatCard title="Queue Length" value={lastToken-currentToken} />
                <StatCard title="Current token" value={currentToken} />
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold">Patient flow</h2>
                <MonthlyChart monthlyData={monthlyPatientFlow} />
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">Most common symtomps in last 7 days</h2>
                <SymptomsChart clinicId={id} sortedSymptoms={sortedSymptoms} />
              </div>
            </div>

            {/* Order History or Follower Stats */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-center gap-3">
                <div className="bg-primary py-4 px-4 rounded-lg shadow-md flex justify-center items-center">
                  <button className="sm:text-2xl text-lg font-semibold text-white font-inter  " onClick={deQueue}>
                    Dequeue Patient
                  </button>
                </div>
                <div className="bg-primary p-4 rounded-lg shadow-md flex justify-center items-center">
                  <button className="sm:text-2xl text-lg font-semibold text-white font-inter" onClick={closeQueue}>Close queue</button>
                </div>
              </div>
              <div className="mt-5 flex justify-center">
                <PatientCard patient={patientData} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;

function StatCard({ title, value, desc }) {
  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
        <div className="stat-desc">{desc}</div>
      </div>
    </div>
  );
}
