import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white pt-10 pb-5 px-5 mt-16 text-center">
      <div className="flex flex-wrap justify-between gap-8 max-w-[1100px] mx-auto mb-5 text-left">
        <div className="flex-1 min-w-[160px]">
          <h2 className="text-white text-base font-semibold mb-3">E-commerce Cosmetics Store</h2>
          <p className="text-[#ffd6e0] text-[13px]">Beauty that speaks for you. Premium cosmetics crafted with love.</p>
        </div>
        <div className="flex-1 min-w-[160px]">
          <h3 className="text-white text-sm font-semibold mb-2.5">Quick Links</h3>
          <Link to="/"           className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Home</Link>
          <Link to="/products"   className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Products</Link>
          <Link to="/categories" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Categories</Link>
          <Link to="/cart"       className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Cart</Link>
        </div>
        <div className="flex-1 min-w-[160px]">
          <h3 className="text-white text-sm font-semibold mb-2.5">Support</h3>
          <Link to="/contact"   className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Contact Us</Link>
          <Link to="/reviews"   className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Reviews</Link>
          <Link to="/teams"     className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Our Team</Link>
          <Link to="/login"     className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Login</Link>
          <Link to="/dashboard" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Dashboard</Link>
        </div>
      </div>
      <p className="text-[#ffd6e0] text-[13px]">© 2026 E-commerce Cosmetics Store. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
