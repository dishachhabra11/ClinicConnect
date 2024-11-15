import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      // Check for token in cookies when app loads
      const token = Cookies.get("clinicConnect");
      setIsAuthenticated(!!token); // Set to true if token exists
    } catch (error) {
      console.error("Error retrieving token from cookies:", error);
    }
  }, []);

  // Login function
  const login = (token) => {
    try {
      Cookies.set("clinicConnect", token, {
        expires: 15,
        sameSite: "strict",
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error setting token in cookies:", error);
    }
  };

  // Logout function
  const logout = () => {
    try {
      Cookies.remove("clinicConnect");
      
      setIsAuthenticated(false);
      alert("Logged out successfully");
    } catch (error) {
      console.error("Error removing token from cookies:", error);
    }
  };

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
