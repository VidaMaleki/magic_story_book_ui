import React, { useState } from "react";
import "../styles/AgeSelection.css";
import SimpleNavbar from "../components/Navbar/SimpleNavbar";
import { useNavigate } from "react-router-dom";

const AgeSelection: React.FC = () => {
  const ages = [3, 4, 5, 6, 7, 8];
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleAgeSelect = (age: number) => {
    setSelectedAge(age);
    localStorage.setItem("childAge", age.toString());
  };

  const handleContinue = () => {
    navigate('/');
  };

  return (
    <div>
      <SimpleNavbar />
      <div className="age-selection-container">
        <main className="age-main-content">
          <div className="agecard">
            <h2>Almost There!</h2>
            <p>Just tell us your child's age to tailor your experience.</p>
            <div className="age-buttons">
              {ages.map((age) => (
                <button
                  key={age}
                  onClick={() => handleAgeSelect(age)}
                  className={selectedAge === age ? "selected" : ""}
                >
                  {age} years
                </button>
              ))}
            </div>
            <button className="continue-button" onClick={handleContinue}>
              Continue
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgeSelection;
