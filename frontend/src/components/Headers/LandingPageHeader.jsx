import React from "react";
import { Header } from "./Header";
import Button from "../Buttons/Button";
import { useNavigate } from "react-router-dom";


function LandingPageHeader() {
  const navigate = useNavigate();
  

  return (
    <div>
      <Header>
        <p className="cursor-pointer"
          onClick={() => {
            navigate("/clinic/register");
          }}>
          Register your Clinic?
        </p>

        <div className="flex gap-2">
          <div class="dropdown dropdown-hover">
            <Button bgColor="bg-primary" role="button" tabindex="0">
              Login
            </Button>
            <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <li
                onClick={() => {
                  navigate("/patient/signin");
                }}>
                <a>Patient</a>
              </li>
              <li
                onClick={() => {
                  navigate("/clinic/signin");
                }}>
                <a>Clinic Admin</a>
              </li>
            </ul>
          </div>

          <div onClick={() => {
            navigate("/patient/signup");
          }}>
            <Button bgColor="bg-gray">Enter</Button>
          </div>
        </div>
      </Header>
    </div>
  );
}

export default LandingPageHeader;
