import React from "react";

const TextField = ({
  type = "text", // Default type of input (text)
  value = "", // Default value for the input
  onChange, // Function to handle input change
  placeholder = "Enter text", // Default placeholder
  borderColor = "border-light-gray", // Default border color class
  textColor = "text-dark-gray", // Default text color class
    customClass = "", // Allow passing custom class names if needed
  label, // Label for the input
}) => {
  return (
    <div className="w-full mb-4">
      <label htmlFor="email" className=" text-gray-700 font-poppins  font-semibold mb-3 text-sm">
        {label}
      </label>
      <input type={type} value={value} onChange={onChange} className={`w-full px-3 py-2 border rounded-lg outline-none font-roboto ${textColor} ${borderColor} ${customClass}`} placeholder={placeholder} required />
    </div>
  );
};

export default TextField;
