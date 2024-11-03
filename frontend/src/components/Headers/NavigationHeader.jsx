import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import Avatar from "../Avatar";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import InitialAvatar from "../InitialAvatar";
import { useNavigate } from "react-router-dom";

const NavigationHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // console.log(user[1]);
  useEffect(() => {
    const token = Cookies.get("clinicConnect");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken.name);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    } else {
      console.log("Token not found");
    }
  }, []);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <Header>
        {/* <nav className="flex space-x-4">
          <a href="#" className="text-black flex flex-col justify-center hover:text-primary hover:underline ">
            Check Availability
          </a>
          <InitialAvatar initials={user ? user[0] : "C"} width="w-10" height="h-10" />
        </nav> */}
        <div className="relative">
          <button className="text-gray-700 hover:text-gray-900" onClick={toggleMenu}>
            <InitialAvatar initials={user ? `${user[0][0]}${user.split(" ")[1] ? user.split(" ")[1][0] : ""}`.trim() : "C"} width="w-10" height="h-10" />
          </button>
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-md shadow-lg">
              <a
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 shadow-sm cursor-pointer"
                onClick={() => {
                  navigate("/prescriptions");
                }}>
                Prescriptions
              </a>
              <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100 shadow-sm cursor-pointer" onClick={() => navigate("/ongoing-appointments")}>
                Appointments
              </a>
              <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100 shadow-sm cursor-pointer">Logout</a>
            </div>
          )}
        </div>
      </Header>
    </div>
  );
};

export default NavigationHeader;
