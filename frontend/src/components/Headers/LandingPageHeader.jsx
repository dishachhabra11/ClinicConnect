import React from "react";
import { Header } from "./Header";
import Button from "../Buttons/Button";

function LandingPageHeader() {
  return (
    <div>
      <Header>
        <p>
          <a href="example.com">Register your Clinic?</a>
        </p>

        <Button bgColor="bg-primary">Login</Button>
        <Button bgColor="bg-gray">Enter</Button>
      </Header>
    </div>
  );
}

export default LandingPageHeader;
