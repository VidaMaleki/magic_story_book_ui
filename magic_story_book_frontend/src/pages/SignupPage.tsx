import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css";
import SimpleNavbar from "../components/Navbar/SimpleNavbar";

const SignInPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async (isSignUp: boolean) => {
    try {
      const email = await getEmailFromGoogle();
      const response = await axios.get(`http://localhost:8081/api/user/email?email=${email}`, {
        withCredentials: true
      });

      if (response.data && isSignUp) {
        alert("You already have an account. Please sign in to get started.");
      } else if (!response.data && !isSignUp) {
        alert("You need to sign up first.");
      } else {
        window.location.href = "http://localhost:8081/oauth2/authorization/google";
      }
    } catch (error) {
      if (!isSignUp) {
        alert("You need to sign up first.");
      } else {
        window.location.href = "http://localhost:8081/oauth2/authorization/google";
      }
    }
  };

  const getEmailFromGoogle = async (): Promise<string> => {
    // This function should fetch the email from Google OAuth2.0
    // Here, we're assuming you have a mechanism to fetch the email before checking the database.
    // Replace this with the actual logic to get the email from Google.
    return "user@example.com";
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/user/profile', {
          withCredentials: true
        });
        navigate('/'); // Redirect to home if the user is already logged in
      } catch (error) {
        // User not logged in, do nothing
        
      }
    };

    fetchUser();
  }, [location, navigate]);

  return (
    <div className="signup-container">
      <SimpleNavbar />
      <div className="signup-wrapper">
        <img id="app-img" src="/images/magicstorybook.png" alt="Magic Storybook" />
        <button onClick={() => handleLogin(true)}>
          <img src="/images/google.png" alt="Google" id="google-img" />
          Sign Up with Google
        </button>
        <div className="signin-wrapper">
          <p>You already have account?</p>
          <button id="signin-img" onClick={() => handleLogin(true)}>
            <img src="/images/google.png" alt="Google" id="google-img" />
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
