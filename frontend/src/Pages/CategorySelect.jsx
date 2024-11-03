import React, { useState } from "react";
import { Header } from "../components/Headers/Header";
import NavigationHeader from "../components/Headers/NavigationHeader";
import Button from "../components/Buttons/Button";

const categories = ["Fever", "Cough", "Cold", "Headache", "Body Pain", "Fatigue", "Shortness of Breath", "Nausea", "Vomiting", "Diarrhea", "Muscle Pain", "Sore Throat", "Dizziness", "Chest Pain", "Loss of Appetite", "Abdominal Pain", "Chills", "Joint Pain", "Swelling", "Rash", "Constipation", "Heart Palpitations", "Back Pain", "Numbness", "Excessive Sweating", "Blurred Vision", "Frequent Urination", "Skin Itching", "Dry Mouth", "Ear Pain", "Weight Loss"];

function CategorySelect({onSubmit}) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevSelected) => (prevSelected.includes(category) ? prevSelected.filter((item) => item !== category) : [...prevSelected, category]));
  };

  return (
    <>
      <NavigationHeader />
      <div className="max-w-lg mx-auto p-4">
        <h3 className="text-lg font-semibold mb-4">Select your symptoms</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1 rounded-full border text-sm font-medium 
              ${selectedCategories.includes(category) ? "bg-blue-100 text-blue-600 border-blue-600" : "bg-gray-100 text-gray-700 border-gray-300"} 
              transition duration-150`}
              onClick={() => handleCategoryClick(category)}>
              {category}
            </button>
          ))}
        </div>
        <p className="mt-4 text-sm text-gray-500">{selectedCategories.length} symptoms selected</p>
        <div className="mt-2 sm:max-w-[200px]" onClick={onSubmit}>
          <Button bgColor="bg-primary" >Submit</Button>
        </div>
      </div>
    </>
  );
}

export default CategorySelect;
