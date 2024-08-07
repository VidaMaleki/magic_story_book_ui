import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "../styles/Story.css";

const extractContent = (str: string) => {
  const contentMatch = str.match(/content=(.*?),\s*refusal=null/);
  return contentMatch ? contentMatch[1] : null;
};

const StoryPage: React.FC = () => {
  const location = useLocation();
  const { story } = location.state;

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
            />
          )}
          <p>{extractContent(story.content)}</p>
        </div>
      </main>
    </div>
  );
};

export default StoryPage;
