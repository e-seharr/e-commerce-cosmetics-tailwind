import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';
import { useCart } from '../../context/CartContext';
import { validateSubscription } from '../../utils/newsletterUtils';

const base = import.meta.env.BASE_URL;

const products = [
  { name: 'Vitamin C Serum',   price: 1200, img: `${base}images/vitamin c.jpeg`,   tag: 'bestseller' },
  { name: 'Moisturizer',       price: 1800, img: `${base}images/moisturizers.jpeg`, tag: 'bestseller' },
  { name: 'Primer',            price: 1500, img: `${base}images/primerr.jpeg`,      tag: 'bestseller' },
  { name: 'Lip Gloss',         price: 900,  img: `${base}images/gloss.jpeg`,        tag: 'new' },
  { name: 'Blush Palette',     price: 1100, img: `${base}images/blushes.jpeg`,      tag: 'new' },
  { name: 'Eyeshadow Palette', price: 1400, img: `${base}images/palette.jpeg`,      tag: 'new' },
  { name: 'Matte Lipstick',    price: 1200, img: `${base}images/lipstick1.jpeg`,    tag: 'featured' },
  { name: 'Liquid Foundation', price: 2500, img: `${base}images/foundation.jpg`,    tag: 'featured' },
  { name: 'Volume Mascara',    price: 1800, img: `${base}images/maskara.jpeg`,      tag: 'featured' },
];

function Home() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [filter,   setFilter]   = useState('all');
  const [email,    setEmail]    = useState('');
  const [addedIdx, setAddedIdx] = useState<number | null>(null);

  function handleAddToCart(name: string, price: number, idx: number) {
    addToCart(name, price);
    setAddedIdx(idx);
    setTimeout(() => setAddedIdx(null), 1800);
  }

  const filtered = filter === 'all' ? products : products.filter(p => p.tag === filter);

  return (
    <div className="min-h-screen bg-[#fff5f9] dark:bg-[#1a0a10] text-[#1f1f1f] dark:text-[#f5e6ea] font-[Poppins,sans-serif]">
      <Navbar />

      {/* ── HERO ──
          Screenshot: full-width pink gradient bg, large bold title on left,
          model image on right, wide pill "Shop Now" button
      */}
      <section className="flex items-center justify-between px-[80px] py-[70px] gap-[40px] bg-gradient-to-br from-[#ffe0ee] via-[#fff5f9] to-white dark:from-[#2a1020] dark:via-[#1a0a10] dark:to-[#1a0a10] max-md:flex-col max-md:px-8 max-md:py-10">
        <div className="flex-1">
          {/* Screenshot: very large bold black text, two lines */}
          <h1 className="text-[44px] font-extrabold m-0 leading-[1.2] text-[#1a1a1a] dark:text-[#f5e6ea]">
            Beauty That Speaks<br />For You
          </h1>
          <p className="mt-[20px] max-w-[420px] text-[14px] leading-relaxed text-[#444] dark:text-[#d4b8c0] mb-0">
            Your everyday beauty essentials made for you. Soft luxury cosmetics for glow, confidence, and elegance.
          </p>
          {/* Exact match to CSS: padding:9px 16px, border-radius:20px,
              background:linear-gradient(135deg,#ff6b9d,#ff8fb8), width:100%,
              font-size:13px, font-weight:600 */}
          <button
            onClick={() => navigate('/products')}
            className="mt-[15px] w-full py-[9px] px-[16px] bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[20px] border-none cursor-pointer text-[13px] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,157,0.45)] hover:from-[#e8527f] hover:to-[#ff6b9d] block"
          >
            Shop Now
          </button>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img
            src={`${base}images/models.jpeg`}
            alt="Model"
            className="w-full max-w-[420px] h-[420px] object-contain rounded-[25px] contrast-105 brightness-105"
          />
        </div>
      </section>

      {/* ── PROMO BANNER ── */}
      <div className="flex flex-wrap justify-center bg-gradient-to-r from-[#ff6b9d] to-[#ff8fb8] px-5 py-[14px]">
        {['🚚 Free Delivery on orders above 2000', '💄 100% Original Products', '✨ New arrivals every week', '🎁 Free gift with every order above 10,000'].map((item, i, arr) => (
          <div key={i} className={`text-white text-[13px] font-medium px-6 py-1 ${i < arr.length - 1 ? 'border-r border-white/30' : ''}`}>
            {item}
          </div>
        ))}
      </div>

      {/* ── PRODUCTS SECTION ──
          Screenshot: centered title, filter pills, 3-column grid of white cards
          Cards: white bg, rounded corners, product image top (object-contain),
          bold product name, price, full-width pink "Add to Cart" button
          Empty space on both sides of the grid
      */}
      <div className="max-w-[900px] mx-auto px-5 pb-10">
        <h2 className="text-center mt-[60px] mb-5 text-[22px] font-semibold text-[#1f1f1f] dark:text-[#f5e6ea]">Our Products</h2>

        {/* FILTER BUTTONS — screenshot: "All" filled pink, others outlined */}
        <div className="flex flex-wrap justify-center gap-[10px] my-5">
          {[
            ['all',        'All'],
            ['bestseller', '⭐ Best Sellers'],
            ['new',        '✨ New Arrivals'],
            ['featured',   '💄 Featured'],
          ].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`px-5 py-[8px] rounded-[25px] text-[13px] font-semibold border-2 cursor-pointer w-auto mt-0 transition-all
                ${filter === val
                  ? 'bg-[#ff6b9d] text-white border-[#ff6b9d]'
                  : 'bg-white dark:bg-[#2a1020] text-[#ff6b9d] border-[#ff6b9d] hover:bg-[#ff6b9d] hover:text-white'
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* PRODUCT CARDS — screenshot: 3 columns, white cards, image centered,
            name bold centered, price centered, pink full-width button at bottom
            Cards have visible border and rounded corners, equal spacing */}
        <div className="grid grid-cols-3 gap-[20px] my-5 max-md:grid-cols-2 max-sm:grid-cols-1">
          {filtered.map((p, i) => {
            const isAdded = addedIdx === i;
            return (
              <div
                key={i}
                className="flex flex-col bg-white dark:bg-[#2a1020] rounded-[16px] p-[16px] text-center border border-[#f0d0d8] dark:border-[#4a2030] shadow-[0_2px_12px_rgba(255,107,157,0.08)] transition-all hover:shadow-[0_8px_24px_rgba(255,107,157,0.2)] hover:border-[#ff6b9d]"
              >
                {/* Image area — white bg, object-contain, fixed height */}
                <div className="w-full h-[180px] flex items-center justify-center bg-white dark:bg-[#3a1828] rounded-[10px] mb-3">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="max-h-[160px] max-w-full object-contain"
                  />
                </div>
                <h3 className="text-[16px] font-bold m-0 mt-1 text-[#1f1f1f] dark:text-[#f5e6ea]">{p.name}</h3>
                <p className="text-[14px] text-[#666] dark:text-[#d4b8c0] m-0 mt-2 mb-3">Rs. {p.price}</p>
                <button
                  onClick={() => handleAddToCart(p.name, p.price, i)}
                  disabled={isAdded}
                  className={`px-4 py-[10px] rounded-[25px] text-white font-semibold text-[13px] border-none cursor-pointer w-full transition-all mt-auto
                    ${isAdded
                      ? 'bg-[#c2185b] dark:bg-[#c2185b]'
                      : 'bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] hover:from-[#e8527f] hover:to-[#ff6b9d] hover:shadow-[0_4px_12px_rgba(255,107,157,0.4)]'
                    }`}
                >
                  {isAdded ? '✓ Added!' : 'Add to Cart'}
                </button>
              </div>
            );
          })}
        </div>

        {/* VIEW ALL BUTTON */}
        <div className="flex justify-center my-5">
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-[10px] rounded-[20px] text-[13px] font-semibold bg-[#ff6b9d] text-white border-none cursor-pointer w-auto mt-0 transition-all hover:bg-[#e8527f] hover:shadow-[0_4px_12px_rgba(255,107,157,0.4)]"
          >
            View All Products →
          </button>
        </div>
      </div>

      {/* ── CUSTOMER REVIEWS ── */}
      <h2 className="text-center mt-[60px] mb-5 text-[22px] font-semibold text-[#1f1f1f] dark:text-[#f5e6ea]">What Our Customers Say 💕</h2>
      <div className="flex flex-wrap justify-center gap-5 px-[40px] mt-5 mb-[60px]">
        {[
          { stars: '★★★★★', text: '"Absolutely love the Matte Lipstick! The color stays all day and feels so smooth. Will definitely order again!"', author: '— Ayesha K.' },
          { stars: '★★★★★', text: '"The Vitamin C Serum is amazing. My skin looks so bright and glowing after just 2 weeks of use. Highly recommend!"', author: '— Sana M.' },
          { stars: '★★★★☆', text: '"Fast delivery and beautiful packaging. The Eyeshadow Palette has such gorgeous shades. E-commerce Cosmetics Store never disappoints!"', author: '— Fatima R.' },
        ].map((r, i) => (
          <div key={i} className="flex flex-col bg-white dark:bg-[#2a1020] rounded-[18px] p-6 w-[280px] shadow-[0_4px_18px_rgba(255,107,157,0.1)] border border-[#ffe0ee] dark:border-[#4a2030] gap-2.5 transition-all hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(255,107,157,0.25)]">
            <div className="text-[#ff6b9d] text-[18px] tracking-[2px]">{r.stars}</div>
            <p className="text-[13px] leading-[1.7] text-[#444] dark:text-[#d4b8c0] italic m-0">{r.text}</p>
            <div className="text-[13px] font-semibold text-[#ff6b9d]">{r.author}</div>
          </div>
        ))}
      </div>

      {/* ── NEWSLETTER ──
          CSS: .newsletter { padding:60px 20px; background:linear-gradient(135deg,#ffe0ee,#ffd6e8); text-align:center }
               .newsletter input { padding:12px; width:250px; border:none; border-radius:10px; font-size:14px }
               button (global): padding:9px 16px; border-radius:20px; gradient; width:100%; font-size:13px
      */}
      <div className="text-center py-[60px] px-[20px] mt-[60px] bg-gradient-to-br from-[#ffe0ee] to-[#ffd6e8] dark:from-[#2a1020] dark:to-[#1a0a10]">
        <h2 className="text-[24px] font-semibold text-[#1f1f1f] dark:text-[#f5e6ea] mb-0">
          Subscribe to E-commerce Cosmetics Store
        </h2>
        {/* input: width:250px, padding:12px, border:none, border-radius:10px */}
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mt-4 block mx-auto px-3 py-[12px] w-[250px] bg-white border-none rounded-[10px] font-[Poppins,sans-serif] text-[14px] outline-none dark:bg-[#3a1828] dark:text-[#f5e6ea]"
        />
        <br />
        {/* button: same global style — padding:9px 16px, border-radius:20px, gradient, width:100%, font-size:13px */}
        <button
          onClick={() => {
            const error = validateSubscription(email);
            if (error) { alert(error); return; }
            alert('💕 Thank you for subscribing to E-commerce Cosmetics Store!');
            setEmail('');
          }}
          className="mt-0 w-full py-[9px] px-[16px] bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[20px] border-none cursor-pointer text-[13px] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,157,0.45)] hover:from-[#e8527f] hover:to-[#ff6b9d] block"
        >
          Subscribe
        </button>
      </div>

      {/* ── FOOTER ── */}
      <footer className="bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white pt-10 pb-5 px-5 mt-0 text-center">
        <div className="flex flex-wrap justify-between gap-[30px] max-w-[1100px] mx-auto mb-5 text-left">
          <div className="flex-1 min-w-[160px]">
            <h2 className="text-white text-base font-semibold mb-3">E-commerce Cosmetics Store</h2>
            <p className="text-[#ffd6e0] text-[13px]">Beauty that speaks for you. Premium cosmetics crafted with love.</p>
          </div>
          <div className="flex-1 min-w-[160px]">
            <h3 className="text-white text-sm font-semibold mb-2.5">Quick Links</h3>
            <Link to="/"         className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Home</Link>
            <Link to="/products" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Products</Link>
            <Link to="/cart"     className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Cart</Link>
          </div>
          <div className="flex-1 min-w-[160px]">
            <h3 className="text-white text-sm font-semibold mb-2.5">Support</h3>
            <Link to="/contact"   className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Contact Us</Link>
            <Link to="/login"     className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Login</Link>
            <Link to="/dashboard" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Dashboard</Link>
          </div>
        </div>
        <p className="text-[#ffd6e0] text-[13px]">© 2026 E-commerce Cosmetics Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
