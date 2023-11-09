/* HOOKS */

import {Route, Routes, BrowserRouter} from 'react-router-dom'


/* STYLES */

import './App.css';

/* PAGES */

import Index from './pages/Index';
import Camisetas from './pages/Categorias/Camisetas'
import Workout from './pages/Categorias/Workout';
import Futebol from './pages/Categorias/Futebol';
import CalcasBermudas from './pages/Categorias/CalcasBermudas';
import Basquete from './pages/Categorias/Basquete';
import Calcados from './pages/Categorias/Calcados';
import ProdutoPage from './pages/ProdutoPage';
import Login from './pages/Login';
import Register from './pages/Register';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/accounts/login" element={<Login />} /> 
          <Route path="/accounts/register" element={<Register />} /> 

          <Route path='/' element={<Index />} />
          <Route path="/camisetas" element={<Camisetas />}></Route>
          <Route path="/workout" element={<Workout />}></Route>
          <Route path="/futebol" element={<Futebol />}></Route>
          <Route path="/calcas&bermudas" element={<CalcasBermudas />}></Route>
          <Route path="/basquete" element={<Basquete />}></Route>
          <Route path="/calcados" element={<Calcados />}></Route>

          <Route path='/produtos/:PRODUTO_NOME' element={<ProdutoPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
