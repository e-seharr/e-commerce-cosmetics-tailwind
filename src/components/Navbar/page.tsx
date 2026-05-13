import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function Navbar() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();

  return (
    <nav className="flex justify-between items-center px-10 py-[15px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] sticky top-0 z-[100]">

      {/* Brand — black text, font-weight 700, matches screenshot exactly */}
      <Link to="/" className="text-[#1f1f1f] font-bold text-[16px] no-underline hover:text-[#1f1f1f]">
        E-commerce Cosmetics Store
      </Link>

      {/* Hamburger — mobile only */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex flex-col gap-[5px] cursor-pointer bg-transparent border-none p-1 shadow-none rounded-none mt-0 w-auto hover:bg-transparent hover:shadow-none hover:translate-y-0">
        <span className="block w-6 h-[2px] bg-[#1f1f1f] rounded-sm"></span>
        <span className="block w-6 h-[2px] bg-[#1f1f1f] rounded-sm"></span>
        <span className="block w-6 h-[2px] bg-[#1f1f1f] rounded-sm"></span>
      </button>

      {/* Nav links */}
      <ul className={`list-none m-0 p-0 items-center gap-5
        md:flex
        ${open
          ? 'flex flex-col gap-0 absolute top-[60px] left-0 w-full bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] py-2.5 z-50'
          : 'hidden md:flex'
        }`}>
        <li className="md:px-0 md:py-0 px-5 py-2.5">
          <Link to="/" className="no-underline text-[#1f1f1f] font-medium text-[14px] hover:text-[#ff6b9d] transition-colors">Home</Link>
        </li>
        <li className="md:px-0 md:py-0 px-5 py-2.5">
          <Link to="/products" className="no-underline text-[#1f1f1f] font-medium text-[14px] hover:text-[#ff6b9d] transition-colors">Products</Link>
        </li>
        <li className="md:px-0 md:py-0 px-5 py-2.5">
          <Link to="/cart" className="no-underline text-[#1f1f1f] font-medium text-[14px] hover:text-[#ff6b9d] transition-colors">
            Cart {cart.length > 0 && <span>({cart.length})</span>}
          </Link>
        </li>
        <li className="md:px-0 md:py-0 px-5 py-2.5">
          <Link to="/contact" className="no-underline text-[#1f1f1f] font-medium text-[14px] hover:text-[#ff6b9d] transition-colors">Contact</Link>
        </li>
        <li className="md:px-0 md:py-0 px-5 py-2.5">
          <Link to="/login" className="no-underline text-[#1f1f1f] font-medium text-[14px] hover:text-[#ff6b9d] transition-colors">Login</Link>
        </li>
        <li className="md:px-0 md:py-0 px-5 py-2.5">
          <Link to="/dashboard" className="no-underline text-[#1f1f1f] font-medium text-[14px] hover:text-[#ff6b9d] transition-colors">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
