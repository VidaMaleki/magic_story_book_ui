import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { GenresData } from "../assets/genres";
import "../styles/CreateStory.css";
import Card from "../components/Card";
import CharacterSelection from "../components/Story/CharacterSelection";
import SettingSelection from "../components/Story/SettingSelection";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import SpecialRequest from "../components/Story/SpecialRequest";
import { generateStory } from "../api/openaiClient";
import { Inputs } from "../components/types";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/Story/LoadingScreen";

const CreateStoryPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);
  const [inputs, setInputs] = useState<Inputs>({
    genre: "",
    characters: [],
    setting: "",
    wordCount: "",
    specialMessage: "",
    age: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  // const [story, setStory] = useState<string>("");
  const navigate = useNavigate();
  const totalSteps = 4;

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    setInputs((prevInputs) => ({
      ...prevInputs,
      genre: genre,
    }));
  };

  const handleNextClick = () => {
    if (step === 1 && selectedGenre) {
      setStep(2);
    } else if (step === 2 && selectedCharacters.length > 0) {
      setStep(3);
    } else if (step === 3 && selectedSetting) {
      setStep(4);
    } else if (step === 4) {
      // Handle final step, saving the story to the database
    } else {
      alert("Please make a selection before proceeding.");
    }
  };

  const handleBackClick = () => {
    setStep(step - 1);
  };

  const handleGenerateStory = async () => {
    setLoading(true);
    const generatedStory = await generateStory(inputs);
    setLoading(false);
    navigate("/story", { state: { story: generatedStory } });
  };

  return (
    <div className="create-story-container">
      <Navbar />
      <main className="create-story-main-content">
        <ProgressBar step={step} totalSteps={totalSteps} />
        {step === 1 && (
          <div className="genre-card">
            <h2>Create a Story</h2>
            <p>Select a Genre</p>
            <div className="genre-buttons">
              {GenresData.map((genre, i) => (
                <div
                  key={genre.name}
                  onClick={() => handleGenreSelect(genre.name)}
                  className={`genre-card-wrapper ${
                    selectedGenre === genre.name ? "selected" : ""
                  }`}
                >
                  <Card
                    key={i}
                    image={genre.image}
                    name={genre.name}
                    description={genre.description}
                    selected={selectedGenre === genre.name}
                    onClick={() => handleGenreSelect(genre.name)}
                  />
                </div>
              ))}
            </div>
            <button className="next-button" onClick={handleNextClick}>
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <CharacterSelection
            selectedCharacters={selectedCharacters}
            setSelectedCharacters={setSelectedCharacters}
            handleNextClick={handleNextClick}
            handleBackClick={handleBackClick}
          />
        )}
        {step === 3 && (
          <SettingSelection
            selectedSetting={selectedSetting}
            setSelectedSetting={setSelectedSetting}
            handleNextClick={handleNextClick}
            handleBackClick={handleBackClick}
          />
        )}
        {step === 4 && (
          <SpecialRequest
            setInputs={setInputs}
            inputs={inputs}
            handleGenerateStory={handleGenerateStory}
            handleBackClick={handleBackClick}
          />
        )}
        {loading && <LoadingScreen />}
      </main>
    </div>
  );
};

export default CreateStoryPage;