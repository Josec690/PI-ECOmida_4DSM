import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import "../receitas/Receitas.css";
import { Link } from 'react-router-dom';
import saladaManga from '../../assets/saladaManga.jpg';
import abacate from '../../assets/saladaAbacate.jpg';
import grao from '../../assets/saladaGrao.webp';
import beterraba from '../../assets/saladaBeterraba.jpg';
import { API_URL, API_STATIC_URL } from '../../config/api';

function Saladas() {
  const [receitasDinamicas, setReceitasDinamicas] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/receitas?categoria=saladas`)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar receitas');
        return res.json();
      })
      .then((data) => {
        setReceitasDinamicas(data.receitas);
      })
      .catch((err) => {
        setErro(err.message);
      });
  }, []);

  const baseUrlImagem = API_STATIC_URL;

  return (
    <>
      <Header />
      <div className="pagina">

        <h2>Nossas Receitas</h2>
        <div className="receitas-container">
          <Link to="/SaladaManga" className="categoria">
            <img src={saladaManga} alt="Salada de manga com nozes" />
            <h4>Salada de manga com nozes</h4>
          </Link>

          <Link to="/SaladaAbacate" className="categoria">
            <img src={abacate} alt="Salada de abacate" />
            <h4>Salada de abacate</h4>
          </Link>

          <Link to="/SaladaBeterraba" className="categoria">
            <img src={beterraba} alt="Salada de beterraba" />
            <h4>Salada de beterraba</h4>
          </Link>

          <Link to="/SaladaGrao" className="categoria">
            <img src={grao} alt="Salada gâo de bico" />
            <h4>Salada de gão de bico</h4>
          </Link>
        </div>

        <h2>Receitas de vocês</h2>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        <div className="receitas-container">
          {receitasDinamicas.length === 0 && !erro && <p>Carregando receitas...</p>}

          {receitasDinamicas.map((receita) => (
            <Link key={receita._id} to={`/receita/${receita._id}`} className="categoria">
              <img
                src={
                  receita.imagem
                    ? (receita.imagem.startsWith('http')
                        ? receita.imagem
                        : baseUrlImagem + receita.imagem)
                    : 'https://via.placeholder.com/150'
                }
                alt={receita.titulo}
              />
              <h4>{receita.titulo}</h4>
              <div>
                {Array.from({length: 5}).map((_, i) => (
                  <span key={i} style={{color: i < (receita.media_avaliacao || 0) ? '#FFD700' : '#ccc'}}>
                    ★
                  </span>
                ))}
                <span style={{fontSize:12, marginLeft:4}}>
                  ({receita.total_avaliacoes || 0})
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Saladas;
