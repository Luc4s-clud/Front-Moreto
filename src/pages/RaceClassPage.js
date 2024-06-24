import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RaceClassSelection from '../components/RaceClassSelection';
import '../styles/raceClassPage.css';

const RaceClassPage = () => {
  const [characterName, setCharacterName] = useState('');
  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setCharacterName(event.target.value);
  };

  const handleRaceSelect = (selectedRace) => {
    setSelectedRace(selectedRace);
  };

  const handleClassSelect = (selectedClass) => {
    setSelectedClass(selectedClass);
  };

  const handleComplete = () => {


    if (!selectedRace) {
      alert('Por favor, selecione uma raça.');
      return;
    }

    if (!selectedClass) {
      alert('Por favor, selecione uma classe.');
      return;
    }

    navigate('/');
  };

  return (
    <div className="container">
      <h1>Criação de Personagem - Escolha Raça e Classe</h1>
      <div className="input-container">
      </div>
      <RaceClassSelection
        onSelectRace={handleRaceSelect}
        onSelectClass={handleClassSelect}
        onComplete={handleComplete}
      />
    </div>
  );
};

export default RaceClassPage;
