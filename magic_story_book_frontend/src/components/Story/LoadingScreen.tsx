import React from 'react';
import '../../styles/LoadingScreen.css';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  return (
    <div className="loading-screen-wrapper">
    <div className="loading-container">
      <div className="loading-content">
        <img src="/images/blue_pencil.png" alt="Writing pencil" className="loading-pencil" />
        <p>{message || "Hang tight... We're building your story! This should take less than a minute."}</p>
        <p>Crafting the setting where all the fun happens...</p>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoadingScreen;
