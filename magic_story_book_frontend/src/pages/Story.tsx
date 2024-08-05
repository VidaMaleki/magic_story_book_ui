import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "../styles/Story.css";

const StoryPage: React.FC = () => {
  const location = useLocation();
  const { story } = location.state;

  return (
    <div className="story-page-container">
      <Navbar />
      <main className="story-main-content">
        <h1>Your Story</h1>
        <div className="story-content">
          <img src={story.image} alt="Story Illustration" className="story-image" />
          <p>{story.content}</p>
        </div>
      </main>
    </div>
  );
};

export default StoryPage;
