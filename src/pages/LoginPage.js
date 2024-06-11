import React, { useState } from 'react';
    import axios from "../axiosConfig"

    const Demo = () => {
      const [login, setLogin] = useState({ username: '', password: '' });
      const [message, setMessage] = useState('');

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('/autenticacao/login', login);
          if (response.data.type === 'sucess') {
            console.log(response.data)
            if (response.data && response.data.token) {
              localStorage.setItem('access-token', response.data.token);
              setMessage('Você está logado');
            }
          } else {
            setMessage(response.data.message);
          }
        } catch (error) {
          
          setMessage(`Ocorreu um erro ao realizar o login!`);
        }
      };

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
        </div>
      );
    };

    export default Demo;