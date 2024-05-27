import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCharacter } from '../context/CharacterContext';
import RaceClassSelection from '../components/RaceClassSelection';

const RaceClassPage = () => {
  const { character, setCharacter } = useCharacter();
  const navigate = useNavigate();

  const handleRaceSelect = (race) => {
    setCharacter({ ...character, race });
  };

  const handleClassSelect = (classe) => {
    setCharacter({ ...character, class: classe });
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
