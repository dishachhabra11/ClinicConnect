import React, { useEffect, useState } from "react";
import NavigationHeader from "../components/Headers/NavigationHeader";
import axios from "axios";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import CategorySelect from "./CategorySelect";
import Button from "../components/Buttons/Button";

function QueuePage() {
  const [token, setToken] = useState();
  const [currentToken, setCurrentToken] = useState();
  const [yourToken, setYourToken] = useState();
  const clinicId = useParams().id;
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [overlapping, setOverlapping] = useState(false);

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
  const submitandEnterQueue = async () => {
    try {
      console.log("submitandEnterQueue");
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/queue/add`, { clinicId }, { withCredentials: true });
      setToken(res.data.newUser.tokenNumber);
      setCurrentToken(res.data.currentToken);
      setOverlapping(false);
    } catch (error) {
      if (error.response.status === 400) {
        setMessage("User already in queue");
      }
      console.log(error);
    }
  };

  const enterQueue = async () => {
    setOverlapping(true);
  };

  return (
    <>
      {overlapping == true ? (
        <div>
          <CategorySelect onSubmit={submitandEnterQueue} />
        </div>
      ) : (
        <div>
          <NavigationHeader />
          <div className="container mx-auto p-4 sm:max-w-[70%]">
            <h2 className="text-xl font-bold text-center mb-4">Queue Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TokenCard heading="Current Token Number" number={currentToken} />
              <TokenCard heading="Your Token Number" number={yourToken} />
              <TokenCard heading="Your Position in Queue" number={yourToken - currentToken} />
            </div>
            <div onClick={enterQueue} className="max-w-[150px]">
              <Button bgColor="bg-primary">Enter queue</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default QueuePage;

const TokenCard = ({ heading, number }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between items-center">
      <h3 className="text-lg font-semibold">{heading}</h3>
      <span className="text-3xl font-bold">{number}</span>
    </div>
  );
};
