import React from "react";

const PasswordField = ({
  value = "", // Default value for the input
  onChange, // Function to handle input change
  placeholder = "Enter your password", // Default placeholder
  borderColor = "border-light-gray", // Default border color class
  textColor = "text-dark-gray", // Default text color class
  customClass = "", // Allow passing custom class names if needed
  label, // Label for the input
}) => {
  return (
    <div className="w-full mb-4">
      <label htmlFor="email" className=" text-gray-700 font-poppins  font-semibold mb-3 text-sm">
        Password
      </label>
      <input type="password" name="password" value={value} onChange={onChange} className={`w-full px-3  border rounded-lg sm:py-1 py-1 text-sm sm:text-lg outline-none font-roboto ${textColor} ${borderColor} ${customClass}`} placeholder={placeholder} required />
    </div>
  );
};

export default PasswordField;
