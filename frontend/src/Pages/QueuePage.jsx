import React, { useEffect, useState } from "react";
import NavigationHeader from "../components/Headers/NavigationHeader";
import axios from "axios";
import { io } from "socket.io-client";

function QueuePage() {
  const [token, setToken] = useState();
  const [currentToken, setCurrentToken] = useState();
  const clinicId = "671f6d56c2fb404581db2f38";
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL, {
      withCredentials: true,
    });
    setSocket(newSocket);

    // sent event to join clinic
    newSocket.emit("joinClinic", clinicId);

    // listen for userDequeued event
    newSocket.on("userDequeued", (data) => {
      setCurrentToken(data.tokenNumber); // Update the current token in state
    });

    // Cleanup socket connection on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const enterQueue = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/queue/add`, { clinicId }, { withCredentials: true });
      setToken(res.data.newUser.tokenNumber);
      setCurrentToken(res.data.currentToken);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavigationHeader />
      <div className="p-4 bg-background flex sm:flex-row flex-col">
        <div className="bg-white flex-2 h-[200px] sm:h-[400px] sm:p-6 overflow-hidden">
          <button onClick={enterQueue} className="bg-red-700">
            enter queue now !!
          </button>
          <div>
            <h1>your token number is</h1>
            <p>{token}</p>
          </div>
          <div>
            <h1>current token number is</h1>
            <p>{currentToken}</p>
          </div>
          <div>
            <h1>your position in the queue is</h1>
            <p>{token - currentToken}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QueuePage;
