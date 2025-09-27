import React, { createContext, useState, useContext, useEffect } from "react";
import { demoHelpers } from "../demodata/profileDemoData.js";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is guest
  const isGuest = !isAuthenticated || !user;

  // Login function using demo data
  const login = async (email, password) => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Use the demo authentication helper
      const result = demoHelpers.authenticateUser(email, password);

      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        setIsLoading(false);
        return { success: true, message: result.message };
      } else {
        setIsLoading(false);
        return { success: false, message: result.message };
      }
    } catch (error) {
      setIsLoading(false);
      return { success: false, message: "An error occurred during login" };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  // Guest login function
  const continueAsGuest = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  // Get user's first name
  const getUserFirstName = () => {
    if (user && user.name) {
      return user.name.split(" ")[0];
    }
    return "Guest";
  };

  // Update user data
  const updateUser = (updatedUserData) => {
    setUser((prev) => ({ ...prev, ...updatedUserData }));
  };

  const value = {
    user,
    isAuthenticated,
    isGuest,
    isLoading,
    login,
    logout,
    continueAsGuest,
    getUserFirstName,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
