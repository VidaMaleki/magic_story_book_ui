// import React from 'react'
import { motion } from "framer-motion";
import "../../styles/Login.css";
const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form>
          <div>
            <label>Username</label>
            <input type="text" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <motion.img
        src={`${import.meta.env.VITE_PUBLIC_URL}/images/magic_stick.png`}
        alt="Magic Stick"
        className="magic-stick"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default Login
