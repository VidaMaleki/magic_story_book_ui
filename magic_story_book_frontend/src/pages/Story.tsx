import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "../styles/Story.css";
import { extractContent } from "../utiles/helper";

const StoryPage: React.FC = () => {
  const location = useLocation();
  const { story } = location.state;

  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "/images/default.webp";
  };
  console.log("Story object:", extractContent(story.content));
  console.log("Story title:", story);

  return (
    <div className="story-page-container">
      <Navbar />
      <main className="story-main-content">
        <h1>{story.title}</h1>
        <div className="story-content">
          {story.image && (
            <img
              src={story.image}
              alt="Story Illustration"
              className="story-image"
              onError={handleError}
            />
          )}
          <p>{extractContent(story.content)}</p>
        </div>
      </main>
    </div>
  );
};

export default StoryPage;
