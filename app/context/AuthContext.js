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
    signUp,
    logout,
    continueAsGuest,
    getUserFirstName,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
