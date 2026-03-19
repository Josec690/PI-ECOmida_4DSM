import { useState } from 'react';
import "../sobremesas/Bolo.css";
import gratinadoMilho from '../../assets/gratinadoFrango.JPG'; 
import Header from '../../components/header/Header';

function GratinadoFrango() {
  const [porcoes, setPorcoes] = useState(6);

  return (
    <>
      <Header />
      <div className="pagina-receita">
        <header className="receita-header">
          <h1>Gratinado de Frango com Creme de Milho</h1>
        </header>

        <div className="imagem-e-info-container">
          <img src={gratinadoMilho} alt="Gratinado cremoso de frango com creme de milho e queijo" className="receita-imagem" />
          <div className="receita-info">
            <div className="info-item"><p>45min</p></div>
            <div className="info-item"><p>Fácil</p></div>
            <div className="info-item"><p>{porcoes} porções</p></div>
          </div>
        </div>

        <section className="ingredientes">
          <h2>Ingredientes</h2>
          <ul>
            <li>Frango assado desfiado (300 a 400g)</li>
            <li>1 lata de milho verde escorrido</li>
            <li>1 caixinha de creme de leite (200g)</li>
            <li>1/2 xícara de caldo de frango (ou água com temperos)</li>
            <li>1 colher (chá) de pasta de alho</li>
            <li>4 colheres (sopa) de queijo parmesão ralado</li>
            <li>6 a 8 fatias de queijo (mussarela ou prato)</li>
          </ul>
        </section>

        <section className="preparo">
          <h2>Modo de Preparo</h2>
          <ol>
            <li>No liquidificador, bata o milho, o creme de leite, o caldo de frango e a pasta de alho até formar um creme liso.</li>
            <li>Em um refratário, espalhe o frango desfiado.</li>
            <li>Despeje o creme de milho por cima do frango, cobrindo bem.</li>
            <li>Distribua as fatias de queijo por cima e polvilhe o parmesão ralado.</li>
            <li>Leve ao forno preaquecido a 200 °C por cerca de 20 minutos ou até gratinar.</li>
            <li>Sirva quente, acompanhado de arroz branco ou salada verde.</li>
          </ol>
        </section>
      </div>
    </>
  );
}

export default GratinadoFrango;
