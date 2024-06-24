import React, { useState, useEffect } from 'react';
import axios from "../axiosConfig";
import '../styles/charactersPage.css'
import { useNavigate } from 'react-router-dom';
import {FaRegEye, FaPlus, FaTrash, FaRegEdit} from 'react-icons/fa'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

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

const handleDeleteClick = (characterId) => {
  alert(characterId)
  confirmAlert({
    title: 'Excluir',
    message: 'Você tem certeza que deseja deletar este personagem?',
    buttons: [
      {
        label: 'Sim',
        onClick: () => deleteCharacter(characterId)
      },
      {
        label: 'Não',
        onClick: () => {}
      }
    ]
  });
};

const deleteCharacter = async (character) => {
  try {
    const characterId = character.id
    const response = await axios.delete(`/characters/${characterId}`, {
      headers: {
        'Authorization': `${token}`
      }
    });
    if (response.status === 200) {
      setCharacters(characters.filter(character => character.id !== characterId));
      setMessage('Personagem deletado com sucesso');
    } else {
      setMessage(response.data.error || 'Erro ao deletar personagem');
    }
  } catch (error) {
    console.error('Erro ao deletar personagem', error);
    setMessage('Erro ao deletar personagem');
  }
};

return (
  <div>
    <h1>Personagens</h1>
    {message && <p>{message}</p>}
    <ul className="characters-list">
      {characters.map(character => (
        <li key={character.id} className="character-item">
          <div className="character-info">
            <span className="character-name">{character.name}</span>
            <div className="character-icons">
              <FaRegEdit className="icon" onClick={() => handleAttributeClick(character)} />
              <FaRegEye className="icon" onClick={() => handleVisualizarClick(character)} />
              <FaTrash className="icon" onClick={() => handleDeleteClick(character.id)} />
            </div>
          </div>
        </li>
      ))}
    </ul>
    <button onClick={handleCreateCharacter}><FaPlus /> Novo Personagem</button>
  </div>
);
};

export default CharactersPage;