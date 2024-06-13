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
    console.log(`Raça selecionada: ${selectedRace}`);
    setSelectedRace(selectedRace);
  };

  const handleClassSelect = (selectedClass) => {
    console.log(`Classe selecionada: ${selectedClass}`);
    setSelectedClass(selectedClass);
  };

  const handleComplete = () => {
    // if (characterName.trim() === '') {
    //   alert('Por favor, insira um nome para o personagem.');
    //   return;
    // }

    if (!selectedRace) {
      alert('Por favor, selecione uma raça.');
      return;
    }

    if (!selectedClass) {
      alert('Por favor, selecione uma classe.');
      return;
    }

    // Se todas as condições forem satisfeitas, navegue para a próxima página
    navigate('/attributes');
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
