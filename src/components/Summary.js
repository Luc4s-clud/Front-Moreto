import React from 'react';

const Summary = ({ character }) => {
  return (
    <div>
      <h2>Resumo do Personagem</h2>
      <p>Raça: {character.race}</p>
      <p>Classe: {character.class}</p>
      <h3>Atributos</h3>
      {Object.entries(character.attributes).map(([attr, value]) => (
        <p key={attr}>
          {attr.charAt(0).toUpperCase() + attr.slice(1)}: {value}
        </p>
      ))}
    </div>
  );
};

export default Summary;
