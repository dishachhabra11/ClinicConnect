import React from "react";

const TextField = ({ label, value, onChange, placeholder, name, type = "text" }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <input
        type={type} // Make sure type is passed correctly (text, date, etc.)
        id={name}
        name={name}
        value={value} // Controlled input
        onChange={onChange} // Updating the state
        className="w-full px-3 sm:py-1 py-1 text-sm sm:text-lg border rounded-lg text-dark-gray border-light-gray outline-none font-roboto "
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default TextField;
