import React from 'react';

const ClassSelection = ({ onSelect }) => {
  const classes = ["Guerreiro", "Mago", "Ladino", "Clérigo", "Bárbaro"];

  return (
    <div>
      <h2>Escolha a Classe</h2>
      {classes.map((classe) => (
        <button key={classe} onClick={() => onSelect(classe)}>
          {classe}
        </button>
      ))}
    </div>
  );
};

export default ClassSelection;
