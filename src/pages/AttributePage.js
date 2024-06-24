import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCharacter } from '../context/CharacterContext';
import AttributeSelection from '../components/AttributeSelection';
import '../styles/attributePage.css';

const AttributePage = () => {
  const { character, setCharacter } = useCharacter();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const attribute_id = params.get('attribute_id');


  const handleAttributesComplete = (attributes) => {
    setCharacter({ ...character, attributes });
    navigate('/character');
  };

  return (
    <div className="containerr">
      <h1>Criação de Personagem - Atributos</h1>
      <AttributeSelection attribute_id={attribute_id} onComplete={handleAttributesComplete} />
    </div>
  );
};

export default AttributePage;
