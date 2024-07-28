import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card";
import "../styles/Characters.css";
import { genres } from "../assets/genres";

interface Character {
  name: string;
  image: string;
  description: string;
}


const CharacterSelectionPage: React.FC = () => {
  const location = useLocation();
  const { genre } = location.state as { genre: string };
  const selectedGenre = genres.find((g) => g.name === genre);
  
  if (!selectedGenre) {
    return <div>Genre not found</div>;
  }

  const characters = selectedGenre["characters"];
  console.log("Selected Genre:", genre);
  console.log("Characters:", characters);

  return (
    <div>
      <Navbar />
      <div className="character-selection-container">
        <main className="character-selection-main-content">
          <div className="character-card">
            <h2>Select a Character</h2>
            <p>Choose your favorite character for the {genre} genre</p>
            <div className="character-buttons">
              {characters.map((character: Character, index: number) => {
                // const { name, image, description } = character;
                // console.log(`Rendering character ${index}:`, { name, image, description });
                return (
                  <Card
                    key={index}
                    height="250px"
                    {...character}
                  />
                );
              })}
            </div>
            <button className="next-button">Next</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CharacterSelectionPage;
