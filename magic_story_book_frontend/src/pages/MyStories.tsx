import React, { useState, useEffect, useRef } from "react";
import StoryCard from "../components/Card/StoryCard";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/MyStories.css";
import Navbar from "../components/Navbar/Navbar";
import { extractContentFromResponse, capitalizeFirstLetter } from '../utiles/helper';
import { Story } from "../components/types";
import { useNavigate } from "react-router-dom";

const MyStories: React.FC = () => {
  const { userProfile, isAuthenticated, token } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const popupRef = useRef<HTMLDivElement>(null);
  const userId = userProfile?.id || 0;
  const navigate = useNavigate();

  const fetchStories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${userProfile?.id}/stories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched stories:", response.data);
      setStories(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error response:", error.response);
        setError(error.response?.data?.message || "Failed to fetch stories");
      } else {
        console.log("Error:", error);
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && userId) {
      fetchStories();
    }
  }, [isAuthenticated, userProfile]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/stories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchStories();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to delete story");
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const handleCardClick = (story: Story) => {
    setSelectedStory(story);
  };

  const handleClosePopup = () => {
    setSelectedStory(null);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = "/images/default2.webp";
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      handleClosePopup();
    }
  };

  return (
    <div className="my-stories-page-container">
      <Navbar />
      <div className="my-stories-page">
        <h1>My Stories</h1>
        {error && <div className="error-message">{error}</div>}
        {stories.length === 0 ? (
          <div className="no-stories-message">
            <p>You have no stories yet.</p>
            <p>Click <span onClick={() => navigate("/")} style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}>here</span> to create your first story!</p>
          </div>
        ) : (
          <div className="stories-container">
            {stories.map((story) => (
              <StoryCard
                key={story.id}
                id={story.id}
                title={capitalizeFirstLetter(story.title)}
                image={story.image}
                onDelete={handleDelete}
                onClick={() => handleCardClick(story)}
              />
            ))}
          </div>
        )}
        {selectedStory && (
          <div className="story-popup" onClick={handleOverlayClick}>
            <div className="story-popup-content" ref={popupRef}>
              <button className="popup-close-button" onClick={handleClosePopup}>
                &times;
              </button>
              <h2>{capitalizeFirstLetter(selectedStory.title)}</h2>
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className="story-popup-image"
                onError={handleError}
              />
              <p>{extractContentFromResponse(selectedStory.content)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyStories;
