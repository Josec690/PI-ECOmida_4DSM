import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoPreta from '../../assets/Logo-preta.png';
import './EmailSenha.css';
import { API_URL } from '../../config/api';

function EmailSenha() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/esqueci-senha`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.mensagem || 'Um link de redefinição foi enviado para seu e-mail.');
      } else {
        setMessage(data.erro || 'Erro ao enviar o e-mail.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="page">
      <div className="logo-container">
        <Link to="/">
          <img src={logoPreta} alt="Logo Preta" className="logoE" />
        </Link>
      </div>

      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <h2>Esqueci minha senha</h2>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="button">
            Enviar link de redefinição
          </button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default EmailSenha;