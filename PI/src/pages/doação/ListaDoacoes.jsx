import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import './Doacao.css';
import { API_URL } from '../../config/api';

function ListaDoacoes() {
  const [doacoes, setDoacoes] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/doacoes`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.doacoes) {
          setDoacoes(data.doacoes);
        } else {
          setErro(data.erro || 'Erro ao buscar doações');
        }
      })
      .catch(() => setErro('Erro ao conectar com o servidor'));
  }, []);

  return (
    <>
      <Header />      
      <div className="pagina" style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
        <h2>Doações Registradas</h2>
        {erro && <p style={{ color: 'red' }}>{erro}</p>}
        {doacoes.length === 0 && !erro && <p>Nenhuma doação encontrada.</p>}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {doacoes.map((d) => (
            <li key={d._id} style={{ border: '1px solid #ccc', borderRadius: 8, marginBottom: 16, padding: 16 }}>
              <strong>Tipo:</strong> {d.tipo}<br />
              <strong>Valor:</strong> {d.valor}<br />
              {d.descricao && (<><strong>Descrição:</strong> {d.descricao}<br /></>)}
              <strong>Data:</strong> {d.data ? new Date(d.data).toLocaleString() : '-'}
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </>
  );
}

export default ListaDoacoes;