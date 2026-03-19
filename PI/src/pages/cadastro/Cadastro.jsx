import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cadastro.css';
import logoBranca from '../../assets/Logo-branca.png';
import { API_URL } from '../../config/api';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmar: ''
  });
  const navigate = useNavigate();

  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch(`${API_URL}/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setFormData({ nome: '', email: '', senha: '', confirmar: '' });
        setMensagem('✅ Cadastro realizado com sucesso!');
        navigate('/Login');
      } else {
        setMensagem(`❌ ${dados.erro}`);
      }
    } catch (erro) {
      setMensagem('❌ Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-side-image"></div>

      <div className="cadastro-content">
        <div className="cadastro-box">

          <div className="logo-link">
            <Link to="/">
              <img src={logoBranca} alt="Logo Branca" className="logo-img" />
            </Link>
          </div>

          <h1 className="cadastro-title">Cadastre-se</h1>

          <form className="cadastro-form" onSubmit={handleSubmit}>
            <label className="cadastro-label">
              <span>Nome</span>
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Digite seu nome" required />
            </label>

            <label className="cadastro-label">
              <span>Email</span>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Digite seu email" required />
            </label>

            <label className="cadastro-label">
              <span>Senha</span>
              <input type="password" name="senha" value={formData.senha} onChange={handleChange} placeholder="Digite sua senha" required />
            </label>

            <label className="cadastro-label">
              <span>Confirme sua senha</span>
              <input type="password" name="confirmar" value={formData.confirmar} onChange={handleChange} placeholder="Repita sua senha" required />
            </label>

            <button type="submit" className="cadastro-btn">Cadastrar</button>
          </form>

          {mensagem && <p className="mensagem-feedback">{mensagem}</p>}

          <div className="cadastro-login-link">
            <Link to="/Login">Já possui conta?</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cadastro;
