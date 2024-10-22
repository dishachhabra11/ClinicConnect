import React, { useState } from "react";

const EmailField = ({
  value = "", // Default value for the email input
  onChange, // Function to handle input change
  placeholder = "Enter your email", // Default placeholder
  borderColor = "border-light-gray", // Default border color class
  textColor = "text-dark-gray", // Default text color class
  customClass = "", // Allow passing custom class names if needed
}) => {
  return (
    <div className="w-full mb-4">
      <label htmlFor="email" className=" text-gray-700 font-poppins  font-semibold mb-3 text-sm">
        Email
      </label>
      <input type="email" name="email" value={value} onChange={onChange} className={`w-full px-3 border rounded-lg outline-none sm:py-1 py-1 text-sm sm:text-lg font-roboto ${textColor} ${borderColor} ${customClass}`} placeholder={placeholder} required />
    </div>
  );
};

export default EmailField;
