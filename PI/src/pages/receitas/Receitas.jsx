import React from 'react'
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import "./Receitas.css"
import { Link } from 'react-router-dom';
import peixeImg from '../../assets/peixe.jpeg'
import carne from '../../assets/carne.jpg'
import aves from '../../assets/aves.jpg'
import pave from '../../assets/Pave.jpeg'
import saladas from '../../assets/saladas.jpg'

function Receitas() {
  return (
    <>
      <Header />
      <div className="pagina">

        <div className="receitas-container">

          <Link to="/Sobremesas" className="categoria">
            <img src={pave} alt="sobremesas" />
            <h4>Sobremesas</h4>
          </Link>

          <Link to="/Carnes" className="categoria">
            <img src={carne} alt="Carnes" />
            <h4>Carnes</h4>
          </Link>

          <Link to="/Peixes" className="categoria">
            <img src={peixeImg} alt="Peixes" />
            <h4>Peixes</h4>
          </Link>

          <Link to="/Aves" className="categoria">
            <img src={aves} alt="Aves" />
            <h4>Aves</h4>
          </Link>

          <Link to="/Saladas" className="categoria">
            <img src={saladas} alt="saladas" />
            <h4>Saladas</h4>
          </Link>


        </div>


      </div>
      <Footer />
    </>


  )
}

export default Receitas