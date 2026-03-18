import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import '../sobremesas/Bolo.css';
import { API_URL, API_STATIC_URL } from '../../config/api';

function Receita() {
  const { id } = useParams();
  const [receita, setReceita] = useState(null);
  const [erro, setErro] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const navigate = useNavigate();

  const [minhaNota, setMinhaNota] = useState(0);
  const [avaliando, setAvaliando] = useState(false);

  useEffect(() => {
    // Busca receita
    fetch(`${API_URL}/receitas/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.receita) {
          setReceita(data.receita);
        } else {
          setErro(data.erro || 'Receita não encontrada');
        }
      })
      .catch(() => setErro('Erro ao buscar receita'));

    // Busca usuário logado (opcional: ajuste conforme seu sistema de autenticação)
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${API_URL}/usuario`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.usuario) setUsuarioId(data.usuario.id);
        });
    }
  }, [id]);

  if (erro) return <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>{erro}</div>;
  if (!receita) return <div style={{ textAlign: 'center', marginTop: 40 }}>Carregando...</div>;

  const enviarAvaliacao = async (nota) => {
    setAvaliando(true);
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/receitas/${id}/avaliar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ nota })
    });
    setAvaliando(false);
    if (res.ok) {
      setMinhaNota(nota);
      // Atualize a receita para mostrar a nova média
      window.location.reload();
    }
  };

  const imagemUrl = receita.imagem
    ? (receita.imagem.startsWith('http') ? receita.imagem : `${API_STATIC_URL}${receita.imagem}`)
    : null;

  // Função para deletar receita
  const handleExcluir = async () => {
    if (!window.confirm('Tem certeza que deseja excluir esta receita?')) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/receitas/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        alert('Receita excluída com sucesso!');
        navigate('/Receitas');
      } else {
        alert(data.erro || 'Erro ao excluir receita');
      }
    } catch {
      alert('Erro ao conectar com o servidor');
    }
  };

  // Função para editar receita (redireciona para tela de edição)
  const handleEditar = () => {
    navigate(`/criar-receita/${id}`);
  };

  return (
    <>
      <Header />
      <div className="pagina-receita">
        <header className="receita-header">
          <h1>{receita.titulo}</h1>
        </header>

        <div style={{margin: '12px 0'}}>
          <span>Avalie esta receita: </span>
          {Array.from({length: 5}).map((_, i) => (
            <span
              key={i}
              style={{
                color: i < (minhaNota || receita.media_avaliacao || 0) ? '#FFD700' : '#ccc',
                fontSize: 24,
                cursor: 'pointer'
              }}
              onClick={() => enviarAvaliacao(i+1)}
              title={`Dar nota ${i+1}`}
            >★</span>
          ))}
          {avaliando && <span> Enviando...</span>}
          <span style={{fontSize:12, marginLeft:8}}>
            Média: {receita.media_avaliacao || 0} ({receita.total_avaliacoes || 0} avaliações)
          </span>
        </div>

        <div className="imagem-e-info-container">
          {imagemUrl && (
            <img
              src={imagemUrl}
              alt={receita.titulo}
              className="receita-imagem"
            />
          )}
          <div className="receita-info">
            <div className="info-item"><p>{receita.tempo_preparo || '-'} min</p></div>
            <div className="info-item"><p>{receita.dificuldade || '-'}</p></div>
            <div className="info-item"><p>{receita.porcoes || '-'} porções</p></div>
          </div>
        </div>

        {/* Botões de editar/excluir apenas para o autor */}
        {usuarioId && receita.autor_id === usuarioId && (
          <div style={{ display: 'flex', gap: 8, margin: '12px 0' }}>
            <button onClick={handleEditar}
              style={{background: '#1976d2', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, fontSize: 16, cursor: 'pointer',display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
              title="Editar"> ✏️ </button>
            <button onClick={handleExcluir}
              style={{background: '#e53935', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',padding: 0 }}
              title="Excluir"> 🗑️ </button>
          </div>
        )}

        <section className="ingredientes">
          <h2>Ingredientes</h2>
          <ul>
            {(receita.ingredientes || []).map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </section>

        <section className="preparo">
          <h2>Modo de Preparo</h2>
          <ol>
            {(receita.modo_preparo || []).map((passo, i) => (
              <li key={i}>{passo}</li>
            ))}
          </ol>
        </section>

        {receita.descricao && (
          <section className="dicas">
            <h3>Descrição</h3>
            <p>{receita.descricao}</p>
          </section>
        )}
      </div>
    </>
  );
}

export default Receita;