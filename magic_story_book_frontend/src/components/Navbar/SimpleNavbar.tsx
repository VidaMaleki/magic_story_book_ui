
import "./Navbar.css";
import { Link } from "react-router-dom";

const SimpleNavbar = () => {
  
  return (
    <div className="navbar-container">
      <div className="logo-wrapper">
        <Link to="/">
          <img
            alt="Logo"
            src={`${import.meta.env.VITE_PUBLIC_URL}/images/magicstorybook.png`}
          />
        </Link>{" "}
      </div>
    </div>
  );
};

export default SimpleNavbar;
