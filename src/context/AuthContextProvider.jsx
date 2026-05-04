import supabase from "../services/supabase-client";
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  //Session state (user info, sign-in status)
  useEffect(() => {
    async function getInitialSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        setSession(data.session);
      } catch (error) {
        console.error("Error getting session:", error.message);
      }
    }
    getInitialSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Session changed:", session);
      setSession(session);
    });
  }, []);

  //Auth functions

  /* signInUser */
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });
      if (error) {
        console.error("Supabase sign-in error:", error.message);
        return { success: false, error: error.message };
      }
      console.log("Supabase sign-in success:", data);
      return { success: true, data };
    } catch (error) {
      console.error("Unexpected error during sign-in:", error.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  /* signUpNewUser */

  const signUpNewUser = async (email, password, fullName, accountType) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password: password,
        options: {
          data: {
            name: fullName,
            account_type: accountType,
          },
        },
      });
      if (error) {
        console.error("Supabase sign-up error:", error.message);
        return { success: false, error: error.message };
      }
      console.log("Supabase sign-up success:", data);
      return { success: true, data };
    } catch (error) {
      console.error("Unexpected error during sign-up:", error.message);
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  /* signOut */
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Supabase sign-out error:", error.message);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error) {
      console.error("Unexpected error during sign-out:", error.message);
      return {
        success: false,
        error: "An unexpected error occurred during sign out.",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, signInUser, signOut, signUpNewUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
