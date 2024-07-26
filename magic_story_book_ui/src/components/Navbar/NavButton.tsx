import React from "react";
import { NavLink } from "react-router-dom";
import "./NavButton.css";

interface NavButtonProps {
  path: string;
  label: string;
  isSelected?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ path, label, isSelected }) => {
  return (
    <div className="navbutton-container">
      <NavLink to={path} className={`${isSelected ? "selected" : ""}`}>
        {label}
      </NavLink>
    </div>
  );
};
export default NavButton;
