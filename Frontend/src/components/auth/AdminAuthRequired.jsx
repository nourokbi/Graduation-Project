import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export default function AdminAuthRequired() {
  const { loading, userData } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can show a spinner or loading screen here
  }
  if (userData && userData.access === "admin") {
    return <Outlet />;
  } else {
    return <Navigate to="/dashboard" replace={true} />;
  }
}
