import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RaceClassSelection from '../components/RaceClassSelection';
import '../styles/raceClassPage.css';

const RaceClassPage = () => {
  const [characterName, setCharacterName] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setCharacterName(event.target.value);
  };

  const handleRaceSelect = (selectedRace) => {
    console.log(`Raça selecionada: ${selectedRace}`);
  };

  const handleClassSelect = (selectedClass) => {
    console.log(`Classe selecionada: ${selectedClass}`);
    navigate('/attributes');
  };

  const handleComplete = () => {
    if (characterName.trim() === '') {
      alert('Por favor, insira um nome para o personagem.');
      return;
    }
    // Adicione qualquer lógica adicional necessária antes de navegar
    
  };

  return (
    <div className="container">
      <h1>Criação de Personagem - Escolha Raça e Classe</h1>
      <div className="input-container">
        <label htmlFor="characterName">Nome do Personagem:
        <div></div>
        </label>
        <input
          type="text"
          id="characterName"
          value={characterName}
          onChange={handleNameChange}
        />
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
