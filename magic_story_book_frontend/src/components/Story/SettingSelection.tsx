import React from "react";
import { SettingsData } from "../../assets/settings";
import Card from "../Card";
import "../../styles/Settings.css";


interface SettingSelectionProps {
  selectedSetting: string | null;
  setSelectedSetting: (setting: string) => void;
  handleNextClick: () => void;
  handleBackClick: () => void;
}

const SettingSelection: React.FC<SettingSelectionProps> = ({
  selectedSetting,
  setSelectedSetting,
  handleNextClick,
  handleBackClick,
}) => {

  const handleSettingSelect = (setting: string) => {
    setSelectedSetting(setting);
  };

  return (
    <div className="setting-selection-container">
      <h2>Select a Setting</h2>
      <p>The setting defines the physical backdrop for your story.</p>
      <div className="setting-buttons">
        {SettingsData.map((setting, index) => (
          <div
            key={index}
            onClick={() => handleSettingSelect(setting.name)}
            className={`setting-card-wrapper ${selectedSetting === setting.name ? "selected" : ""}`}
          >
            <Card
              key={index}
              image={setting.image}
              name={setting.name}
              description={setting.description}
              selected={selectedSetting === setting.name}
              onClick={() => handleSettingSelect(setting.name)}
            />
          </div>
        ))}
      </div>
      <div className="buttons-wrapper">
      <button className="back-button" onClick={handleBackClick}>Back</button>
      <button className="next-button" onClick={handleNextClick}>Next</button>
      </div>
      
    </div>
  );
};

export default SettingSelection;
