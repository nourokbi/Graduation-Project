import { NavLink } from "react-router-dom";

const activeStyles = {
  fontWeight: "bold",
  textDecoration: "underline",
  color: "#3FA34D",
};

export default function DashboardNavbar() {
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
        <NavLink
          to="indices"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Indices
        </NavLink>
        <NavLink
          to="roles"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Roles
        </NavLink>
        <NavLink
          to="signup"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Analyst Signup
        </NavLink>
      </nav>
    </div>
  );
}
