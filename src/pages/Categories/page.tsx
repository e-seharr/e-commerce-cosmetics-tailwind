import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';
import { useCart } from '../../context/CartContext';

type AddedKey = string;

function Categories() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState<AddedKey | null>(null);
  const base = import.meta.env.BASE_URL;

  function handleAdd(name: string, price: number, key: AddedKey) {
    addToCart(name, price); setAdded(key);
    setTimeout(() => setAdded(null), 1800);
  }

  function CardItem({ name, price, img, section, idx }: { name: string; price: number; img: string; section: string; idx: number }) {
    const key = section + idx;
    const isAdded = added === key;
    return (
      <div className="flex flex-col bg-white rounded-[18px] p-3.5 w-[220px] text-center shadow-[0_4px_18px_rgba(255,107,157,0.1)] border border-[#ffe0ee] gap-1 cursor-pointer transition-all hover:scale-[1.06] hover:shadow-[0_12px_28px_rgba(255,107,157,0.3)] hover:border-[#ff6b9d]">
        <img src={img} alt={name} className="w-full h-40 object-contain rounded-[10px] bg-white p-2 border border-[#fff0f5]" />
        <h3 className="text-[18px] font-semibold m-0 mt-1.5 text-[#1f1f1f]">{name}</h3>
        <p className="text-[#ff6b9d] font-bold text-[15px] m-0">Rs. {price}</p>
        <button
          onClick={() => handleAdd(name, price, key)}
          disabled={isAdded}
          className={`mt-2 px-4 py-2.5 rounded-[20px] text-white font-semibold text-[13px] border-none cursor-pointer w-full transition-all
            ${isAdded ? 'bg-gradient-to-br from-[#c2185b] to-[#e91e8c]' : 'bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,157,0.45)]'}`}
        >{isAdded ? '✓ Added!' : 'Add to Cart'}</button>
      </div>
    );
  }

  const catCards = [
    { cat: 'makeup',   img: `${base}images/lipstick1.jpeg`,  title: '💄 Makeup',   desc: 'Lipsticks, foundations, mascaras, eyeshadows, primers and more.', subs: [['makeup&sub=lips','👄 Lips'],['makeup&sub=eyes','👁️ Eyes'],['makeup&sub=face','✨ Face']] },
    { cat: 'skincare', img: `${base}images/vitamin c.jpeg`,  title: '🧴 Skincare', desc: 'Serums, moisturizers, cleansers and everything your skin needs to glow.', subs: [['skincare','✨ Face Care'],['skincare','🌿 All Skincare']] },
    { cat: 'haircare', img: `${base}images/shampoo.jpeg`,    title: '💆 Haircare', desc: 'Shampoos, hair oils and treatments for healthy, shiny hair.', subs: [['haircare','🧴 Shampoo'],['haircare','💧 Hair Oil']] },
    { cat: 'nailcare', img: `${base}images/nailpolish.jpeg`, title: '💅 Nailcare', desc: 'Nail polishes, nail kits and everything for perfect nails.', subs: [['nailcare','💅 Nail Polish'],['nailcare','🧰 Nail Kits']] },
  ];

  return (
    <div className="m-0 font-[Poppins,sans-serif] bg-[#fff5f9] text-[#1f1f1f]">
      <Navbar />

      {/* HERO */}
      <div className="text-center py-[60px] px-5 pb-8 bg-gradient-to-br from-[#ffe0ee] via-[#fff5f9] to-white">
        <h1 className="text-[36px] font-bold text-[#ff6b9d] mb-2.5">Shop by Category</h1>
        <p className="text-[15px] text-[#444] max-w-[520px] mx-auto">Explore our full range of beauty products — from makeup to skincare, haircare and nailcare.</p>
      </div>

      <div className="max-w-[1100px] mx-auto px-5 py-8">

        {/* CATEGORY CARDS */}
        <div className="flex flex-wrap justify-center gap-5 px-10 my-5">
          {catCards.map(({ cat, img, title, desc, subs }) => (
            <div key={cat} onClick={() => navigate(`/products?cat=${cat}`)}
              className="flex flex-col bg-white rounded-[20px] w-[240px] overflow-hidden shadow-[0_4px_20px_rgba(255,107,157,0.12)] border border-[#ffe0ee] cursor-pointer transition-all hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(255,107,157,0.28)] hover:border-[#ff6b9d]">
              <div className="w-full h-[180px] overflow-hidden bg-[#fff8fb]">
                <img src={img} alt={title} className="w-full h-full object-cover transition-transform hover:scale-[1.08]" />
              </div>
              <div className="px-4 pt-[18px] pb-5 flex flex-col gap-2">
                <h2 className="text-[18px] font-semibold m-0 text-[#1f1f1f]">{title}</h2>
                <p className="text-[12px] text-[#888] m-0 leading-relaxed">{desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {subs.map(([q, label]) => (
                    <a key={label} href="#"
                      onClick={e => { e.stopPropagation(); e.preventDefault(); navigate(`/products?cat=${q}`); }}
                      className="text-[11px] font-medium text-[#ff6b9d] bg-[#fff0f5] px-2.5 py-0.5 rounded-[20px] no-underline border border-[#ffd6e0] transition-all hover:bg-[#ff6b9d] hover:text-white hover:border-transparent"
                    >{label}</a>
                  ))}
                </div>
                <button className="mt-2 w-full px-4 py-2.5 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[20px] border-none cursor-pointer text-[13px] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,157,0.45)]">
                  Shop {title.split(' ')[1]} →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FEATURED */}
        <h2 className="text-center mt-[60px] mb-5 text-[22px] font-semibold text-[#1f1f1f]">Featured from Each Category</h2>

        {[
          { label: '💄 Makeup', cat: 'makeup', items: [
            { name: 'Matte Lipstick',    price: 1200, img: `${base}images/lipstick1.jpeg` },
            { name: 'Liquid Foundation', price: 2500, img: `${base}images/foundation.jpg` },
            { name: 'Volume Mascara',    price: 1800, img: `${base}images/maskara.jpeg` },
            { name: 'Eyeshadow Palette', price: 3500, img: `${base}images/palette.jpeg` },
          ]},
          { label: '🧴 Skincare', cat: 'skincare', items: [
            { name: 'Vitamin C Serum', price: 1200, img: `${base}images/vitamin c.jpeg` },
            { name: 'Moisturizer',     price: 2000, img: `${base}images/moisturizers.jpeg` },
            { name: 'Face Cleanser',   price: 1500, img: `${base}images/face cleanser.jpeg` },
          ]},
          { label: '💆 Haircare', cat: 'haircare', items: [
            { name: 'Shampoo',  price: 1200, img: `${base}images/shampoo.jpeg` },
            { name: 'Hair Oil', price: 700,  img: `${base}images/hair oil.jpeg` },
          ]},
          { label: '💅 Nailcare', cat: 'nailcare', items: [
            { name: 'Nail Polish', price: 700, img: `${base}images/nailpolish.jpeg` },
            { name: 'Nail Kit',    price: 900, img: `${base}images/nailkit.jpeg` },
          ]},
        ].map(({ label, cat, items }) => (
          <div key={cat}>
            <h3 className="text-[18px] font-bold text-[#ff6b9d] mt-10 mb-1 ml-3 pl-3 border-l-4 border-[#ff6b9d]">{label}</h3>
            <div className="flex flex-wrap justify-center gap-5 px-10 my-5">
              {items.map((p, i) => <CardItem key={i} {...p} section={cat} idx={i} />)}
            </div>
            <div className="flex flex-wrap justify-center gap-2.5 my-5">
              <button onClick={() => navigate(`/products?cat=${cat}`)}
                className="px-5 py-2 rounded-[20px] text-[13px] font-semibold bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white border-none cursor-pointer w-auto mt-0 transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,157,0.45)]">
                View All {label.split(' ')[1]} →
              </button>
            </div>
          </div>
        ))}
      </div>

      <footer className="bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white pt-10 pb-5 px-5 mt-16 text-center">
        <div className="flex flex-wrap justify-between gap-8 max-w-[1100px] mx-auto mb-5 text-left">
          <div className="flex-1 min-w-[160px]">
            <h2 className="text-white text-base font-semibold mb-3">E-commerce Cosmetics Store</h2>
            <p className="text-[#ffd6e0] text-[13px]">Premium beauty products for everyone.</p>
          </div>
          <div className="flex-1 min-w-[160px]">
            <h3 className="text-white text-sm font-semibold mb-2.5">Pages</h3>
            <Link to="/" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Home</Link>
            <Link to="/products" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Products</Link>
            <Link to="/cart" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Cart</Link>
          </div>
        </div>
        <p className="text-[#ffd6e0] text-[13px]">© 2026 E-commerce Cosmetics Store. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default Categories;
