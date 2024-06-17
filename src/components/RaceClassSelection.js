import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios'; 
import humanImage from '../assets/human.png';
import elfImage from '../assets/elf.png';
import dwarfImage from '../assets/dwarf.png';
import halfOrcImage from '../assets/half-orc.png';
// import gnomeImage from '../assets/gnome.png';
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
import '../styles/Button.css'; // Adicione este arquivo para estilização



const RaceClassSelection = ({ onSelectRace, onSelectClass, onComplete }) => {
  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedRaceId, setSelectedRaceId] = useState(null); // Adicione esta linha
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [characterName, setCharacterName] = useState('');
  const userId = localStorage.getItem('id');


  const [races, setRaces] = useState([]);
  const [classes, setClasses] = useState([]);

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

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const response = await axios.get('http://localhost:3333/races');
        console.log(response.data);
        const racesWithImages = response.data.data.map(race => ({
          ...race,
          image: raceImages[race.name]
        }));
        setRaces(racesWithImages);
      } catch (error) {
        console.error('Erro ao buscar raças', error);
      }
    };
  
    fetchRaces();
  }, []); 

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:3333/classes');
        const classesWithImages = response.data.data.map(classe => ({
          ...classe,
          image: classImages[classe.name]
        }));
        setClasses(classesWithImages);
      } catch (error) {
        console.error('Erro ao buscar classes', error);
      }
    };
  
    fetchClasses();
  }, []); 


  const createCharacter = async () => {
    if (characterName && selectedRaceId && selectedClassId) { // Adicione esta condição
      try {
        const response = await axios.post('http://localhost:3333/character', {
          name: characterName,
          race_id: selectedRaceId,
          class_id: selectedClassId,
          user_id: userId,
        });

        console.log(`esse aqui`, response.data.character.attribute_id);
        // console.log(userId);
        localStorage.setItem('attribute_id', response.data.character.attribute_id);
      } catch (error) {
        console.error('Erro ao criar personagem', error);
      }
    }
  };

  const handleRaceClick = (raceName, raceId) => {
    setSelectedRace(raceName);
    setSelectedRaceId(raceId); // Adicione esta linha
    onSelectRace(raceName);
  };

  const handleClassClick = (className, classId) => {
    setSelectedClass(className);
    setSelectedClassId(classId); // Adicione esta linha
    onSelectClass(className);
  };

  const handleCompleteClick = () => {
    if (selectedRaceId && selectedClassId) {
      createCharacter();
      onComplete(selectedRaceId, selectedClassId, characterName);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={characterName}
        onChange={(e) => setCharacterName(e.target.value)}
        placeholder="Nome do personagem"
      />
      <h2>Escolha a Raça</h2>
      <div className="selection-container">
        {races.map((race) => (
          <div
            key={race.name}
            className={`race-class-option ${selectedRace === race.name ? 'pressed' : ''}`}
            onClick={() => handleRaceClick(race.name, race.id)} // pass race.id as second argument
          >
            <img src={race.image} alt={race.name} className="race-class-image" />
            <div>
              <h3>{race.name}</h3>
              <p>{race.description}</p>
            </div>
          </div>
        ))}
      </div>
      <h2>Escolha a Classe</h2>
      <div className="selection-container">
        {classes.map((classe, index) => ( // include index parameter
          <div
            key={classe.name}
            className={`race-class-option ${selectedClass === classe.name ? 'pressed' : ''}`}
            onClick={() => handleClassClick(classe.name, classe.id)} // pass index + 1 as classId
          >
            <img src={classe.image} alt={classe.name} className="race-class-image" />
            <div>
              <h3>{classe.name}</h3>
              <p>{classe.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleCompleteClick}>Concluir</button>
    </div>
  );
}

export default RaceClassSelection;

