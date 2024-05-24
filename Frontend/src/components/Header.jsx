import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { Logo } from "./Logo";

export default function Header() {
  const navRef = useRef();
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#3FA34D",
  };
  const innerContainerStyles = {
    boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.1)",
  };
  const toggleNavbar = () => {
    navRef.current.classList.toggle("nav-opened");
  };
  const closeNavbar = () => {
    navRef.current.classList.remove("nav-opened");
  };

  return (
    <div className="nav-container" style={innerContainerStyles}>
      <div className="container">
        <header>
          <Link className="site-logo" to="/">
            <Logo />
            <span>
              C<span> I </span>P
            </span>
          </Link>
          <nav ref={navRef}>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              onClick={closeNavbar}
            >
              Home
            </NavLink>
            <NavLink
              to="/analyze"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              onClick={closeNavbar}
            >
              Analyze
            </NavLink>
            <NavLink
              to="/dashboard"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              onClick={closeNavbar}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/about"
              style={({ isActive }) => (isActive ? activeStyles : null)}
              onClick={closeNavbar}
            >
              About
            </NavLink>
            <NavLink
              to="/login"
              // style={({ isActive }) => (isActive ? activeStyles : null)}
              onClick={closeNavbar}
              className={"nav-login"}
            >
              Login
            </NavLink>
            <button onClick={toggleNavbar} className="nav-btn nav-close-btn">
              <FaTimes />
            </button>
          </nav>
          <button onClick={toggleNavbar} className="nav-btn">
            <FaBars />
          </button>
        </header>
      </div>
    </div>
  );
}
