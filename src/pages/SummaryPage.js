import React from 'react';
import { useCharacter } from '../context/CharacterContext';
import { useLocation } from 'react-router-dom';
import CharacterSheet from '../components/CharacterSheet';
import '../styles/summaryPage.css';

const SummaryPage = () => {
  const { character } = useCharacter();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const character_id = params.get('character_id');

  return (
    <div className="container-sumary">
      <h1>Resumo do Personagem</h1>
      <CharacterSheet character_id={character_id} character={character} />
    </div>
  );
};

export default SummaryPage;
