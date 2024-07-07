import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export default function AuthRequired() {
  const { isLoggedIn, loading, userData } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can show a spinner or loading screen here
  }

  if (userData?.access === "waiting") {
    return <Navigate to="/" replace={true} />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace={true} />;
}
