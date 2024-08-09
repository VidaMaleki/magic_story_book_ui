import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('authToken', token);
      navigate('/'); // Redirect to the intended page after storing the token
    } else {
      navigate('/signup'); // Handle error or redirect to signup
    }
  }, [navigate]);

  return <div>Loading...</div>; // Optionally show a loading indicator
};

export default OAuth2Callback;