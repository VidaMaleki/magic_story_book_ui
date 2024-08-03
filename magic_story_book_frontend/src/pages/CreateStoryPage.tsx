import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { genres } from "../assets/genres";
import '../styles/CreateStory.css';
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

const CreateStoryPage: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
  };

  const handleNextClick = () => {
    if (selectedGenre) {
      navigate("/characters", { state: { genre: selectedGenre } });
    } else {
      alert("Please select a genre before proceeding.");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="create-story-container">
        <main className="create-story-main-content">
          <div className="genre-card ">
            <h2>Create a Story</h2>
            <p>Select a Genre</p>
            <div className="genre-buttons">
              {genres.map((genre, i) => (
                <div
                key={genre.name}
                onClick={() => handleGenreSelect(genre.name)}
                className={`genre-card-wrapper ${selectedGenre === genre.name ? "selected" : ""}`}
              >
                <Card
                  key={i}
                  image={genre.image}
                  name={genre.name}
                  description={genre.description}
                />
              </div>
              ))}
            </div>
            <button className="next-button" onClick={handleNextClick}>Next</button>          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateStoryPage;
