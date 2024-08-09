import { ChangeEvent } from "react";
import { Inputs } from "../types";
import "../../styles/SpecialRequest.css";
interface SpecialRequestProps {
  setInputs: React.Dispatch<React.SetStateAction<Inputs>>;
  inputs: Inputs;
  handleGenerateStory: () => void;
  handleBackClick: () => void;
}

const SpecialRequest: React.FC<SpecialRequestProps> = ({
  setInputs,
  inputs,
  handleGenerateStory,
  handleBackClick,
}) => {
  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prevInputs: Inputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  return (
    <div className="special-request-card">
      <div className="title-row">
        <h2>Any Special Request?</h2>
        <div className="dropdowns-wrapper">
          <div className="dropdown-container">
            <label htmlFor="word-count">Word Count:</label>
            <select
              id="word-count"
              name="wordRange"
              value={inputs.wordRange}
              onChange={handleInputChange}
            >
              <option value="100">100 words</option>
              <option value="200">200 words</option>
              <option value="300">300 words</option>
              <option value="400">400 words</option>
              <option value="500">500 words</option>
            </select>
          </div>
          <div className="dropdown-container">
            <label htmlFor="age-selection">Child's Age Range:</label>
            <select
              id="age-selection"
              name="ageRange"
              value={inputs.ageRange}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select age range
              </option>
              <option value="3-5">3-5 years</option>
              <option value="5-7">5-7 years</option>
              <option value="7-9">7-9 years</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="story-title">Story Title:</label>
            <input
              id="story-title"
              name="title"
              type="text"
              value={inputs.title}
              onChange={handleInputChange}
              placeholder="Enter story title"
            />
          </div>
        </div>
      </div>
      <p>
        Your description will be used to guide the story whichever way you
        please.
      </p>
      <div className="special-request-content">
        <textarea
          name="specialMessage"
          placeholder="e.g., A brave hero with a heart of gold..."
          value={inputs.specialMessage}
          onChange={handleInputChange}
        />
      </div>
      <div className="buttons">
        <button className="back-button" onClick={handleBackClick}>
          Back
        </button>
        <button className="next-button" onClick={handleGenerateStory}>
          Start Reading
        </button>
      </div>
    </div>
  );
};

export default SpecialRequest;
