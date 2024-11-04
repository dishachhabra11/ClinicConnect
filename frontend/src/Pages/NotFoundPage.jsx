import React from "react";
import { Header } from "../components/Headers/Header";

function NotFoundPage() {
  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center bg-white p-8 shadow-md rounded-lg max-w-md flex flex-col justify-center items-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">Page not found</h2>
          <p className="text-gray-500 mb-6">The link you clicked may be broken or the page may have been removed or renamed.</p>
          <button onClick={() => window.history.back()} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center ">
            <span className="material-icons mr-2"></span>
            Go back
          </button>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;
