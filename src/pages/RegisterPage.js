import React, { useState } from 'react';
import axios from "../axiosConfig";
import '../styles/register.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [register, setRegister] = useState({ username: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (register.password !== register.confirmPassword) {
      setMessage('As senhas não coincidem!');
      return;
    }

    try {
      const response = await axios.post('/autenticacao/register', {
        username: register.username,
        password: register.password
      });
      if (response.data.type === 'success') {
        setMessage('Registro realizado com sucesso! Realize o login.');
        navigate('/login');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('Ocorreu um erro ao registrar!');
    }
  };

  return (
    <div style={{ height: 420, width: 300 }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário</label>
          <input
            type="text"
            name="username"
            value={register.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            name="password"
            value={register.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Confirmar Senha</label>
          <input
            type="password"
            name="confirmPassword"
            value={register.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Registrar</button>
      </form>

      {message && <p>{message}</p>}

      <div className="login-text">
        <span>Já tem uma conta? <a href="/login">Login</a></span>
      </div>
    </div>
  );
};

export default RegisterPage;