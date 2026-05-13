import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Home      from './pages/Home/page';
import Products  from './pages/Products/page';
import Cart      from './pages/Cart/page';
import Checkout  from './pages/Checkout/page';
import Login     from './pages/Login/page';
import Signup    from './pages/Signup/page';
import Dashboard from './pages/Dashboard/page';
import Contact   from './pages/Contact/page';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/products"  element={<Products />} />
          <Route path="/cart"      element={<Cart />} />
          <Route path="/checkout"  element={<Checkout />} />
          <Route path="/login"     element={<Login />} />
          <Route path="/signup"    element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact"   element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
