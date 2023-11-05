/* HOOKS */

import {Route, Routes, BrowserRouter} from 'react-router-dom'


/* STYLES */

import './App.css';

/* PAGES */

import Index from './pages/Index';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
