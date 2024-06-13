import React, { useState, useEffect } from 'react';
import axios from "../axiosConfig"


const Demo = () => {
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
      console.log(response.data)
      if (response.data.type === 'success') {
        if (response.data && response.data.token) {
          localStorage.setItem('access_token', response.data.token);
          // console.log(localStorage.getItem('access_token'));
          setMessage('Você está logado');
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
      axios.get('http://localhost:3333/autenticacao/user', {
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

      <div style={{ height: 380 }}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Usuário:</label>
            <input
              type="text"
              name="username"
              value={login.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Senha:</label>
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
        {userInfo && <p>Bem-vindo, {userInfo.username}!</p>}
      </div>
  );
};

export default Demo;