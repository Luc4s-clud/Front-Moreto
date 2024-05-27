import React, { useState } from 'react';

const AttributeSelection = ({ onComplete }) => {
  const [attributes, setAttributes] = useState({
    força: 8,
    destreza: 8,
    constituição: 8,
    inteligência: 8,
    sabedoria: 8,
    carisma: 8
  });

  const handleChange = (attr, value) => {
    setAttributes({ ...attributes, [attr]: value });
  };

  return (
    <div>
      <h2>Atributos</h2>
      <div className="attributes-container">
        {Object.keys(attributes).map((attr) => (
          <div key={attr} className="attribute-input">
            <label>{attr.charAt(0).toUpperCase() + attr.slice(1)}</label>
            <input
              type="number"
              value={attributes[attr]}
              min="1"
              max="20"
              onChange={(e) => handleChange(attr, parseInt(e.target.value, 10))}
            />
          </div>
        ))}
      </div>
      <button onClick={() => onComplete(attributes)}>Concluir</button>
    </div>
  );
};

export default AttributeSelection;
