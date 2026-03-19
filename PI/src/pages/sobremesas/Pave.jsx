import { useState } from 'react';
import './Bolo.css';
import pave from '../../assets/Pave.jpeg'; // Adicione a imagem correta do pavê
import Header from '../../components/header/Header';

function Pave() {
  const [porcoes, setPorcoes] = useState(6); // Exemplo de porção

  return (
    <>
      <Header />
      <div className="pagina-receita">

        {/* Cabeçalho com título */}
        <header className="receita-header">
          <h1>Pavê Sustentável de Chocolate</h1>
        </header>

        {/* Container englobando imagem + informações */}
        <div className="imagem-e-info-container">
          <img 
            src={pave} 
            alt="Pavê Sustentável de Chocolate" 
            className="receita-imagem" 
          />
          <div className="receita-info">
            <div className="info-item">
              <p>30 min</p>
            </div>
            <div className="info-item">
              <p>Fácil</p>
            </div>
            <div className="info-item">
              <p>{porcoes} porções</p>
            </div>
          </div>
        </div>

        {/* Seção de ingredientes */}
        <section className="ingredientes">
          <h2>Ingredientes</h2>
          <ul>
            <li>1 pacote de bolacha maizena</li>
            <li>2 xícaras de leite (pode ser reaproveitado de outra receita)</li>
            <li>2 colheres de sopa de amido de milho</li>
            <li>3 colheres de sopa de açúcar</li>
            <li>3 colheres de sopa de chocolate em pó (ou sobras de barra ralada)</li>
            <li>1 colher de chá de essência de baunilha (opcional)</li>
            <li>Raspas de chocolate ou frutas picadas para decorar (opcional)</li>
          </ul>
        </section>

        {/* Modo de preparo */}
        <section className="preparo">
          <h2>Modo de Preparo</h2>
          <ol>
            <li>Em uma panela, misture o leite, o amido, o açúcar e o chocolate. Mexa até engrossar.</li>
            <li>Adicione a essência de baunilha e desligue o fogo.</li>
            <li>Em um refratário, monte camadas: bolacha maizena, creme de chocolate, e repita.</li>
            <li>Finalize com o creme e decore com raspas ou frutas.</li>
            <li>Leve à geladeira por pelo menos 2 horas antes de servir.</li>
          </ol>
        </section>

        {/* Dicas extras */}
        <section className="dicas">
          <h3>Dicas</h3>
          <p>
            Sobrou creme de chocolate? Use como cobertura de frutas. Sobrou bolacha? Triture e faça uma farofinha doce para outras sobremesas!
          </p>
        </section>
      </div>
    </>
  );
}

export default Pave;
