import React from "react";
import Card from "../Card";
import "../../styles/Characters.css";
import { CharactersData } from "../../assets/characters";

interface CharacterSelectionProps {
  selectedCharacters: string[];
  setSelectedCharacters: (characters: string[]) => void;
  handleNextClick: () => void;
  handleBackClick: () => void;
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({
  selectedCharacters,
  setSelectedCharacters,
  handleNextClick,
  handleBackClick,
}) => {
  const handleCharacterClick = (character: string) => {
    if (selectedCharacters.includes(character)) {
      setSelectedCharacters(selectedCharacters.filter((c) => c !== character));
    } else if (selectedCharacters.length < 3) {
      setSelectedCharacters([...selectedCharacters, character]);
    }
  };

  return (
    <div className="character-selection-container">
      <h2>Select Your Characters</h2>
      <h4>Choose your favorite characters</h4>
      <p>
        The story will be based on the characters that you choose. You can
        choose up to 3 characters.
      </p>
      <div className="character-buttons">
        {CharactersData.map((character, index) => (
          <div
            key={index}
            onClick={() => handleCharacterClick(character.name)}
            className={`character-card-wrapper ${
              selectedCharacters.includes(character.name) ? "selected" : ""
            }`}
          >
            <Card
              key={index}
              image={character.image}
              name={character.name}
              description={character.description}
              selected={selectedCharacters.includes(character.name)}
              onClick={() => handleCharacterClick(character.name)}
            />
          </div>
        ))}
      </div>
      <div className="buttons-wrapper">
        <button className="back-button" onClick={handleBackClick}>
          Back
        </button>
        <button className="next-button" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterSelection;
