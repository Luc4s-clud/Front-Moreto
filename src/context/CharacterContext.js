import React, { createContext, useContext, useState } from 'react';

const CharacterContext = createContext();

export const useCharacter = () => useContext(CharacterContext);

export const CharacterProvider = ({ children }) => {
  const [character, setCharacter] = useState({
    race: '',
    class: '',
    attributes: {}
  });

  const value = { character, setCharacter };

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  );
};
