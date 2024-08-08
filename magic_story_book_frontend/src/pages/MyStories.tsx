import React, { useState, useEffect, useRef } from "react";
import StoryCard from "../components/Card/StoryCard";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/MyStories.css";
import Navbar from "../components/Navbar/Navbar";
import { extractContent, capitalizeFirstLetter } from '../utiles/helper'; // Ensure you import the function
import { Story } from "../components/types";

const MyStories: React.FC = () => {
  const { userProfile, isAuthenticated, token } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [error, setError] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated && userProfile) {
      fetchStories();
    }
  }, [isAuthenticated, userProfile]);

  const fetchStories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/user/${userProfile?.id}/stories`,
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
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/stories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchStories(); // Refresh the stories list after deletion
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
    event.currentTarget.src = "/images/default2.webp"; // Ensure this path is correct
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      handleClosePopup();
    }
  };

  useEffect(() => {
    if (selectedStory) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedStory]);

  return (
    <div className="my-stories-page-container">
      <Navbar />
      <div className="my-stories-page">
        <h1>My Stories</h1>
        {error && <div className="error-message">{error}</div>}
        <div className="stories-container">
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              id={story.id}
              title={capitalizeFirstLetter(story.title)} // Apply the helper function here
              image={story.image}
              onDelete={handleDelete}
              onClick={() => handleCardClick(story)}
            />
          ))}
        </div>
        {selectedStory && (
          <div className="story-popup">
            <div className="story-popup-content" ref={popupRef}>
              <button className="popup-close-button" onClick={handleClosePopup}>
                &times;
              </button>
              <h2>{capitalizeFirstLetter(selectedStory.title)}</h2> {/* Apply the helper function here */}
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className="story-popup-image"
                onError={handleError}
              />
              <p>{extractContent(selectedStory.content)}</p>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyStories;
