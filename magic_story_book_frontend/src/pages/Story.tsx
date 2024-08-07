import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "../styles/Story.css";

const extractStoryContent = (contentString: string) => {
  const match = contentString.match(/content=([^,]*)/);
  return match ? match[1] : "Content not available";
};

const formatContent = (content: string) => {
  return content.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};

const StoryPage: React.FC = () => {
  const location = useLocation();
  const { story } = location.state;

  console.log('Story object:', story);

  const storyContent = extractStoryContent(story.content);

  return (
    <div className="story-page-container">
      <Navbar />
      <main className="story-main-content">
        <h1>Your Story</h1>
        <div className="story-content">
          {story.image && <img src={story.image} alt="Story Illustration" className="story-image" />}
          <p>{formatContent(storyContent)}</p>
        </div>
      </main>
    </div>
  );
};

export default StoryPage;
