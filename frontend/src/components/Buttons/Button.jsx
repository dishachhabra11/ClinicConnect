import React from "react";

function Button({ bgColor, children, borderColor }) {
  return <button className={`px-6 py-2 rounded-xl ${bgColor}  ${borderColor ? ` border-2 ${borderColor}` : "border-none"} `}> {children}</button>;
}

export default Button;
