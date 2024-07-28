import React from "react";
import Navbar from "../components/Navbar/Navbar";
import "../styles/Login.css";
import Login from "../components/Auth/Login";

const LoginPage: React.FC = () => {
  return (
    <div className="loginPage-container">
      <Navbar/>
      <Login/>
    </div>
  );
};

export default LoginPage;
