import React from "react";

function Button({ bgColor, children, borderColor }) {
  return <button className={`sm:px-6 px-2 py-2 rounded-xl ${bgColor}  ${borderColor ? ` border-2 ${borderColor}` : "border-none"} w-full`}> {children}</button>;
}

export default Button;
