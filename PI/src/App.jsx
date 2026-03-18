import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './components/auth/PrivateRoute';
import Cadastro from './pages/cadastro/Cadastro'
import Home from './pages/home/Home'
import Sobre from './pages/sobre/Sobre'
import Login from './pages/login/Login'
import Receitas from './pages/receitas/Receitas'
import Carnes from './pages/carnes/Carnes'
import Aves from './pages/aves/aves'
import Sobremesas from './pages/sobremesas/Sobremesas'
import Peixes from './pages/peixes/Peixes'
import MudarSenha from './pages/senha/MudarSenha'
import Doacao from './pages/doação/Doacao'
import Usuario from './pages/usuario/Usuario'
import Bolo from './pages/sobremesas/Bolo'
import EmailSenha from './pages/senha/EmailSenha'
import Panqueca from './pages/carnes/Panqueca'
import Pave from './pages/sobremesas/Pave'
import SorveteMorango from './pages/sobremesas/SorveteMorango'
import TortaLimao from './pages/sobremesas/TortaLimao'
import PicanhaManteiga from './pages/carnes/PicanhaManteiga'
import LegumesCarne from './pages/carnes/LegumesCarne'
import Lagarto from './pages/carnes/Lagarto'
import CriarReceita from './pages/sobremesas/criar-receita';
import BolinhoPeixe from './pages/peixes/BolinhoPeixe'
import BolinhoBacalhau from './pages/peixes/BolinhoBacalhau'
import ArrozPeixe from './pages/peixes/ArrozPeixe'
import GratinadoPeixe from './pages/peixes/GratinadoPeixe'
import FrangoMazu from './pages/aves/FrangoMazu'
import GratinadoFrango from './pages/aves/GratinadoFrango'
import Macarronese from './pages/aves/Macarronese'
import TortaDeFrango from './pages/aves/TortaDeFrango'
import Saladas from './pages/saladas/Saladas'
import SaladaAbacate from './pages/saladas/SaladaAbacate'
import SaladaBeterraba from './pages/saladas/SaladaBeterraba'
import SaladaGrao from './pages/saladas/SaladaGrao'
import SaladaManga from './pages/saladas/SaladaManga'
import RedefinirSenha from './pages/senha/RedefinirSenha';
import Receita from './pages/receitas/Receita';
import ListaDoacoes from './pages/doação/ListaDoacoes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='Cadastro' element={<Cadastro />} />
          <Route path='/' element={<Home />} />
          <Route path='Sobre' element={<Sobre />} />
          <Route path='Login' element={<Login />} />
          <Route path='Receitas' element={<Receitas />} />
          <Route path='Carnes' element={<Carnes />} />
          <Route path='Aves' element={<Aves />} />
          <Route path='Sobremesas' element={<Sobremesas />} />
          <Route path='Peixes' element={<Peixes />} />
          <Route path='MudarSenha' element={<MudarSenha />} />
          <Route path="/criar-receita" element={<CriarReceita />} />
          <Route path="/criar-receita/:id" element={<CriarReceita />} />
          <Route path="/redefinir-senha" element={<RedefinirSenha />} />
          {/* Rotas protegidas */}
          <Route path='Doacao' element={
            <PrivateRoute>
              <Doacao />
            </PrivateRoute>
          } />
          <Route path="/doacoes-lista" element={<ListaDoacoes />} />

          <Route path='Usuario' element={
            <PrivateRoute>
              <Usuario />
            </PrivateRoute>
          } />
          <Route path='Bolo'element={<Bolo/>} />
          <Route path='EmailSenha'element={<EmailSenha/>} />
          <Route path='Panqueca'element={<Panqueca/>} />
          <Route path='Pave'element={<Pave/>} />
          <Route path='SorveteMorango'element={<SorveteMorango/>} />
          <Route path='TortaLimao'element={<TortaLimao/>} />
          <Route path='PicanhaManteiga'element={<PicanhaManteiga/>} />
          <Route path='LegumesCarne'element={<LegumesCarne/>} />
          <Route path='Lagarto'element={<Lagarto/>} />
          <Route path='BolinhoPeixe'element={<BolinhoPeixe/>} />
          <Route path='BolinhoBacalhau'element={<BolinhoBacalhau/>} />
          <Route path='ArrozPeixe'element={<ArrozPeixe/>} />
          <Route path='GratinadoPeixe'element={<GratinadoPeixe/>} />
          <Route path='FrangoMazu'element={<FrangoMazu/>} />
          <Route path='GratinadoFrango'element={<GratinadoFrango/>} />
          <Route path='Macarronese'element={<Macarronese/>} />
          <Route path='TortaDeFrango'element={<TortaDeFrango/>} />
          <Route path="/receita/:id" element={<Receita />} />
          <Route path='Saladas'element={<Saladas/>} />
          <Route path='SaladaGrao'element={<SaladaGrao/>} />
          <Route path='SaladaManga'element={<SaladaManga/>} />
          <Route path='SaladaAbacate'element={<SaladaAbacate/>} />
          <Route path='SaladaBeterraba'element={<SaladaBeterraba/>} />
         
         
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
