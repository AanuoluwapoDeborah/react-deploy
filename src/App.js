import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Component/Home';
import Layout from './Container/Layout';
import About from './Component/About';
import NonFound from './Component/NonFound';
import Product from './Component/Product';
import SingleProduct from './Component/SingleProduct';
import Admin from './Component/Admin';
import AdminProducts from './Component/AdminProducts';
import AdminEditPage from './Component/AdminEditPage';
import SignUp from './Component/SignUp';
import LogIn from './Component/LogIn';
import Cart from './Component/Cart';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/products" element={<Layout/>}>
          <Route index element={<Product/>}/>
          <Route path='cart' element={<Cart/>}/>
        </Route>
          <Route path='/about' element={<About/>}/>
        <Route path='/products/:id' element={<SingleProduct/>}/>
        <Route path='*' element={<NonFound/>}/>
        <Route path='/postProducts' element={<Admin/>}/>
        <Route path='/allProducts' element={<AdminProducts/>}/>
        <Route path='/editProduct/:id' element={<AdminEditPage/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/log-in' element={<LogIn/>}/>
      </Routes>
    </div>
  );
}

export default App;
