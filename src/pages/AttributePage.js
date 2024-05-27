import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCharacter } from '../context/CharacterContext';
import AttributeSelection from '../components/AttributeSelection';

const AttributePage = () => {
  const { character, setCharacter } = useCharacter();
  const navigate = useNavigate();

  const handleAttributesComplete = (attributes) => {
    setCharacter({ ...character, attributes });
    navigate('/summary');
  };

  return (
    <div className="container">
      <h1>Criação de Personagem - Atributos</h1>
      <AttributeSelection onComplete={handleAttributesComplete} />
    </div>
  );
};

export default AttributePage;
