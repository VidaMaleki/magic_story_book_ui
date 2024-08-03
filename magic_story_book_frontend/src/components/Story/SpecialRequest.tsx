import React, { ChangeEvent } from "react";
import "../../styles/SpecialRequest.css";
import { Inputs } from "../types";

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
    e: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
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
        <div className="dropdown-container">
          <label htmlFor="word-count">Word Count:</label>
          <select
            id="word-count"
            name="wordCount"
            value={inputs.wordCount}
            onChange={handleInputChange}
          >
            <option value="100">100 words</option>
            <option value="200">200 words</option>
            <option value="300">300 words</option>
            <option value="400">400 words</option>
            <option value="500">500 words</option>
          </select>
        </div>
      </div>
      <p>
        Your description will be used to guide the story which ever way you
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