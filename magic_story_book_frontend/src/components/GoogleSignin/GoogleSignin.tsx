import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import axios from 'axios';
import './GoogleSignIn.css';

const GoogleSignIn: React.FC = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleSuccess = async (response: CredentialResponse) => {
    console.log(response);

    if (response.credential) {
      try {
        const token = response.credential;
        // Store the token in localStorage (or sessionStorage)
        localStorage.setItem('authToken', token);

        // Send the token to the backend
        const res = await axios.post('http://localhost:8081/signup', { token });

        if (res.status === 200) {
          console.log('User registered successfully:', res.data);
          // Handle successful registration (e.g., navigate to another page or update UI)
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
  };

  const handleFailure = () => {
    console.error('Google Sign-In error');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="signup-container">
        <h2>Sign up by</h2>
        <div className="google-signin-button">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleFailure}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleSignIn;
