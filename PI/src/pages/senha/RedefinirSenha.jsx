import './MudarSenha.css'; 
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoPreta from '../../assets/Logo-Preta.png';
import { API_URL } from '../../config/api';

function RedefinirSenha() {
  const [token, setToken] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    // Pega o token da URL, se existir
    const params = new URLSearchParams(location.search);
    const tokenUrl = params.get('token');
    if (tokenUrl) {
      setToken(tokenUrl);
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (novaSenha !== confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/redefinir-senha`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: token,
          nova_senha: novaSenha,
          confirmar_senha: confirmarSenha
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMensagem(data.mensagem || "Senha redefinida com sucesso!");
        setToken('');
        setNovaSenha('');
        setConfirmarSenha('');
        setTimeout(() => {
          navigate('/');
        }, 2000); // Redireciona após 2 segundos
      } else {
        setMensagem(data.erro || "Erro ao redefinir senha.");
      }
    } catch {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <>
      <Link to="/" className="logo-link">
        <img src={logoPreta} alt="logoPreta" className="logoS" />
      </Link>
      <div className="mudar-senha-container">
        <h2>Redefinir Senha</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Token recebido por e-mail:
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
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
          <button type="submit">Redefinir Senha</button>
          {mensagem && <p className="mensagem">{mensagem}</p>}
        </form>
      </div>
    </>
  );
}

export default RedefinirSenha;