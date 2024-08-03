import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import "../styles/Story.css";

const Story: React.FC = () => {
  const location = useLocation();
  const { story } = location.state as { story: string };

  return (
    <div className="story-page-container">
      <Navbar />
      <main className="story-page-main-content">
        <h2>Your Generated Story</h2>
        <p>{story}</p>
      </main>
    </div>
  );
};

export default Story;
