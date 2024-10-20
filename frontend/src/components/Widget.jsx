import React from "react";

const Widget = ({ children }) => {
  return (
    <div>
      <div className="w-8 h-8 rounded-lg bg-primary flex justify-center items-center">{children}</div>
    </div>
  );
};

export default Widget;
