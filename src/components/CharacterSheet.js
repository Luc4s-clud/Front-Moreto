import React, { useState, useEffect, useMemo }  from 'react';
import { useCharacter } from '../context/CharacterContext';

import axios from 'axios';

const CharacterSheet = ({character_id}) => {
const [character, setCharacter] = useState([]);


  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        console.log('Fetching attributes...');
        const response = await axios.get(`http://localhost:3333/characters/${character_id}`);
        console.log('Response data:', response.data);
        setCharacter(response.data);
      } catch (error) {
        console.error('Error fetching attributes:', error);
      }
    };
  
    fetchAttributes();
  }, []);

  const calculateModifier = (attribute) => Math.floor((attribute - 10) / 2);
  const allowedAttributes = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

  return (
    <div>
      {character.character ? (
        <div className="character-sheet">
          <h2>{character.character.name}</h2>
      <div className="character-info">
        <p><strong>Raça:</strong> {character.character.raca.name}</p>
        <p><strong>Classe:</strong> {character.character.class.name}</p>
        <p><strong>Nível:</strong> {character.name || 1}</p>
      </div> 
      <div className="attributes">
  {character.character && character.character.attribute ? Object.keys(character.character.attribute)
    .filter(attr => allowedAttributes.includes(attr))
    .map((attr) => (
      <div key={attr} className="attribute">
        <p>{attr.charAt(0).toUpperCase() + attr.slice(1)}: {character.character.attribute[attr]}</p>
        <p>Modificador: {calculateModifier(character.character.attribute[attr])}</p>
      </div>
    )) : null}
</div>

      <div className="hp">
        <p><strong>Pontos de Vida Máximos:</strong> {10 + calculateModifier(character.character.raca.name)}</p>
      </div>

      <div className="proficiencies">
        <p><strong>Bônus de Proficiência:</strong> +2</p>
      </div>

      <div className="equipment">
        <h3>Equipamentos</h3>
        <ul>
          <li>Escudo</li>
          <li>Cota de Malha</li>
          <li>Símbolo Sagrado</li>
          <li>Pacote de Aventureiro</li>
        </ul>
      </div>
              </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CharacterSheet;
    