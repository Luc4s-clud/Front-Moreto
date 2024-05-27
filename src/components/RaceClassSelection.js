import React from 'react';
import humanImage from '../assets/human.png';
import elfImage from '../assets/elf.png';
import dwarfImage from '../assets/dwarf.png';
import halfOrcImage from '../assets/half-orc.png';
import gnomeImage from '../assets/gnome.png';
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

const RaceClassSelection = ({ onSelectRace, onSelectClass }) => {
  const races = [
    { name: "Humano", description: "Versáteis e adaptáveis", image: humanImage },
    { name: "Elfo", description: "Graciosos e longevos", image: elfImage },
    { name: "Anão", description: "Robustos e resistentes", image: dwarfImage },
    { name: "Meio-Orc", description: "Fortes e corajosos", image: halfOrcImage },
    { name: "Gnomo", description: "Inteligentes e curiosos", image: gnomeImage }
  ];

  const classes = [
    { name: "Guerreiro", description: "Mestre das armas", image: warriorImage },
    { name: "Mago", description: "Usuário de magia", image: wizardImage },
    { name: "Ladino", description: "Ágil e sorrateiro", image: rogueImage },
    { name: "Clérigo", description: "Curador e guerreiro", image: clericImage },
    { name: "Bárbaro", description: "Bruto e poderoso", image: barbarianImage },
    { name: "Bardo", description: "Mestre das artes e encantamentos", image: bardImage },
    { name: "Druida", description: "Guardião da natureza", image: druidImage },
    { name: "Monge", description: "Especialista em combate corpo a corpo", image: monkImage },
    { name: "Paladino", description: "Cavaleiro sagrado", image: paladinImage },
    { name: "Patrulheiro", description: "Especialista em combate à distância e rastreamento", image: rangerImage },
    { name: "Feiticeiro", description: "Mestre da magia inata", image: sorcererImage },
    { name: "Bruxo", description: "Conjurador de pactos", image: warlockImage },
  ];

  return (
    <div>
      <h2>Escolha a Raça</h2>
      <div className="selection-container">
        {races.map((race) => (
          <div key={race.name} className="race-class-option" onClick={() => onSelectRace(race.name)}>
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
        {classes.map((classe) => (
          <div key={classe.name} className="race-class-option" onClick={() => onSelectClass(classe.name)}>
            <img src={classe.image} alt={classe.name} className="race-class-image" />
            <div>
              <h3>{classe.name}</h3>
              <p>{classe.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RaceClassSelection;
