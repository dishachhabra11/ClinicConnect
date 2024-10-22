import React from "react";
import Button from "../Buttons/Button.jsx";
import { useState } from "react";

export const Header = ({ children }) => {
  return (
    <div className="h-[50px] mb-2 sm:px-6 px-2">
      <div className="navbar bg-base-100 border-b-2 border-gray">
        <div className="navbar-start">
          <a className="px-2 text-lg sm:text-2xl font-bold text-primary">ClinicConnect</a>
        </div>

        <div className="navbar-end gap-3">{children}</div>
      </div>
    </div>
  );
};
