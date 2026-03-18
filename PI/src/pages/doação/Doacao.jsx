import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Doacao.css';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { Link } from 'react-router-dom';
import { API_URL } from '../../config/api';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

const pontosDeEntrega = [
  { id: 1, nome: "Ponto Central", lat: -23.55052, lng: -46.633308 },
  { id: 2, nome: "Ponto Zona Sul", lat: -23.60000, lng: -46.70000 },
  { id: 3, nome: "Ponto Zona Norte", lat: -23.52000, lng: -46.64000 },
];

function Doacao() {
  const [tipoDoacao, setTipoDoacao] = useState('');
  const [medida, setMedida] = useState('gramas');
  const [posicaoSelecionada, setPosicaoSelecionada] = useState(null);
  const [valorDinheiro, setValorDinheiro] = useState('');
  const [alimento, setAlimento] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Monta os dados conforme o tipo de doação
    let doacao = {
      tipo: tipoDoacao,
      valor: tipoDoacao === 'dinheiro'
        ? valorDinheiro
        : `${quantidade} ${medida} de ${alimento}`,
      descricao: tipoDoacao === 'comida' && posicaoSelecionada
        ? `Ponto: ${posicaoSelecionada.nome} (${posicaoSelecionada.lat}, ${posicaoSelecionada.lng})`
        : '',
      nome,
      cpf
    };

    try {
      // Pegue o token JWT do localStorage (ajuste conforme seu login)
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/doacoes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(doacao)
      });

      const data = await response.json();
      if (response.ok) {
        setMensagem('Doação registrada com sucesso!');
      } else {
        setMensagem(data.erro || data.msg || 'Erro ao registrar doação');
      }
    } catch {
      setMensagem('Erro ao conectar com o servidor');
    }
  };

  return (
    <>
      <Header />

      <div className="Doacao">
        <div style={{ textAlign: 'right', marginBottom: 16 }}>
          <Link to="/doacoes-lista" style={{ color: '#1976d2', textDecoration: 'underline', fontWeight: 'bold' }}>
            Ver doações registradas
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <h2>Doação</h2>

          <label>Tipo de doação:</label>
          <select value={tipoDoacao} onChange={(e) => setTipoDoacao(e.target.value)}>
            <option value="">Selecione</option>
            <option value="dinheiro">Dinheiro</option>
            <option value="comida">Comida</option>
          </select>

          {tipoDoacao === 'dinheiro' && (
            <>
              <label>Valor (R$):</label>
              <input
                type="number"
                placeholder="Ex: 50.00"
                value={valorDinheiro}
                onChange={e => setValorDinheiro(e.target.value)}
              />
            </>
          )}

          {tipoDoacao === 'comida' && (
            <>
              <label>Alimento:</label>
              <input
                type="text"
                placeholder="Ex: Arroz"
                value={alimento}
                onChange={e => setAlimento(e.target.value)}
              />
              <label>Quantidade:</label>
              <input
                type="number"
                placeholder="Ex: 500"
                value={quantidade}
                onChange={e => setQuantidade(e.target.value)}
              />
              <select value={medida} onChange={(e) => setMedida(e.target.value)}>
                <option value="gramas">gramas</option>
                <option value="quilos">quilos</option>
              </select>

              <label style={{ marginTop: '20px' }}>Selecione o ponto de entrega no mapa:</label>

              <MapContainer
                center={[-23.55, -46.63]}
                zoom={12}
                style={{ height: '300px', width: '100%', borderRadius: '12px', marginBottom: '20px' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />

                {pontosDeEntrega.map((ponto) => (
                  <Marker
                    key={ponto.id}
                    position={[ponto.lat, ponto.lng]}
                    eventHandlers={{
                      click: () => {
                        setPosicaoSelecionada(ponto);
                      },
                    }}
                    icon={
                      posicaoSelecionada?.id === ponto.id
                        ? new L.Icon({
                            iconUrl:
                              'https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=star|FF0000',
                            iconSize: [30, 50],
                            iconAnchor: [15, 50],
                            popupAnchor: [0, -50],
                          })
                        : new L.Icon.Default()
                    }
                  >
                    <Popup>{ponto.nome}</Popup>
                  </Marker>
                ))}
              </MapContainer>

              {posicaoSelecionada && (
                <p>
                  Localização selecionada: <strong>{posicaoSelecionada.nome}</strong> — Latitude{' '}
                  {posicaoSelecionada.lat.toFixed(5)}, Longitude {posicaoSelecionada.lng.toFixed(5)}
                </p>
              )}
            </>
          )}

          <h3>Seus dados</h3>

          <label>Nome:</label>
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
          />

          <label>CPF:</label>
          <input
            type="text"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
          />

          <button type="submit">Enviar Doação</button>
          {mensagem && <p style={{ marginTop: '10px', color: 'green' }}>{mensagem}</p>}
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Doacao;