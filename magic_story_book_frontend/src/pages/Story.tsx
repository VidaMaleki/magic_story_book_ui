import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "../styles/Story.css";
import { extractContentFromResponse } from "../utiles/helper";

const StoryPage: React.FC = () => {
  const location = useLocation();
  const { story } = location.state;

  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "/images/default.webp";
  };

  // Safely extract content
  const storyContent = story ? extractContentFromResponse(story.content) : null;

  console.log("Story object:", story);
  console.log("Extracted Story content:", storyContent);

  return (
    <div className="story-page-container">
      <Navbar />
      <main className="story-main-content">
        <h1>{story?.title}</h1>
        <div className="story-content">
          {story?.image && (
            <img
              src={story.image}
              alt="Story Illustration"
              className="story-image"
              onError={handleError}
            />
          )}
          <p>{storyContent}</p>
        </div>
      </main>
    </div>
  );
};

export default StoryPage;
