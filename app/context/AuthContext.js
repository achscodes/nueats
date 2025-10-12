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

// Helper function to check suspension status
const performSuspensionCheck = async (userId, source) => {
    console.log(`${source}: Checking suspension for user:`, userId);
    
    try {
        // Create a promise for the DB query
        const suspensionCheckPromise = supabase
            .from('profiles')
            .select('is_suspended')
            .eq('id', userId)
            .maybeSingle();

        // Create a timeout promise
        const timeoutPromise = new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Suspension check timeout')), 5000)
        );

        // Race the query and the timeout
        const { data: profileData, error: profileError } = await Promise.race([
            suspensionCheckPromise,
            timeoutPromise
        ]).catch(err => {
            console.log(`${source}: Suspension check timed out or failed:`, err.message);
            return { data: null, error: err };
        });

        console.log(`${source}: Profile data:`, profileData, 'Error:', profileError);

        // Check if user is suspended
        if (profileError) {
            console.error(`${source}: DB Error checking suspension:`, profileError);
            return { isSuspended: false };
        }
        
        // Return true if suspended, false otherwise (including no profile)
        return { isSuspended: profileData?.is_suspended === true };

    } catch (error) {
        console.error(`${source}: Exception during suspension check:`, error.message);
        return { isSuspended: false };
    }
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
      setIsLoading(true); // Set loading while checking session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!isMounted) {
            setIsLoading(false); // Ensure loading is cleared on unmount race
            return;
        }

      if (session?.user) {
        const { isSuspended } = await performSuspensionCheck(session.user.id, 'Init');

        if (isSuspended) {
          // User is suspended - sign them out
          console.log('Init: User is suspended! Signing out...');
          await supabase.auth.signOut();
          setUser(null);
          setIsAuthenticated(false);
        } else {
          setUser(session.user);
          setIsAuthenticated(true);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false); // Clear loading after session check
    };
    init();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed. Event:', event, 'Session:', session?.user?.id);
        
        // Handle PASSWORD_RECOVERY event specifically
        if (event === 'PASSWORD_RECOVERY') {
          console.log('Password recovery event detected');
          // Session is available during password recovery
          if (session?.user) {
            setUser(session.user);
            setIsAuthenticated(true);
          }
          return;
        }
        
        // Handle SIGNED_IN event to check for suspension
        if (session?.user) {
          const { isSuspended } = await performSuspensionCheck(session.user.id, 'onAuthStateChange');

          if (isSuspended) {
            // User is suspended - sign them out
            console.log('onAuthStateChange: User is suspended! Signing out...');
            await supabase.auth.signOut();
            setUser(null);
            setIsAuthenticated(false);
            return;
          }
          
          // If not suspended, set the session state
          setUser(session.user);
          setIsAuthenticated(true);
        } else {
          // Handle SIGNED_OUT, TIMEOUT, USER_DELETED, etc.
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
      
      // Check if user is suspended before resolving the login promise
      const { isSuspended } = await performSuspensionCheck(data.user.id, 'login');

      if (isSuspended) {
        // User is suspended - sign them out immediately
        await supabase.auth.signOut();
        setIsLoading(false);
        return { 
          success: false, 
          message: "Your account has been suspended. Please contact support for assistance.",
          isSuspended: true
        };
      }

      // If successful and NOT suspended, set state and return success
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

  // Sign up with Supabase
  const signUp = async ({ email, password, displayName, phoneNumber }) => {
    console.log("=== AUTH CONTEXT SIGNUP STARTED ===");
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { 
            display_name: displayName,
            phone: phoneNumber 
          },
        },
      });

      if (error) {
        console.error("❌ Supabase signup error:", error);
        setIsLoading(false);
        return { success: false, message: error.message };
      }

      // Create profile in profiles table
      try {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            display_name: displayName,
            email: data.user.email,
            phone: phoneNumber,
            role: 'customer',
            is_suspended: false,
            created_at: new Date().toISOString(),
            avatar_url: '',
            security_settings: {
              "passwordExpiry": "90 days",
              "sessionTimeout": "30 minutes",
              "twoFactorEnabled": false,
              "loginNotifications": true
            }
          });

        if (profileError) {
          console.error("❌ Profile creation failed:", profileError);
        } else {
          console.log("✅ Profile created successfully");
        }
      } catch (profileException) {
        console.error("❌ Profile creation exception:", profileException);
      }

      setIsLoading(false);
      return { success: true, message: "Account created. Check your email to verify." };
    } catch (e) {
      console.error("❌ Signup exception:", e);
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
        console.error('Password reset error:', error);
        return { success: false, message: error.message };
      }
      
      return { success: true, message: "Password reset email sent. Check your inbox." };
    } catch (e) {
      console.error('Password reset exception:', e);
      return { success: false, message: "An error occurred while sending reset email" };
    }
  };

  // Update password (called after user clicks reset link)
  const updatePassword = async (newPassword) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        console.error('Password update error:', error);
        return { success: false, message: error.message };
      }

      console.log('Password updated successfully');
      return { success: true, message: "Password updated successfully" };
    } catch (e) {
      console.error('Password update exception:', e);
      return { success: false, message: "An error occurred while updating password" };
    }
  };

  // Handle password recovery tokens from deep link
  const handleRecoveryTokens = async (url) => {
    try {
      console.log('Processing recovery URL:', url);
      
      // Extract tokens from URL (handle both # and ? formats)
      const hashPart = url.split('#')[1];
      const queryPart = url.split('?')[1];
      const params = new URLSearchParams(hashPart || queryPart || '');
      
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');
      const type = params.get('type');
      
      console.log('Extracted tokens:', { 
        hasAccessToken: !!accessToken, 
        hasRefreshToken: !!refreshToken,
        type 
      });
      
      if (type === 'recovery' && accessToken && refreshToken) {
        // Set the session using the tokens from the URL
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        
        if (error) {
          console.error('Error setting recovery session:', error);
          return { success: false, message: error.message };
        }
        
        console.log('Recovery session set successfully');
        setUser(data.session.user);
        setIsAuthenticated(true);
        
        return { success: true, message: "Recovery session established" };
      }
      
      return { success: false, message: "Invalid recovery link" };
    } catch (e) {
      console.error('Error handling recovery tokens:', e);
      return { success: false, message: e.message };
    }
  };

  // Verify if user has a valid recovery session
  const hasRecoverySession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Current session check:', { hasSession: !!session, userId: session?.user?.id });
      return !!session;
    } catch (e) {
      console.error('Session check error:', e);
      return false;
    }
  };

  // Guest login function
  const continueAsGuest = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  // Get user's first name
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

  // Get user initials
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
    return "G";
  };

  // Update user data
  const updateUser = (updatedUserData) => {
    setUser((prev) => ({ ...prev, ...updatedUserData }));
  };

  // Check suspension status
  const checkSuspensionStatus = async () => {
    if (!user || !isAuthenticated) return { isSuspended: false };

    const { isSuspended } = await performSuspensionCheck(user.id, 'checkSuspensionStatus');

    if (isSuspended) {
      console.log('User is suspended! Logging out...');
      await logout();
      return { isSuspended: true };
    }
    return { isSuspended: false };
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
    updatePassword,
    handleRecoveryTokens,
    hasRecoverySession,
    getUserFirstName,
    getUserInitials,
    updateUser,
    checkSuspensionStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};