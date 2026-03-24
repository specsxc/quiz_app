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
      setSession(session);
      console.log("Session changed:", session);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
