import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router";
import { Loader } from "@mantine/core";

const ProtectedRoute = ({ children }) => {
  const { session } = useAuth();

  if (session === undefined) {
    return (
      <div className="full-section">
        <Loader color="blue" size={150} />
      </div>
    );
  }

  return session ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
