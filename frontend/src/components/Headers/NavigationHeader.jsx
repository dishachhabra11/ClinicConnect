import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import Avatar from "../Avatar";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import InitialAvatar from "../InitialAvatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Modal from "../Modal";

const NavigationHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [logoutModal, setLogoutModal] = useState(false);

  useEffect(() => {
    const token = Cookies.get("clinicConnect");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken.name);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openModal = () => {
    setLogoutModal(true);
    document.getElementById("my_modal_5").showModal();
    
  };

  const handleLogoutConfirm = () => {
    setLogoutModal(false);
    logout();
    document.getElementById("my_modal_5").close();
    navigate("/");
  };

  return (
    <div>
      <Header>
        <div className="relative">
          <button className="text-gray-700 hover:text-gray-900" onClick={toggleMenu}>
            <InitialAvatar initials={user ? `${user[0][0]}${user.split(" ")[1] ? user.split(" ")[1][0] : ""}`.trim() : "C"} width="w-10" height="h-10" />
          </button>
          {isMobileMenuOpen && (
            <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-md shadow-lg">
              <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100 shadow-sm cursor-pointer" onClick={() => navigate("/prescriptions")}>
                Prescriptions
              </a>
            
              <a className="block px-4 py-2 text-gray-700 hover:bg-gray-100 shadow-sm cursor-pointer" onClick={openModal}>
                Logout
              </a>
            </div>
          )}
        </div>
      </Header>
      {logoutModal == true ? <Modal handleConfirm={handleLogoutConfirm} /> : null}
    </div>
  );
};

export default NavigationHeader;
