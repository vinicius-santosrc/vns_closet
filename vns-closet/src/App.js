/* HOOKS */

import { Route, Routes, BrowserRouter } from 'react-router-dom'


/* STYLES */

import './App.css';

/* PAGES */

import Index from './pages/Index';
import Camisetas from './pages/Categorias/Camisetas'
import CalcasBermudas from './pages/Categorias/CalcasBermudas';
import ProdutoPage from './pages/ProdutoPage';
import Login from './pages/Login';
import Register from './pages/Register';
import MyAccount from './pages/Account/MyAccount';
import Checkout from './pages/Checkout';
import MyAccount_Adress from './pages/Account/MyAccount_Adress';
import MyAccountOrders from './pages/Account/MyAccountOrders';
import MyAccountOrders_Order from './pages/Account/MyAccountOrders_Order';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/accounts/myaccount" element={<MyAccount />} />
          <Route path="/accounts/myaccount/address" element={<MyAccount_Adress />} />
          <Route path='/accounts/myaccount/orders' element={<MyAccountOrders />}/>
          <Route path='/accounts/myaccount/orders/:IDpedido' element={<MyAccountOrders_Order />}/>


          <Route path="/accounts/login" element={<Login />} />
          <Route path="/accounts/register" element={<Register />} />

          <Route path='/' element={<Index />} />
          <Route path="/camisetas" element={<Camisetas />}></Route>
          <Route path="/calcas&bermudas" element={<CalcasBermudas />}></Route>

          <Route path='/checkout' element={<Checkout />} />
          <Route path='/produtos/:PRODUTO_NOME' element={<ProdutoPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
