import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import "../receitas/Receitas.css";
import { Link } from 'react-router-dom';
import bolinhoPeixe from '../../assets/bolinhoPeixe.jpg';
import bolinhoBacalhau from '../../assets/bolinhoBacalhau.jpg';
import arrozPeixe from '../../assets/arrozPeixe.jpg';
import gratinadoPeixe from '../../assets/gratinadoPeixe.jpg';
import { API_URL, API_STATIC_URL } from '../../config/api';

function Peixes() {
  const [receitasDinamicas, setReceitasDinamicas] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/receitas?categoria=peixes`)
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

        <h2>Nossas receitas</h2>
        <div className="receitas-container">

          <Link to="/BolinhoPeixe" className="categoria">
            <img src={bolinhoPeixe} alt="Bolinho de peixe com batata" />
            <h4>Bolinho de peixe com batata</h4>
          </Link>

          <Link to="/BolinhoBacalhau" className="categoria">
            <img src={bolinhoBacalhau} alt="Bolinho de Bacalhau" />
            <h4>Bolinho de bacalhau</h4>
          </Link>

          <Link to="/ArrozPeixe" className="categoria">
            <img src={arrozPeixe} alt="Arroz cremoso de peixe" />
            <h4>Arroz cremoso de peixe</h4>
          </Link>

          <Link to="/GratinadoPeixe" className="categoria">
            <img src={gratinadoPeixe} alt="gratinado de peixe" />
            <h4>Gratinado de peixe</h4>
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

export default Peixes;
