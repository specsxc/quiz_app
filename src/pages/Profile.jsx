import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { Loader } from "@mantine/core";
import supabase from "../services/supabase-client";

export default function Profile() {
  const { session } = useAuth();
  const [points, setPoints] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getPoints() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("points")
          .eq("id", session.user.id)
          .maybeSingle();

        if (error) throw error;

        setPoints(data.points);
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      } finally {
        setLoading(false);
      }
    }
    if (session?.user?.id) {
      getPoints();
    }
  }, [session?.user?.id]);

  if (loading)
    return (
      <div className="full-section">
        <Loader color="blue" size={150} />
      </div>
    );

  return (
    <div className="settings-wrapper profile-card">
      <div className="settings-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {session?.user?.user_metadata?.name[0].toUpperCase() || "U"}
          </div>
          <h2>User Profile</h2>
        </div>

        <div className="profile-info">
          <div className="info-group">
            <label>Email</label>
            <p>{session?.user?.user_metadata?.email}</p>
          </div>

          <div className="info-group">
            <label>Username</label>
            <p>{session?.user?.user_metadata?.name}</p>
          </div>

          <div className="info-group">
            <label>Points</label>
            <p>{points}</p>
          </div>

          <div className="info-group">
            <label>Account Status</label>
            <span className="badge">
              {session?.user?.user_metadata?.account_type || "Standard"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
