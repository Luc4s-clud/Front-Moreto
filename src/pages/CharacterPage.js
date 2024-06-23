import React, { useState, useEffect } from 'react';
import axios from "../axiosConfig";
import '../styles/charactersPage.css'
import { useNavigate } from 'react-router-dom';
import {FaRegEye, FaPlus} from 'react-icons/fa'

const CharactersPage = () => {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (token) {
      axios.get('/autenticacao/user', {
        headers: {
          'Authorization': `${token}`
        }
      })
      .then(response => {
        const username = response.data.data.username;
        console.log("username:", username)
        pegarCharacters(username);
      })
      .catch(error => {
        console.error('Erro ao obter informações do usuário', error);
        setMessage('Erro ao obter informações do usuário');
      });
    } else {
      setMessage('Token de acesso não encontrado');
    }
  }, [token]);

  const pegarCharacters = async (username) => {
    try {
      const response = await axios.post('/characters/user', { username });
      if (response.status === 200) {
        setCharacters(response.data.characters);
        console.log('characters:', response);
      } else {
        setMessage(response.data.error || 'Erro ao obter personagens');
      }
    } catch (error) {
      console.error('Erro ao obter personagens', error);
      setMessage('Erro ao obter personagens');
    }
  };

  const handleCreateCharacter = () => {
    navigate('/raceclass');
  };

  const handleAttributeClick = (character) => {
    navigate(`/attributes?attribute_id=${character.attribute_id}`);
  };

  const handleVisualizarClick = (character) => {
    navigate(`/summary?character_id=${character.id}`);
  };

  return (
    <div>
      <h1>Personagens</h1>
      {message && <p>{message}</p>}
      <ul>
        {characters.map(character => (
          <li key={character.id}>
            {character.name}
            <button onClick={() => handleAttributeClick(character)}><FaRegEye /></button>
            <button onClick={() => handleVisualizarClick(character)}>Visualizar </button>
          </li>
        ))}
      </ul>
      <button onClick={handleCreateCharacter}><FaPlus />Criar Novo Personagem</button>
    </div>
  );
};

export default CharactersPage;