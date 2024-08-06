// src/components/GoogleSignIn.tsx
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import './GoogleSignIn.css';

const GoogleSignIn: React.FC = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleSuccess = (response: CredentialResponse) => {
    console.log(response);
    if (response.credential) {
      // Store the token in localStorage (or sessionStorage)
      localStorage.setItem('authToken', response.credential);

      // Redirect to the backend endpoint to complete signup
      window.location.href = 'http://localhost:8081/signup/complete';
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
