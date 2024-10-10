import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

useAuth;
function PrivateRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PrivateRoute;
