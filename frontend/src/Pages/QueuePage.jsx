import React, { useEffect, useState } from "react";
import NavigationHeader from "../components/Headers/NavigationHeader";
import axios from "axios";
import { io } from "socket.io-client";
import { useParams, useLocation } from "react-router-dom";
import CategorySelect from "./CategorySelect";
import Button from "../components/Buttons/Button";

function QueuePage() {
  const [token, setToken] = useState();
  const [currentToken, setCurrentToken] = useState();
  const clinicId = useParams().id;
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [overlapping, setOverlapping] = useState(false);
  const location = useLocation();
  const [clinic, setClinic] = useState(location.state.clinic);
  const [patientInqueue, setPatientInqueue] = useState(false);
  const [queuelength, setQueueLength] = useState(0);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [queueStatus, setQueueStatus] = useState("open");

  const getQueue = async () => {
    try {
      console.log("clinic is",clinic.queue);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/clinic/getQueue/${clinic.queue._id}`, {
        withCredentials: true,
      });
      console.log(res.data);
      setSelectedSymptoms(res.data.isPresent.symptoms);
      setCurrentToken(res.data.queue.currentToken);
      setPatientInqueue(res.data.isPresent);
      setQueueLength(res.data.queue.patients.length);
      setQueueStatus(res.data.queue.status);

      if (res.data.isPresent !== false) {
        setToken(res.data.isPresent.tokenNumber);
      }
    } catch (error) {
      console.log(error);
    }
  };

const fetchSuggestions = async () => {
  try {
    if (selectedSymptoms.length > 0) {
      const suggestionResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/suggestion`, { symptoms: selectedSymptoms }, { withCredentials: true });

      // Remove '*' characters from the message
      let formattedSuggestions = suggestionResponse.data.message.replace(/\*/g, "");

      // Split the string into an array using '@' as the delimiter
      formattedSuggestions = formattedSuggestions.split("@");

      // Remove any empty strings from the array (which could be the result of a trailing '@')
      formattedSuggestions.pop();

      // Set the state with the formatted suggestions
      setSuggestions(formattedSuggestions);
    }
  } catch (error) {
    console.error("Error fetching health suggestions:", error);
  }
};


  useEffect(() => {
    fetchSuggestions();
  }, [selectedSymptoms]);

  useEffect(() => {
    getQueue();
  }, []);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
      withCredentials: true,
    });
    setSocket(newSocket);

    newSocket.emit("joinClinic", clinicId);

    newSocket.on("userDequeued", (data) => {
      setCurrentToken(data.tokenNumber);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);
  console.log(queueStatus);

  const submitandEnterQueue = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/queue/add`, { clinicId, symptoms: selectedSymptoms }, { withCredentials: true });

      setToken(res.data.newUser.tokenNumber);
      setCurrentToken(res.data.currentToken);
      setOverlapping(false);
      setPatientInqueue(res.data.newUser || res.data.isPresent);
      fetchSuggestions();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage("User already in queue");
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }
  };

  const enterQueue = () => {
    setOverlapping(true);
  };

  return (
    <div>
      {overlapping ? (
        <div>
          <CategorySelect onSubmit={submitandEnterQueue} onSymptomSelect={setSelectedSymptoms} />
        </div>
      ) : (
        <div>
          <NavigationHeader />
          <div className="container mx-auto p-4 sm:max-w-[70%] flex justify-center flex-col items-center gap-4">
            <h2 className="text-xl font-bold text-center mb-4 font-inter">Queue Status</h2>
            <div>
              {patientInqueue === false ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TokenCard heading="Queue Length" number={queuelength} />
                  <TokenCard heading="Expected Waiting Time" number={formatTime(15 * 60 * queuelength)} />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <TokenCard heading="Current Token Number" number={currentToken} />
                  <TokenCard heading="Your Token Number" number={token} />
                  <TokenCard heading="Your Position in Queue" number={token - currentToken >= 0 ? token - currentToken : ""} />
                </div>
              )}
            </div>
            <div onClick={patientInqueue === false && queueStatus=="open" ? enterQueue : undefined} className="max-w-[250px] flex justify-center mt-2">
              <Button bgColor="bg-primary">{patientInqueue === false ? queueStatus=="open"? "Enter queue":"Clinic is closed" : "You are already in queue"}</Button>
            </div>
          </div>

          {/* <div className="p-8">
            {suggestions!=undefined && suggestions.length > 0 ? <p className="text-2xl font-bold font-inter">Health tips for you</p> : " "}

            {suggestions !=undefined && suggestions.length > 0 ? (
              <div className="">
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>
                      <SuggestionCard suggestion={suggestion} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div> */}
        </div>
      )}
    </div>
  );
}

const TokenCard = ({ heading, number }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between items-center">
      <h3 className="text-lg font-semibold font-inter">{heading}</h3>
      <span className="text-[50px] font-bold">{number}</span>
    </div>
  );
};

const formatTime = (time) => {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time - hours * 3600) / 60);
  let seconds = time - hours * 3600 - minutes * 60;

  return `${hours}h ${minutes}m ${seconds}s`;
};

const SuggestionCard = ({ suggestion }) => {
  const [title, description] = suggestion.split("$");
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default QueuePage;
