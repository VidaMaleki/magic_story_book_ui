import { useEffect, useState } from "react";
import NavButton from "./NavButton";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import ProfilePopup from "../Profile/ProfilePopup";

const Navbar = () => {
  const location = useLocation();
  const [selected, setSelected] = useState("");
  const [isProfilePopupVisible, setProfilePopupVisible] = useState(false); // State for popup visibility

  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);

  const toggleProfilePopup = () => {
    setProfilePopupVisible(!isProfilePopupVisible);
  };

  const closeProfilePopup = () => {
    setProfilePopupVisible(false);
  };

  return (
    <div className="navbar-container">
      <div className="logo-wrapper">
        <Link to="/">
          <img alt="Logo" src="/images/magicstorybook.png"/>
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
      <div className="profile-icon" onClick={toggleProfilePopup}>
        <img
          alt="Profile"
          src="/images/profile.png"
        />
      </div>
      {isProfilePopupVisible && (
        <ProfilePopup onClose={closeProfilePopup} />
      )}
    </div>
  );
};

export default Navbar;
