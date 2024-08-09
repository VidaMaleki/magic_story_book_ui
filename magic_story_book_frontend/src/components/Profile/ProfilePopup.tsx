import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ProfilePopup.css";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

interface ProfilePopupProps {
  onClose: () => void;
}

const ProfilePopup: FC<ProfilePopupProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { userProfile, logout, setUserProfile } = useAuth();

  const handleDeleteAccount = async () => {
    if (!userProfile?.id) {
      console.error("User ID is not available");
      return;
    }

    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/user/${userProfile.id}`, { withCredentials: true });
      console.log("Delete account response:", response);
      if (response.status === 200 || response.status === 204) {
        setUserProfile(null);
        navigate("/signup");
      } else {
        console.error("Delete account failed with status:", response.status);
      }
    } catch (error) {
      console.error("Delete account failed", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.reload(); // Reload the page to reset the state
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div className="profile-popup-overlay" onClick={onClose} />
      <div className="profile-popup">
        <div className="profile-popup-header">
          <h2>Profile</h2>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        <div className="profile-popup-content">
          <div className="profile-photo">
            <img
              src={userProfile?.profilePicture ? userProfile.profilePicture : "/images/profile.png"}
              alt="Profile"
            />
          </div>
          <div className="profile-fields">
            <h3>{userProfile?.firstName} {userProfile?.lastName}</h3>
          </div>
        </div>
        <div className="profile-popup-actions">
          <button onClick={handleLogout} className="logout-button">
            Log Out
          </button>
          <button onClick={handleDeleteAccount} className="delete-button">
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePopup;
