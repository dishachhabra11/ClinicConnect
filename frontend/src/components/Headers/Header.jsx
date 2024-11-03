import React from "react";
import Button from "../Buttons/Button.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const Header = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="h-auto sm:px-6 px-2 border-b-2 border-gray">
      <div className="navbar">
        <div className="navbar-start ">
          <a className="px-2 text-lg sm:text-2xl font-bold cursor-pointer text-primary" onClick={() => navigate("/")}>
            ClinicConnect
          </a>
        </div>

        <div className="navbar-end gap-3">{children}</div>
      </div>
    </div>
  );
};
