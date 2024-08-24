import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index2.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    // colocar a lógica de cadastro aqui (se necessário), por enquanto vai direto para a pag do game
    navigate('/inicio');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Registrar-se</h2>
        {error && <div className="error-message">{error}</div>}
        <form className="login-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">Usuário</label>
            <input
              className={`form-input ${error ? 'error' : ''}`}
              type="text"
              placeholder='Usuário'
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              className={`form-input ${error ? 'error' : ''}`}
              type="text"
              placeholder='Email'
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Senha</label>
            <input
              className={`form-input ${error ? 'error' : ''}`}
              type="password"
              placeholder='Senha'
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Confirmar Senha</label>
            <input
              className={`form-input ${error ? 'error' : ''}`}
              type="password"
              placeholder='Confirmar Senha'
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className="login-button" type="submit">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
