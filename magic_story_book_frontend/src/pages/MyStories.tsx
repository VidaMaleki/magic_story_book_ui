import React, { useState, useEffect } from "react";
import StoryCard from "../components/Card/StoryCard";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../styles/MyStories.css";
import Navbar from "../components/Navbar/Navbar";

interface Story {
  id: number;
  title: string;
  image: string;
  content: string;
}

const MyStories: React.FC = () => {
  const { userProfile, isAuthenticated, token } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  // const handleEdit = (id: number) => {
  //   console.log(`Edit story with id: ${id}`);
  //   // Handle edit logic
  // };

  const handleCardClick = (story: Story) => {
    setSelectedStory(story);
  };

  const handleClosePopup = () => {
    setSelectedStory(null);
  };

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
              title={story.title}
              image={story.image}
              onDelete={handleDelete}
              // onEdit={handleEdit}
              onClick={() => handleCardClick(story)}
            />
          ))}
        </div>
        {selectedStory && (
          <div className="story-popup">
            <div className="story-popup-content">
              <h2>{selectedStory.title}</h2>
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className="story-popup-image"
              />
              <p>{selectedStory.content}</p>
              <button onClick={handleClosePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyStories;
