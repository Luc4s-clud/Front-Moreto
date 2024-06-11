import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttributeSelection = ({ onComplete }) => {
  const initialAttributes = {
    força: 0,
    destreza: 0,
    constituição: 0,
    inteligência: 0,
    sabedoria: 0,
    carisma: 0
  };

  const [attributes, setAttributes] = useState(initialAttributes);

  const attributeMapping = {
    strength: 'força',
    dexterity: 'destreza',
    constitution: 'constituição',
    intelligence: 'inteligência',
    wisdom: 'sabedoria',
    charisma: 'carisma'
  };

  useEffect(() => {
    const fetchAttributes = async () => {
      const response = await axios.get('http://localhost:3333/attributes/1');
      console.log('Response data:', response.data);
  
      const mappedData = { ...initialAttributes };
      for (const key in response.data[0]) { 
        if (key in attributeMapping) {
          mappedData[attributeMapping[key]] = response.data[0][key] || 0;
        }
      }
      console.log('Mapped data:', mappedData);
  
      setAttributes(mappedData);
    };
  
    fetchAttributes();
  }, []);

  const handleChange = (attr, value) => {
    setAttributes({ ...attributes, [attr]: value });
  };

  const reverseAttributeMapping = {};
for (const key in attributeMapping) {
  reverseAttributeMapping[attributeMapping[key]] = key;
}

const handleBlur = async (attr) => {
  // Log the data that is being sent in the PUT request
  console.log('Updating attribute:', attr, 'with value:', attributes[attr]);

  // Update the data on the server when the input loses focus
  await axios.put(`http://localhost:3333/attributes/1`, {
    [reverseAttributeMapping[attr]]: attributes[attr]
  });
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
              onBlur={() => handleBlur(attr)} // Add the onBlur event handler
            />
          </div>
        ))}
      </div>
      <button onClick={() => onComplete(attributes)}>Concluir</button>
    </div>
  );
};

export default AttributeSelection; // Move this line outside of the function