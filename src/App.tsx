import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';

import Home       from './pages/Home/page';
import Products   from './pages/Products/page';
import Categories from './pages/Categories/page';
import Cart       from './pages/Cart/page';
import Checkout   from './pages/Checkout/page';
import Login      from './pages/Login/page';
import Signup     from './pages/Signup/page';
import Dashboard  from './pages/Dashboard/page';
import Contact    from './pages/Contact/page';
import Reviews    from './pages/Reviews/page';
import Teams      from './pages/Teams/page';
import Profile    from './pages/Profile/page';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/products"   element={<Products />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart"       element={<Cart />} />
            <Route path="/checkout"   element={<Checkout />} />
            <Route path="/login"      element={<Login />} />
            <Route path="/signup"     element={<Signup />} />
            <Route path="/dashboard"  element={<Dashboard />} />
            <Route path="/contact"    element={<Contact />} />
            <Route path="/reviews"    element={<Reviews />} />
            <Route path="/teams"      element={<Teams />} />
            <Route path="/profile"    element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
