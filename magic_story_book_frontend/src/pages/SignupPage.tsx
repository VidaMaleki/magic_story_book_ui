import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Signup.css';
import SimpleNavbar from '../components/Navbar/SimpleNavbar';
import { useAuth } from '../context/AuthContext';

const SignInPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, isAuthenticated, setUserProfile, setToken } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/user/profile', {
          withCredentials: true
        });
        console.log('User profile:', response.data);
    
        if (response.data) {
          const { user, token } = response.data;
    
          // Update the user profile in context
          setUserProfile(user);
    
          // Store token in local storage and update context
          if (token) {
            localStorage.setItem('authToken', token);
            setToken(token);
          }
    
          navigate('/'); // Redirect to the home page or desired route
        }
      } catch (error) {
        console.error('User not logged in:', error);
      }
    };
    if (!isAuthenticated) {
      fetchUser();
    } else {
      navigate('/');
    }
  }, [isAuthenticated, location, navigate, setUserProfile, setToken]);

  return (
    <div className="signup-container">
      <SimpleNavbar />
      <div className="signup-wrapper">
        <img id="app-img" src="/images/magicstorybook.png" alt="Magic Storybook" />
        <button id="signup-btn" onClick={login}>
          <img src="/images/google.png" alt="Google" id="google-img" />
          Sign Up with Google
        </button>
        <div className="signin-wrapper">
          <p>You already have an account?</p>
          <button id="signin-btn" onClick={login}>
            <img src="/images/google.png" alt="Google" id="google-img" />
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
