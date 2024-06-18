import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import StatsDisplay from './StatsDisplay'; // Importa o novo componente
import '../styles/StatsDisplay.css'; // Importa os estilos

const AttributeSelection = ({ onComplete, attribute_id }) => {



  const initialAttributes = useMemo(() => ({
    força: 0,
    destreza: 0,
    constituição: 0,
    inteligência: 0,
    sabedoria: 0,
    carisma: 0
  }), []);

  const attributeMapping = useMemo(() => ({
    strength: 'força',
    dexterity: 'destreza',
    constitution: 'constituição',
    intelligence: 'inteligência',
    wisdom: 'sabedoria',
    charisma: 'carisma'
  }), []);

  const [attributes, setAttributes] = useState(initialAttributes);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        console.log('Fetching attributes...');
        const response = await axios.get(`http://localhost:3333/attributes/${attribute_id}`);
        console.log('Response data:', response.data);
  
        const mappedData = { ...initialAttributes };
        for (const key in response.data[0]) {
          if (key in attributeMapping) {
            mappedData[attributeMapping[key]] = response.data[0][key] || 0;
          }
        }
        console.log('Mapped data:', mappedData);
  
        setAttributes(mappedData);
      } catch (error) {
        console.error('Error fetching attributes:', error);
      }
    };
  
    fetchAttributes();
  }, [attributeMapping, initialAttributes, attribute_id]);

  const handleChange = (attr, value) => {
    setAttributes({ ...attributes, [attr]: value });
  };

  const reverseAttributeMapping = useMemo(() => {
    const mapping = {};
    for (const key in attributeMapping) {
      mapping[attributeMapping[key]] = key;
    }
    return mapping;
  }, [attributeMapping]);

  const handleBlur = async (attr) => {
    console.log('Updating attribute:', attr, 'with value:', attributes[attr]);
    try {
      await axios.put(`http://localhost:3333/attributes/${attribute_id}`, {
        [reverseAttributeMapping[attr]]: attributes[attr]
      });
    } catch (error) {
      console.error('Error updating attribute:', error);
    }
  };

  return (
    <div className="attribute-selection">
      <h2>Criação de Personagem - Atributos</h2>
      <StatsDisplay armorClass={19} initiative={''} speed={'7,5'} /> {/* Adiciona o componente StatsDisplay abaixo do título */}
      <div>
        <h3>Atributos</h3>
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
                onBlur={() => handleBlur(attr)}
              />
            </div>
          ))}
        </div>
        <button onClick={() => onComplete(attributes)}>Concluir</button>
      </div>
    </div>
  );
};

export default AttributeSelection;
