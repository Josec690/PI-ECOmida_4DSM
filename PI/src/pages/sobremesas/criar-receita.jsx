import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import './criar-receita.css';
import { API_URL } from '../../config/api';

function CriarReceita() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados do formulário
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [ingredientes, setIngredientes] = useState(['']);
  const [modoPreparo, setModoPreparo] = useState(['']);
  const [categoria, setCategoria] = useState('');
  const [tempoPreparo, setTempoPreparo] = useState('');
  const [porcoes, setPorcoes] = useState('');
  const [dificuldade, setDificuldade] = useState('média');
  const [imagem, setImagem] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  // Carregar dados da receita para edição
  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/receitas/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.receita) {
            setTitulo(data.receita.titulo || '');
            setDescricao(data.receita.descricao || '');
            setIngredientes(data.receita.ingredientes && data.receita.ingredientes.length > 0 ? data.receita.ingredientes : ['']);
            setModoPreparo(data.receita.modo_preparo && data.receita.modo_preparo.length > 0 ? data.receita.modo_preparo : ['']);
            setCategoria(data.receita.categoria || '');
            setTempoPreparo(data.receita.tempo_preparo || '');
            setPorcoes(data.receita.porcoes || '');
            setDificuldade(data.receita.dificuldade || 'média');
            // Não preenche imagem (por segurança, só troca se o usuário enviar nova)
          } else {
            setErro('Receita não encontrada');
          }
        })
        .catch(() => setErro('Erro ao buscar receita para edição'));
    }
  }, [id]);

  // Manipuladores para listas dinâmicas
  const handleIngredienteChange = (i, value) => {
    const novos = [...ingredientes];
    novos[i] = value;
    setIngredientes(novos);
  };
  const handleAddIngrediente = () => setIngredientes([...ingredientes, '']);
  const handleRemoveIngrediente = (i) => {
    const novos = ingredientes.filter((_, idx) => idx !== i);
    setIngredientes(novos.length ? novos : ['']);
  };

  const handleModoPreparoChange = (i, value) => {
    const novos = [...modoPreparo];
    novos[i] = value;
    setModoPreparo(novos);
  };
  const handleAddModoPreparo = () => setModoPreparo([...modoPreparo, '']);
  const handleRemoveModoPreparo = (i) => {
    const novos = modoPreparo.filter((_, idx) => idx !== i);
    setModoPreparo(novos.length ? novos : ['']);
  };

  // Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    setErro('');
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('descricao', descricao);
      ingredientes.filter(i => i.trim() !== '').forEach(i => formData.append('ingredientes', i));
      modoPreparo.filter(p => p.trim() !== '').forEach(p => formData.append('modo_preparo', p));
      formData.append('categoria', categoria);
      formData.append('tempo_preparo', tempoPreparo);
      formData.append('porcoes', porcoes);
      formData.append('dificuldade', dificuldade);
      if (imagem) formData.append('imagem', imagem);

      const url = id
        ? `${API_URL}/receitas/${id}`
        : `${API_URL}/receitas`;

      const resposta = await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
      const dados = await resposta.json();
      if (resposta.ok) {
        setMensagem(id ? 'Receita editada com sucesso!' : 'Receita enviada com sucesso!');
        setTimeout(() => navigate('/Receitas'), 1500);
      } else {
        setErro(dados.erro || 'Erro ao enviar receita');
      }
    } catch {
      setErro('Erro ao conectar com o servidor');
    }
  };

  return (
    <>
      <Header />
      <div className="pagina-receita">
        <header className="receita-header">
          <h1>{id ? 'Editar Receita' : 'Enviar Receita'}</h1>
        </header>
        <form onSubmit={handleSubmit} className="form-receita" style={{background:'#fff', borderRadius:8, padding:24, maxWidth:600, margin:'0 auto', boxShadow:'0 2px 6px rgba(0,0,0,0.08)'}}>
          {erro && <p style={{ color: 'red' }}>{erro}</p>}
          {mensagem && <p style={{ color: 'green' }}>{mensagem}</p>}

          <label>Título:
            <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} required />
          </label>

          <label>Descrição:
            <textarea value={descricao} onChange={e => setDescricao(e.target.value)} />
          </label>

          <label>Categoria:
            <select value={categoria} onChange={e => setCategoria(e.target.value)} required>
              <option value="">Selecione a categoria</option>
              <option value="sobremesas">Sobremesas</option>
              <option value="carnes">Carnes</option>
              <option value="aves">Aves</option>
              <option value="peixes">Peixes</option>
              <option value="saladas">Saladas</option>
            </select>
          </label>

          <label>Tempo de Preparo (min):
            <input type="number" value={tempoPreparo} onChange={e => setTempoPreparo(e.target.value)} />
          </label>

          <label>Porções:
            <input type="number" value={porcoes} onChange={e => setPorcoes(e.target.value)} />
          </label>

          <label>Dificuldade:
            <select value={dificuldade} onChange={e => setDificuldade(e.target.value)}>
                <option value="fácil">Fácil</option>
                <option value="média">Média</option>
                <option value="difícil">Difícil</option>
              </select>
          </label>

          <label>Ingredientes:</label>
          {ingredientes.map((ing, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
              <input
                type="text"
                value={ing}
                onChange={e => handleIngredienteChange(i, e.target.value)}
                required
              />
              <button type="button" onClick={() => handleRemoveIngrediente(i)} style={{fontSize:18, padding:'0 8px'}}>−</button>
            </div>
          ))}
          <button type="button" onClick={handleAddIngrediente} style={{marginBottom:12}}>Adicionar ingrediente</button>

          <label>Modo de Preparo:</label>
          {modoPreparo.map((passo, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
            <input
                type="text"
                value={passo}
                onChange={e => handleModoPreparoChange(i, e.target.value)}
                required
            />
              <button type="button" onClick={() => handleRemoveModoPreparo(i)} style={{fontSize:18, padding:'0 8px'}}>−</button>
          </div>
          ))}
          <button type="button" onClick={handleAddModoPreparo} style={{marginBottom:12}}>Adicionar passo</button>

          <label>Imagem:
            <input type="file" accept="image/*" onChange={e => setImagem(e.target.files[0])} />
          </label>

          <button type="submit" style={{marginTop:16}}>{id ? 'Salvar Alterações' : 'Enviar Receita'}</button>
        </form>
      </div>
    </>
  );
}

export default CriarReceita;