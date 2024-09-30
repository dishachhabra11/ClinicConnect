import React from "react";
import Button from "./Buttons/Button.jsx";

export const Header = () => {
  return (
    <div className="h-[50px] ">
      <div className="navbar bg-base-100 border-b-2 border-gray">
        <div className="navbar-start">
          <a className="px-2 text-2xl font-bold">HealthCare.io</a>
        </div>

        <div className="navbar-end gap-3">
          <p>
            <a href="example.com">Register your Clinic?</a>
          </p>

          <Button bgColor="bg-primary">Login</Button>
          <Button bgColor="bg-gray">Enter</Button>
        </div>
      </div>
    </div>
  );
};
