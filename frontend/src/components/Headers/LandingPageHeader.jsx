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

        <div className="flex gap-2">
          <Button bgColor="bg-primary">Login</Button>
          <Button bgColor="bg-gray">Enter</Button>
        </div>
      </Header>
    </div>
  );
}

export default LandingPageHeader;
