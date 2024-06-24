import React, { useState, useEffect, useMemo }  from 'react';
import humanImage from '../assets/human.png';
import elfImage from '../assets/elf.png';
import dwarfImage from '../assets/dwarf.png';
import halfOrcImage from '../assets/half-orc.png';
import warriorImage from '../assets/warrior.png';
import wizardImage from '../assets/wizard.png';
import rogueImage from '../assets/rogue.png';
import clericImage from '../assets/cleric.png';
import barbarianImage from '../assets/barbarian.png';
import bardImage from '../assets/bard.png';
import druidImage from '../assets/druid.png';
import monkImage from '../assets/monk.png';
import paladinImage from '../assets/paladin.png';
import rangerImage from '../assets/ranger.png';
import sorcererImage from '../assets/sorcerer.png';
import warlockImage from '../assets/warlock.png';
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


  const raceImages = {
    "Anão": dwarfImage,
    "Elfo": elfImage,
    "Halfling": warlockImage,
    "Humano": humanImage,
    "Meio-Elfo": warlockImage,
    "Meio-Orc": halfOrcImage,
    "Tiefling": warlockImage
  };

  const classImages = {
    'Bárbaro': barbarianImage,
    'Bardo': bardImage,
    'Clérigo': clericImage,
    'Druida': druidImage,
    'Guerreiro': warriorImage,
    'Ladino': rogueImage,
    'Mago': wizardImage,
    'Monge': monkImage,
    'Paladino': paladinImage,
    'Patrulheiro': rangerImage,
    'Feiticeiro': sorcererImage,
    'Bruxo': warlockImage,
  };


  const calculateModifier = (attribute) => Math.floor((attribute - 10) / 2);
  const allowedAttributes = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

  return (
    <div>
      {character.character ? (
        <div className="character-sheet">
          <h2>{character.character.name}</h2>
          <div className="character-content">
            <div className="character-info">
              <p>
                <strong>Raça:</strong> {character.character.raca.name}
                <img
                  src={raceImages[character.character.raca.name]}
                  alt={character.character.raca.name}
                  className="character-image"
                />
              </p>
              <p>
                <strong>Classe:</strong> {character.character.class.name}
                <img
                  src={classImages[character.character.class.name]}
                  alt={character.character.class.name}
                  className="character-image"
                />
              </p>
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
    