import React, { useState, useEffect } from 'react';
import axios from "../axiosConfig"
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';


const Demo = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo] = useState({id: '', username: ''});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/autenticacao/login', login);

      if (response.data.type === 'success') {
        if (response.data && response.data.token) {
          localStorage.setItem('access_token', response.data.token);
          setMessage('Você está logado');
          navigate('/character')

        }
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(`Ocorreu um erro ao realizar o login!`);
    }
  };

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (token) {
      axios.get('/autenticacao/user', {
        headers: {
          'Authorization': `${token}`
        }
      })
      .then(response => {
        localStorage.setItem('id', response.data.data.id);
        localStorage.setItem('name', response.data.data.username);
        setUserInfo(response.data.data);
      })
      .catch(error => {
        console.error('Erro ao obter informações do usuário', error);
      });
    } else {
      console.error('Token de acesso não encontrado no localStorage');
    }
  }, [token]);

  return (

      <div style={{ height: 380, width: 300 }}>
        <form onSubmit={handleSubmit}>
          <div container>
            <label>Usuário</label>
            <input
              type="text"
              name="username"
              value={login.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Senha</label>
            <input
              type="password"
              name="password"
              value={login.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>

        {message && <p>{message}</p>}

        <div className="register-text">
          <span>Não tem uma conta? <a href="/register">Registre-se</a></span>
        </div>
      </div>
  );
};

export default Demo;