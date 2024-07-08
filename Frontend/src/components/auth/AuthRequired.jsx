import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import Unauthorized from "../ui/Unauthorized";
import NotLogged from "../ui/NotLogged";

export default function AuthRequired() {
  const { isLoggedIn, loading, userData } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // You can show a spinner or loading screen here
  }

  if (userData?.access === "waiting") {
    return <Unauthorized />;
  }

  return isLoggedIn ? <Outlet /> : <NotLogged />;
}
