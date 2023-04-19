import { Outlet } from "react-router-dom";
import { useUser } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useUser();

  if (!user.token) {
    return <Navigate to="/register" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
