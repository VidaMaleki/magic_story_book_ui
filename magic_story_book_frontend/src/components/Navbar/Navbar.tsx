import { useEffect, useState } from "react";
import NavButton from "./NavButton";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const [selected, setSelected] = useState("");
  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);
  return (
    <div className="navbar-container">
      <div className="logo-wrapper">
        <Link to="/">
          <img alt="Logo" src={`${import.meta.env.VITE_PUBLIC_URL}/magicstorybook.png`} />
        </Link>{" "}
      </div>
      <div className="button-wrapper">
        <NavButton
          path="/"
          label="Create Story"
          isSelected={selected === "/"}
        />
        <NavButton
          path="/my-story"
          label="My Story"
          isSelected={selected === "/my-story"}
        />
        <NavButton
          path="/library"
          label="Library"
          isSelected={selected === "/library"}
        />
      </div>
      <div className="profile-icon">
        <Link to="/profile">
          <img
            alt="Profile"
            src={`${import.meta.env.VITE_PUBLIC_URL}/images/profile.png`}
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
