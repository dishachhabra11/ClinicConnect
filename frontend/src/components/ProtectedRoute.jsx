// components/ProtectedRoute.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ element }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Get auth status from context

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/patient/signin");
    }
  }, [isAuthenticated, navigate]);

  // Render the protected element only if authenticated
  return isAuthenticated ? element : null;
}

export default ProtectedRoute;

