import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const activeStyles = {
  fontWeight: "bold",
  textDecoration: "underline",
  color: "#3FA34D",
};

export default function DashboardNavbar() {
  const { userData } = useAuth();

  return (
    <div>
      <nav className="dash-nav">
        <NavLink
          to="."
          end
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Datasets
        </NavLink>
        {userData && userData.access === "admin" ? (
          <>
            <NavLink
              to="indices"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Indices
            </NavLink>
            <NavLink
              to="analyst-requests"
              style={({ isActive }) => (isActive ? activeStyles : null)}
            >
              Analyst Requests
            </NavLink>
          </>
        ) : null}
      </nav>
    </div>
  );
}
