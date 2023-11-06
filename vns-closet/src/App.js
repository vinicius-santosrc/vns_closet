/* HOOKS */

import {Route, Routes, BrowserRouter} from 'react-router-dom'


/* STYLES */

import './App.css';

/* PAGES */

import Index from './pages/Index';
import Camisetas from './pages/Categorias/Camisetas'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path="/camisetas" element={<Camisetas />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
