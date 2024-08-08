import React, { useState, useRef, useEffect } from 'react';
import Navbar from "../components/Navbar/Navbar";
import StoryCard from "../components/Card/StoryCard";
import { LibraryProps } from "../components/types";
import { libraries } from "../assets/libraries";
import "../styles/MyStories.css";

const LibraryPage = () => {
  const [selectedStory, setSelectedStory] = useState<LibraryProps | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (story: LibraryProps) => {
    setSelectedStory(story);
  };

  const handleClosePopup = () => {
    setSelectedStory(null);
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
        <h1>My Library</h1>
        <div className="stories-container">
          {libraries.map((story, index) => (
            <StoryCard
              key={index}
              id={index}
              title={story.title}
              image={story.image}
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
              <h2>{selectedStory.title}</h2>
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className="story-popup-image"
              />
              <p>{selectedStory.content}</p>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
