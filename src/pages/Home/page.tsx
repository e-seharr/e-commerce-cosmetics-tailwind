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
    <>
      <Navbar />

      {/* HERO */}
      <section className="flex items-center justify-between px-20 py-[70px] gap-10 bg-gradient-to-br from-[#ffe0ee] via-[#fff5f9] to-white flex-col md:flex-row">
        <div className="flex-1">
          <h1 className="text-[44px] font-bold m-0 text-[#1f1f1f]">Beauty That Speaks For You</h1>
          <p className="mt-[15px] max-w-[420px] text-[14px] text-[#444] leading-relaxed mb-0">
            Your everyday beauty essentials made for you. Soft luxury cosmetics for glow, confidence, and elegance.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="mt-[15px] px-4 py-[9px] bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[20px] border-none cursor-pointer text-[13px] transition-all w-auto hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,157,0.45)]"
          >Shop Now</button>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <img
            src={`${base}images/models.jpeg`}
            alt="Model"
            className="w-full max-w-[420px] h-[420px] object-contain rounded-[25px]"
          />
        </div>
      </section>

      {/* PROMO BANNER */}
      <div className="flex flex-wrap justify-center bg-gradient-to-r from-[#ff6b9d] to-[#ff8fb8] px-5 py-[14px]">
        {['🚚 Free Delivery on orders above 2000','💄 100% Original Products','✨ New arrivals every week','🎁 Free gift with every order above 10,000'].map((item, i, arr) => (
          <div key={i} className={`text-white text-[13px] font-medium px-6 py-1 ${i < arr.length - 1 ? 'border-r border-white/30' : ''}`}>{item}</div>
        ))}
      </div>

      {/* PRODUCTS SECTION */}
      <div className="home-products-section">
        {/* Section Title — matches .section-title: text-center, mt-[60px], mb-5, text-[22px] */}
        <h2 className="text-center mt-[60px] mb-5 text-[22px] font-semibold text-[#1f1f1f]">Our Products</h2>

        {/* FILTER BUTTONS — matches .filter-bar */}
        <div className="flex flex-wrap justify-center gap-2.5 my-4">
          {[
            ['all',        'All'],
            ['bestseller', '⭐ Best Sellers'],
            ['new',        '✨ New Arrivals'],
            ['featured',   '💄 Featured'],
          ].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`px-5 py-[9px] rounded-[25px] text-[13px] font-semibold border-2 border-[#ff6b9d] cursor-pointer transition-all w-auto mt-0
                ${filter === val
                  ? 'bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white border-transparent'
                  : 'bg-white text-[#ff6b9d] hover:bg-gradient-to-br hover:from-[#ff6b9d] hover:to-[#ff8fb8] hover:text-white hover:border-transparent'
                }`}
            >{label}</button>
          ))}
        </div>

        {/* PRODUCT CARDS — matches .card-container + .card: 220px wide, 160px image, centered flex-wrap */}
        <div className="flex flex-wrap justify-center gap-5 px-10 my-5">
          {filtered.map((p, i) => {
            const isAdded = addedIdx === i;
            return (
              <div
                key={i}
                className="flex flex-col bg-white rounded-[18px] p-[14px] w-[220px] text-center shadow-[0_4px_18px_rgba(255,107,157,0.1)] border border-[#ffe0ee] gap-1 cursor-pointer transition-all hover:scale-[1.06] hover:shadow-[0_12px_28px_rgba(255,107,157,0.3)] hover:border-[#ff6b9d]"
              >
                {/* Image — matches .card img: 160px height, object-contain, padding */}
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-[160px] object-contain rounded-[10px] bg-white p-2 box-border border border-[#fff0f5] transition-transform hover:scale-[1.08]"
                />
                {/* Product name — matches h3: font-size 18px */}
                <h3 className="text-[18px] font-semibold m-0 mt-2 text-[#1f1f1f]">{p.name}</h3>
                {/* Price — matches p: font-size 14px, color #444 */}
                <p className="text-[14px] text-[#444] m-0 mt-1 mb-1">Rs. {p.price}</p>
                {/* Add to Cart button */}
                <button
                  onClick={() => handleAddToCart(p.name, p.price, i)}
                  disabled={isAdded}
                  className={`mt-2 px-4 py-[9px] rounded-[20px] text-white font-semibold text-[13px] border-none cursor-pointer w-full transition-all
                    ${isAdded
                      ? 'bg-gradient-to-br from-[#c2185b] to-[#e91e8c]'
                      : 'bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,157,0.45)]'
                    }`}
                >{isAdded ? '✓ Added!' : 'Add to Cart'}</button>
              </div>
            );
          })}
        </div>

        {/* VIEW ALL BUTTON */}
        <div className="flex justify-center my-5">
          <button
            onClick={() => navigate('/products')}
            className="px-5 py-[9px] rounded-[20px] text-[13px] font-semibold bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white border-none cursor-pointer w-auto mt-0 transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,157,0.45)]"
          >View All Products →</button>
        </div>
      </div>

      {/* CUSTOMER REVIEWS */}
      <h2 className="text-center mt-[60px] mb-5 text-[22px] font-semibold text-[#1f1f1f]">What Our Customers Say 💕</h2>
      <div className="flex flex-wrap justify-center gap-5 px-10 mt-5 mb-[60px]">
        {[
          { stars: '★★★★★', text: '"Absolutely love the Matte Lipstick! The color stays all day and feels so smooth. Will definitely order again!"', author: '— Ayesha K.' },
          { stars: '★★★★★', text: '"The Vitamin C Serum is amazing. My skin looks so bright and glowing after just 2 weeks of use. Highly recommend!"', author: '— Sana M.' },
          { stars: '★★★★☆', text: '"Fast delivery and beautiful packaging. The Eyeshadow Palette has such gorgeous shades. E-commerce Cosmetics Store never disappoints!"', author: '— Fatima R.' },
        ].map((r, i) => (
          <div key={i} className="flex flex-col bg-white rounded-[18px] p-6 w-[280px] shadow-[0_4px_18px_rgba(255,107,157,0.1)] border border-[#ffe0ee] gap-2.5 transition-all hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(255,107,157,0.25)]">
            {/* Stars — matches .review-stars: color #ff6b9d, font-size 18px, letter-spacing 2px */}
            <div className="text-[#ff6b9d] text-[18px] tracking-[2px]">{r.stars}</div>
            {/* Review text — matches .review-card p: 13px, italic, color #444 */}
            <p className="text-[13px] leading-[1.7] text-[#444] italic m-0">{r.text}</p>
            {/* Author — matches .review-author: 13px, font-weight 600, color brand-primary */}
            <div className="text-[13px] font-semibold text-[#ff6b9d]">{r.author}</div>
          </div>
        ))}
      </div>

      {/* NEWSLETTER — matches .newsletter: centered, gradient bg, input 250px */}
      <div className="text-center py-[60px] px-5 bg-gradient-to-br from-[#ffe0ee] to-[#ffd6e8] mt-[60px]">
        {/* Title — matches h2: 24px */}
        <h2 className="text-[24px] font-semibold text-[#1f1f1f] mb-6">Subscribe to E-commerce Cosmetics Store</h2>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="px-3 py-3 w-[250px] border-none rounded-[10px] font-[Poppins,sans-serif] text-[14px] outline-none block mx-auto mb-4"
        />
        <button
          onClick={() => {
            const error = validateSubscription(email);
            if (error) { alert(error); return; }
            alert('💕 Thank you for subscribing to E-commerce Cosmetics Store!');
            setEmail('');
          }}
          className="px-4 py-[9px] bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[20px] border-none cursor-pointer text-[13px] w-auto mt-0 transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,157,0.45)]"
        >Subscribe</button>
      </div>

      {/* FOOTER */}
      <footer className="bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white pt-10 pb-5 px-5 mt-[60px] text-center">
        <div className="flex flex-wrap justify-between gap-[30px] max-w-[1100px] mx-auto mb-5 text-left">
          <div className="flex-1 min-w-[160px]">
            <h2 className="text-white text-base font-semibold mb-3">E-commerce Cosmetics Store</h2>
            <p className="text-[#ffd6e0] text-[13px]">Beauty that speaks for you. Premium cosmetics crafted with love.</p>
          </div>
          <div className="flex-1 min-w-[160px]">
            <h3 className="text-white text-sm font-semibold mb-2.5">Quick Links</h3>
            <Link to="/"         className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white">Home</Link>
            <Link to="/products" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white">Products</Link>
            <Link to="/cart"     className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white">Cart</Link>
          </div>
          <div className="flex-1 min-w-[160px]">
            <h3 className="text-white text-sm font-semibold mb-2.5">Support</h3>
            <Link to="/contact"   className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white">Contact Us</Link>
            <Link to="/login"     className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white">Login</Link>
            <Link to="/dashboard" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white">Dashboard</Link>
          </div>
        </div>
        <p className="text-[#ffd6e0] text-[13px]">© 2026 E-commerce Cosmetics Store. All rights reserved.</p>
      </footer>
    </>
  );
}
export default Home;
