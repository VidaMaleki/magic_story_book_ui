import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="progress-bar">
      <div className="progress-bar-inner" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;