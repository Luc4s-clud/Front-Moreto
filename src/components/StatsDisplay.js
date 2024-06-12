import React from 'react';
import '../styles/StatsDisplay.css';

const StatsDisplay = ({ armorClass, initiative, speed }) => {
  return (
    <div className="stats-display">
      <div className="stat-item">
        <div className="stat-label">Classe de Armadura</div>
        <div className="stat-value">{armorClass}</div>
      </div>
      <div className="stat-item">
        <div className="stat-label">Iniciativa</div>
        <div className="stat-value">{initiative}</div>
      </div>
      <div className="stat-item">
        <div className="stat-label">Deslocamento</div>
        <div className="stat-value">{speed}</div>
      </div>
    </div>
  );
};

export default StatsDisplay;
