import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../../lib/supabase";

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

  // Initialize session and listen for changes
  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!isMounted) return;
      if (session?.user) {
        setUser(session.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    init();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  // Login with Supabase
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setIsLoading(false);
        return { success: false, message: error.message };
      }
      setUser(data.user);
      setIsAuthenticated(true);
      setIsLoading(false);
      return { success: true, message: "Logged in" };
    } catch (e) {
      setIsLoading(false);
      return { success: false, message: "An error occurred during login" };
    }
  };

  // Logout function
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAuthenticated(false);
  };

  // Sign up with Supabase; store display_name in user_metadata
  const signUp = async ({ email, password, displayName }) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName },
        },
      });
      if (error) {
        setIsLoading(false);
        return { success: false, message: error.message };
      }
      // Depending on email confirmations, user may need to verify email
      setIsLoading(false);
      return { success: true, message: "Account created. Check your email to verify." };
    } catch (e) {
      setIsLoading(false);
      return { success: false, message: "An error occurred during sign up" };
    }
  };

  // Request password reset email
  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'nueats://auth/recovery',
      });
      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true, message: "Password reset email sent" };
    } catch (e) {
      return { success: false, message: "An error occurred while sending reset email" };
    }
  };

  // Guest login function
  const continueAsGuest = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  // Get user's first name (supports Supabase user metadata)
  const getUserFirstName = () => {
    if (user) {
      const metadata = user.user_metadata || {};
      const displayName = metadata.display_name || user.name;
      if (displayName && typeof displayName === "string") {
        return displayName.split(" ")[0];
      }
      if (user.email) {
        const localPart = user.email.split("@")[0];
        return localPart.charAt(0).toUpperCase() + localPart.slice(1);
      }
    }
    return "Guest";
  };

  // Get user initials for avatar badge
  const getUserInitials = () => {
    if (user) {
      const metadata = user.user_metadata || {};
      const displayName = metadata.display_name || user.name || "";
      const source = displayName || (user.email ? user.email.split("@")[0] : "");
      if (source) {
        const parts = source.trim().split(/\s+/);
        const first = parts[0]?.charAt(0) || "";
        const second = parts.length > 1 ? parts[1]?.charAt(0) : "";
        return (first + second).toUpperCase() || first.toUpperCase() || "U";
      }
    }
    return "G"; // Guest
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
    signUp,
    logout,
    continueAsGuest,
    resetPassword,
    getUserFirstName,
    getUserInitials,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
