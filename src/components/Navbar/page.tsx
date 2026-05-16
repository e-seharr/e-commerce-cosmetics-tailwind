import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { getLoggedInUser } from '../../utils/authUtils';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState<{ name: string } | null>(null);
  const { cart } = useCart();
  const { darkMode, toggleDark } = useTheme();
  const location = useLocation();

  // Re-check login state on every route change only
  useEffect(() => {
    setLoggedIn(getLoggedInUser());
  }, [location.pathname]);

  const lc = ({ isActive }: { isActive: boolean }) =>
    `no-underline font-medium text-[14px] transition-colors whitespace-nowrap ${
      isActive ? 'text-[#ff6b9d]' : 'text-[#1f1f1f] dark:text-[#f5e6ea] hover:text-[#ff6b9d]'
    }`;

  return (
    <nav className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-white dark:bg-[#2a1020] border-b border-[#ffd6e0] dark:border-[#4a2030] shadow-[0_2px_10px_rgba(0,0,0,0.05)] sticky top-0 z-[100]">
      <NavLink to="/" end className="text-[#1f1f1f] dark:text-[#f5e6ea] font-semibold text-[18px] no-underline tracking-normal">
        E-commerce Cosmetics Store
      </NavLink>

      <button onClick={() => setOpen(!open)} className="md:hidden flex flex-col gap-[5px] bg-transparent border-none p-1 cursor-pointer" aria-label="Toggle menu">
        <span className="block w-6 h-[2px] bg-[#1f1f1f] dark:bg-[#f5e6ea] rounded-sm"></span>
        <span className="block w-6 h-[2px] bg-[#1f1f1f] dark:bg-[#f5e6ea] rounded-sm"></span>
        <span className="block w-6 h-[2px] bg-[#1f1f1f] dark:bg-[#f5e6ea] rounded-sm"></span>
      </button>

      <ul className={`list-none m-0 p-0 md:flex items-center gap-3 w-full md:w-auto ${
        open ? 'flex flex-col gap-2 bg-white dark:bg-[#2a1020] p-4 rounded-[20px] border border-[#ffd6e0] dark:border-[#4a2030] shadow-[0_10px_30px_rgba(0,0,0,0.08)]' : 'hidden md:flex'
      }`}>
        <li>
          <button type="button" onClick={toggleDark}
            className="rounded-full border border-[#ff6b9d] bg-transparent px-4 py-2 text-[13px] font-semibold text-[#ff6b9d] transition hover:bg-[#ffeff8] dark:border-[#ffd6e0] dark:text-[#ffd6e0] dark:hover:bg-[#3a1828] cursor-pointer w-auto mt-0">
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </li>
        <li><NavLink to="/" end className={lc}>Home</NavLink></li>
        <li><NavLink to="/products" className={lc}>Products</NavLink></li>
        <li><NavLink to="/cart" className={lc}>Cart {cart.length > 0 && <span className="text-[#ff6b9d] font-bold">({cart.length})</span>}</NavLink></li>
        <li><NavLink to="/reviews" className={lc}>Reviews</NavLink></li>
        <li><NavLink to="/teams" className={lc}>Teams</NavLink></li>
        <li><NavLink to="/contact" className={lc}>Contact</NavLink></li>
        {loggedIn ? (
          <>
            <li><NavLink to="/profile" className={lc}>👤 {loggedIn.name}</NavLink></li>
            <li><NavLink to="/dashboard" className={lc}>Dashboard</NavLink></li>
          </>
        ) : (
          <>
            <li><NavLink to="/login" className={lc}>Login</NavLink></li>
            <li><NavLink to="/profile" className={lc}>Profile</NavLink></li>
            <li><NavLink to="/dashboard" className={lc}>Dashboard</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
