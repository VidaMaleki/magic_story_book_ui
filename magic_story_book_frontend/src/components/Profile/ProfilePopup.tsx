import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/ProfilePopup.css";

interface ProfilePopupProps {
  onClose: () => void;
}

interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  age: string;
  lexile: string;
}

const ProfilePopup: FC<ProfilePopupProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Fetching profile...");
        const response = await axios.get("http://localhost:8081/api/user/profile", { withCredentials: true });
        console.log("Profile response:", response);
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      console.log("Attempting to log out...");
      const response = await axios.get("http://localhost:8081/logout", { withCredentials: true });
      console.log("Logout response:", response);
      if (response.status === 200 || response.status === 302) {
        navigate("/signup");
      } else {
        console.error("Logout failed with status:", response.status);
      }
    } catch (error) {
      console.error("Logout failed", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response);
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (!profile?.id) {
      console.error("User ID is not available");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8081/api/user/${profile.id}`, { withCredentials: true });
      console.log("Delete account response:", response);
      if (response.status === 200 || response.status === 204) {
        navigate("/signup");
      } else {
        console.error("Delete account failed with status:", response.status);
      }
    } catch (error) {
      console.error("Delete account failed", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response);
      }
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
            <h3>{profile?.firstName} {profile?.lastName}</h3>
            <div className="field-group">
              <label>Child's age</label>
              <select value={profile?.age || "3 years old"} disabled>
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
              <input type="text" placeholder="520L" value={profile?.lexile || ""} disabled />
            </div>
          </div>
        </div>
        <div className="profile-popup-footer">
          <button className="save-button">Save Changes</button>
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
