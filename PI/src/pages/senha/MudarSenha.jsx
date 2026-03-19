import './MudarSenha.css'; 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoPreta from '../../assets/Logo-preta.png';
import { API_URL } from '../../config/api';

function MudarSenha() {
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (novaSenha !== confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/alterar-senha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        senha_atual: senhaAtual,
        nova_senha: novaSenha,
        confirmar_senha: confirmarSenha
      })
    });

    const data = await response.json();
    if (response.ok) {
      setMensagem("Senha alterada com sucesso!");
      setSenhaAtual('');
      setNovaSenha('');
      setConfirmarSenha('');
    } else {
      setMensagem(data.erro || "Erro ao alterar senha.");
    }
  };

  return (
    <>
      <Link to="/" className="logo-link">
        <img src={logoPreta} alt="logoPreta" className="logoS" />
      </Link>
      <div className="mudar-senha-container">
        <h2>Alterar Senha</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Senha Atual:
            <input
              type="password"
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
              required
            />
          </label>
          <label>
            Nova Senha:
            <input
              type="password"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              required
            />
          </label>
          <label>
            Confirmar Nova Senha:
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </label>
          <button type="submit">Alterar Senha</button>
          {mensagem && <p className="mensagem">{mensagem}</p>}
        </form>
      </div>
    </>
  );
}

export default MudarSenha;