import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { GenresData } from '../assets/genres';
import '../styles/CreateStory.css';
import Card from '../components/Card';
import CharacterSelection from '../components/Story/CharacterSelection';
import SettingSelection from '../components/Story/SettingSelection';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import SpecialRequest from '../components/Story/SpecialRequest';
import { createStory } from '../api/storyService';
import { Inputs } from '../components/types';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/Story/LoadingScreen';
import { useAuth } from '../context/AuthContext';

const CreateStoryPage: React.FC = () => {
  const { isAuthenticated, userProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null);
  const [inputs, setInputs] = useState<Inputs>({
    genre: '',
    characters: [],
    setting: '',
    wordRange: '100',
    specialMessage: '',
    ageRange: '3-5',
    title: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const totalSteps = 4;

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    setInputs((prevInputs) => ({
      ...prevInputs,
      genre: genre,
    }));
  };

  const handleCharacterSelect = (characters: string[]) => {
    setSelectedCharacters(characters);
    setInputs((prevInputs) => ({
      ...prevInputs,
      characters: characters,
    }));
  };

  const handleSettingSelect = (setting: string) => {
    setSelectedSetting(setting);
    setInputs((prevInputs) => ({
      ...prevInputs,
      setting: setting,
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
      handleGenerateStory();
    } else {
      alert('Please make a selection before proceeding.');
    }
  };

  const handleBackClick = () => {
    setStep(step - 1);
  };

  const handleGenerateStory = async () => {
    const token = localStorage.getItem('authToken');
  
    if (!token) {
      alert('Authentication token is missing.');
      return;
    }
    if (!userProfile) {
      alert('User profile is missing.');
      return;
    }

    setLoading(true);
    try {
      const generatedStory = await createStory(inputs, token, userProfile.id); // Pass user ID to createStory
      console.log('generatedStory:', generatedStory);
      setLoading(false);
      navigate('/story', { state: { story: generatedStory } });
    } catch (error) {
      console.error('Error inside create story:', error);
      setLoading(false);
      alert('Error generating story. Please try again.');
    }
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
                    selectedGenre === genre.name ? 'selected' : ''
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
            setSelectedCharacters={handleCharacterSelect}
            handleNextClick={handleNextClick}
            handleBackClick={handleBackClick}
          />
        )}
        {step === 3 && (
          <SettingSelection
            selectedSetting={selectedSetting}
            setSelectedSetting={handleSettingSelect}
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
