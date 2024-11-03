import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import Avatar from "../Avatar";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const NavigationHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

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
        <nav className="flex space-x-4">
          <a href="#" className="text-black flex flex-col justify-center hover:text-primary hover:underline ">
            Check Availability
          </a>
          <Avatar />
          {user && <p>Welcome, {user.name}!</p>}
        </nav>
        <div className="relative">
          <button className="text-gray-700 hover:text-gray-900" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-md shadow-lg">
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 shadow-sm">
                Prescriptions
              </a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 shadow-sm">
                Ongoing Appointments
              </a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 shadow-sm">
                Logout
              </a>
            </div>
          )}
        </div>
      </Header>
    </div>
  );
};

export default NavigationHeader;
