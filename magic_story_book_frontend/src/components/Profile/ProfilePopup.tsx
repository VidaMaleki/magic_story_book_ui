import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/ProfilePopup.css";
import { useAuth } from "../../context/AuthContext";

interface ProfilePopupProps {
  onClose: () => void;
}

const ProfilePopup: FC<ProfilePopupProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { userProfile, setUserProfile, logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching profile...");
        const response = await axios.get("http://localhost:8081/api/user/profile", { withCredentials: true });
        console.log("Profile response:", response);
        setUserProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setUserProfile]);

  const handleDeleteAccount = async () => {
    if (!userProfile?.id) {
      console.error("User ID is not available");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8081/api/user/${userProfile.id}`, { withCredentials: true });
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

  if (loading) {
    return (
      <>
        <div className="profile-popup-overlay" />
        <div className="loading-container">
          <div>Loading...</div>
        </div>
      </>
    );
  }

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
            <img src="/images/profile.png" alt="Profile" />
            <button className="change-photo-button">Change Photo</button>
          </div>
          <div className="profile-fields">
            <h3>{userProfile?.firstName} {userProfile?.lastName}</h3>
            <div className="field-group">
              <label>Child's age</label>
              <select value={userProfile?.age || "3 years old"} disabled>
                <option>3 years old</option>
                <option>4 years old</option>
                <option>5 years old</option>
                <option>6 years old</option>
                <option>7 years old</option>
                <option>8 years old</option>
              </select>
            </div>
            <div className="field-group">
              <label>Starting Lexile</label>
              <input type="text" placeholder="520L" value={userProfile?.lexile || ""} disabled />
            </div>
          </div>
        </div>
        <div className="profile-popup-footer">
          <button className="save-button">Save Changes</button>
        </div>
        <div className="profile-popup-actions">
          <button onClick={logout} className="logout-button">
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
