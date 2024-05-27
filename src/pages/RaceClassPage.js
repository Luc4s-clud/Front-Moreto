import React from 'react';
import { useNavigate } from 'react-router-dom';
import RaceClassSelection from '../components/RaceClassSelection';
import '../styles/raceClassPage.css';

const RaceClassPage = () => {
  const navigate = useNavigate();

  const handleRaceSelect = (selectedRace) => {
    console.log(`Raça selecionada: ${selectedRace}`);
  };

  const handleClassSelect = (selectedClass) => {
    console.log(`Classe selecionada: ${selectedClass}`);
    navigate('/attributes');
  };

  return (
    <div className="container">
      <h1>Criação de Personagem - Escolha Raça e Classe</h1>
      <RaceClassSelection onSelectRace={handleRaceSelect} onSelectClass={handleClassSelect} />
    </div>
  );
};

export default RaceClassPage;
