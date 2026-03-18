import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logoBranca from '../../assets/Logo-Branca.png';
import { API_URL } from '../../config/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        localStorage.setItem('token', dados.token);
        localStorage.setItem('nome', dados.usuario.nome);
        setMensagem('Login realizado com sucesso!');
        navigate('/Usuario');
      } else {
        setMensagem(dados.erro || 'Erro no login');
      }
    } catch {
      setMensagem('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className="login-page">
      <aside className="login-side-image" />

      <main className="login-content">
        <section className="login-box">
          <Link to="/" className="logo-link">
            <img src={logoBranca} alt="Logo Branca" className="logo-img" />
          </Link>

          <h1 className="login-title">Login</h1>

          <form className="login-form" onSubmit={handleLogin}>
            <label className="login-label">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                required
              />
            </label>

            <label className="login-label">
              <span>Senha</span>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                required
              />
            </label>

            <div className="login-links">
              <Link to="/EmailSenha" className="forgot-password">Esqueceu a senha?</Link>
              <Link to="/Cadastro" className="signup-link">Cadastre-se</Link>
            </div>

            <button type="submit" className="btn-login">Login</button>
            {mensagem && <p className="mensagem">{mensagem}</p>}
          </form>
        </section>
      </main>
    </div>
  );
};

export default Login;
