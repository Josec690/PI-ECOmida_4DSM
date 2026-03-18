import React, { useEffect, useState } from 'react';
import './Usuario.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config/api';

function Usuario() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ nome: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // Novos estados para edição
  const [editando, setEditando] = useState({ nome: false, email: false });
  const [novoUsuario, setNovoUsuario] = useState({ nome: '', email: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch(`${API_URL}/usuario`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Falha ao obter perfil');
        return res.json();
      })
      .then(data => {
        setUsuario({
          nome: data.usuario.nome,
          email: data.usuario.email
        });
        setNovoUsuario({
          nome: data.usuario.nome,
          email: data.usuario.email
        });
      })
      .catch(err => setErro(err.message))
      .finally(() => setLoading(false));
  }, [navigate]);

  // Função para atualizar o usuário
  const handleSalvar = async (campo) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/usuario`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
        nome: novoUsuario.nome,
        email: novoUsuario.email
        })
      });
      if (!res.ok) throw new Error('Erro ao atualizar');
      setUsuario(prev => ({ ...prev, [campo]: novoUsuario[campo] }));
      setEditando(prev => ({ ...prev, [campo]: false }));
    } catch (err) {
      setErro(err.message);
    }
  };

    
  return (
    <>
      <Header />
      <div className="user-container">
        <div className="avatar">
          <span>{usuario.nome.charAt(0).toUpperCase()}</span>
        </div>
        <h2>Minha Conta</h2>
        <div className="user-info">
          <p>
            <strong>Nome:</strong>
            {editando.nome ? (
              <>
                <input
                  type="text"
                  value={novoUsuario.nome}
                  onChange={e => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
                />
                <button onClick={() => handleSalvar('nome')} disabled={loading}>Salvar</button>
                <button onClick={() => setEditando(prev => ({ ...prev, nome: false }))} disabled={loading}>Cancelar</button>
              </>
            ) : (
              <>
                {' '}{usuario.nome}
                <span
                  style={{ cursor: 'pointer', marginLeft: '8px' }}
                  title="Editar nome"
                  aria-label="Editar nome"
                  onClick={() => setEditando(prev => ({ ...prev, nome: true }))}
                >✏️</span>
              </>
            )}
          </p>
          <p>
            <strong>Email:</strong>
            {editando.email ? (
              <>
                <input
                  type="email"
                  value={novoUsuario.email}
                  onChange={e => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
                />
                <button onClick={() => handleSalvar('email')} disabled={loading}>Salvar</button>
                <button onClick={() => setEditando(prev => ({ ...prev, email: false }))} disabled={loading}>Cancelar</button>
              </>
            ) : (
              <>
                {' '}{usuario.email}
                <span
                  style={{ cursor: 'pointer', marginLeft: '8px' }}
                  title="Editar email"
                  aria-label="Editar email"
                  onClick={() => setEditando(prev => ({ ...prev, email: true }))}
                >✏️</span>
              </>
            )}
          </p>
        </div>
        <div className="alterar-senha-container">
          <button className="alterar-senha-botao" onClick={() => navigate('/MudarSenha')}>
            Alterar Senha
          </button>
          <button className="enviar-receita-botao" onClick={() => navigate('/criar-receita')}>
            Enviar uma Receita
          </button>
          
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Usuario;