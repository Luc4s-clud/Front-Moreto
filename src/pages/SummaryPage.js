import React from 'react';
import { useCharacter } from '../context/CharacterContext';
import CharacterSheet from '../components/CharacterSheet';
import '../styles/summaryPage.css';

const SummaryPage = () => {
  const { character } = useCharacter();

  return (
    <div className="container-sumary">
      <h1>Resumo do Personagem</h1>
      <CharacterSheet character={character} />
    </div>
  );
};

export default SummaryPage;
