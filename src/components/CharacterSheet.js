import React from 'react';
import { useCharacter } from '../context/CharacterContext';

const CharacterSheet = () => {
  const { character } = useCharacter();

  const calculateModifier = (attribute) => Math.floor((attribute - 10) / 2);

  return (
    <div className="character-sheet">
      <h2>{character.name || "Nome do Personagem"}</h2>
      <div className="character-info">
        <p><strong>Raça:</strong> {character.race}</p>
        <p><strong>Classe:</strong> {character.class}</p>
        <p><strong>Nível:</strong> {character.level || 1}</p>
      </div>

      <div className="attributes">
        {Object.keys(character.attributes).map((attr) => (
          <div key={attr} className="attribute">
            <p>{attr.charAt(0).toUpperCase() + attr.slice(1)}: {character.attributes[attr]}</p>
            <p>Modificador: {calculateModifier(character.attributes[attr])}</p>
          </div>
        ))}
      </div>

      <div className="hp">
        <p><strong>Pontos de Vida Máximos:</strong> {10 + calculateModifier(character.attributes.constituição)}</p>
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
  );
};

export default CharacterSheet;
    