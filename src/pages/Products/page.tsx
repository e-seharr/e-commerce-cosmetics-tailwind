import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';
import { useCart } from '../../context/CartContext';

const base = import.meta.env.BASE_URL;
const allProducts = [
  { name: 'Matte Lipstick',      price: 1200, oldPrice: 1500, discount: '-20%', img: `${base}images/lipstick1.jpeg`,      category: 'makeup',   sub: 'lips',  sale: true  },
  { name: 'Liquid Foundation',   price: 2500, oldPrice: null,  discount: '',     img: `${base}images/foundation.jpg`,       category: 'makeup',   sub: 'face',  sale: false },
  { name: 'Volume Mascara',      price: 1800, oldPrice: 2000, discount: '-10%', img: `${base}images/maskara.jpeg`,         category: 'makeup',   sub: 'eyes',  sale: true  },
  { name: 'Blush Palette',       price: 1500, oldPrice: null,  discount: '',     img: `${base}images/blushes.jpeg`,         category: 'makeup',   sub: 'face',  sale: false },
  { name: 'Waterproof Eyeliner', price: 900,  oldPrice: null,  discount: '',     img: `${base}images/liner .jpeg`,          category: 'makeup',   sub: 'eyes',  sale: false },
  { name: 'Face Primer',         price: 2000, oldPrice: 2350, discount: '-15%', img: `${base}images/face primer1.jpeg`,    category: 'makeup',   sub: 'face',  sale: true  },
  { name: 'Concealer',           price: 1700, oldPrice: null,  discount: '',     img: `${base}images/conceelerr.jpeg`,      category: 'makeup',   sub: 'face',  sale: false },
  { name: 'Compact Powder',      price: 1400, oldPrice: null,  discount: '',     img: `${base}images/compact powder.jpeg`,  category: 'makeup',   sub: 'face',  sale: false },
  { name: 'Makeup Brush Set',    price: 3000, oldPrice: 4000, discount: '-25%', img: `${base}images/brushes.jpg.jpeg`,     category: 'makeup',   sub: 'face',  sale: true  },
  { name: 'Eyeshadow Palette',   price: 3500, oldPrice: null,  discount: '',     img: `${base}images/palette.jpeg`,         category: 'makeup',   sub: 'eyes',  sale: false },
  { name: 'Lip Gloss',           price: 900,  oldPrice: null,  discount: '',     img: `${base}images/gloss.jpeg`,           category: 'makeup',   sub: 'lips',  sale: false },
  { name: 'Face Cleanser',       price: 1500, oldPrice: null,  discount: '',     img: `${base}images/face cleanser.jpeg`,   category: 'skincare', sub: 'face',  sale: false },
  { name: 'Moisturizer',         price: 2000, oldPrice: 2200, discount: '-10%', img: `${base}images/moisturizers.jpeg`,    category: 'skincare', sub: 'face',  sale: true  },
  { name: 'Vitamin C Serum',     price: 1200, oldPrice: null,  discount: '',     img: `${base}images/vitamin c.jpeg`,       category: 'skincare', sub: 'face',  sale: false },
  { name: 'Shampoo',             price: 1200, oldPrice: null,  discount: '',     img: `${base}images/shampoo.jpeg`,         category: 'haircare', sub: 'hair',  sale: false },
  { name: 'Hair Oil',            price: 700,  oldPrice: null,  discount: '',     img: `${base}images/hair oil.jpeg`,        category: 'haircare', sub: 'hair',  sale: false },
  { name: 'Nail Polish',         price: 700,  oldPrice: null,  discount: '',     img: `${base}images/nailpolish.jpeg`,      category: 'nailcare', sub: 'nails', sale: false },
  { name: 'Nail Kit',            price: 900,  oldPrice: null,  discount: '',     img: `${base}images/nailkit.jpeg`,         category: 'nailcare', sub: 'nails', sale: false },
];

type AccKey = 'category' | 'makeup' | 'price' | 'discount' | '';

function Products() {
  const { addToCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const params  = new URLSearchParams(location.search);
  const initCat = params.get('cat') || 'all';
  const initSub = params.get('sub') || '';

  const [search,    setSearch]    = useState('');
  const [cat,       setCat]       = useState(initCat);
  const [sub,       setSub]       = useState(initSub);
  const [sort,      setSort]      = useState('default');
  const [minP,      setMinP]      = useState('');
  const [maxP,      setMaxP]      = useState('');
  const [saleOnly,  setSaleOnly]  = useState(false);
  const [activeTag, setActiveTag] = useState(initCat !== 'all' ? initCat.charAt(0).toUpperCase() + initCat.slice(1) : '');
  const [openAcc,   setOpenAcc]   = useState<AccKey>('');
  const [addedIdx,  setAddedIdx]  = useState<number | null>(null);

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const c = p.get('cat') || 'all';
    const s = p.get('sub') || '';
    setCat(c); setSub(s);
    setActiveTag(c !== 'all' ? c.charAt(0).toUpperCase() + c.slice(1) : '');
    if (c !== 'all') setOpenAcc('category');
  }, [location.search]);

  function toggleAcc(key: AccKey) { setOpenAcc(prev => prev === key ? '' : key); }

  function handleAddToCart(name: string, price: number, idx: number) {
    addToCart(name, price); setAddedIdx(idx);
    setTimeout(() => setAddedIdx(null), 1800);
  }

  function handleSetCat(c: string) {
    setCat(c); setSub(''); setSaleOnly(false);
    setActiveTag(c === 'all' ? '' : c.charAt(0).toUpperCase() + c.slice(1));
  }

  function handleSetSub(s: string) { setSub(s); setActiveTag(s.charAt(0).toUpperCase() + s.slice(1)); }

  function applyPrice() {
    const min = parseInt(minP) || 0;
    const max = parseInt(maxP) || 999999;
    setActiveTag('Rs.' + min + ' – Rs.' + (max === 999999 ? '∞' : max));
  }

  function clearAllFilters() {
    setCat('all'); setSub(''); setSearch(''); setMinP(''); setMaxP('');
    setSaleOnly(false); setActiveTag(''); setOpenAcc('');
  }

  function buyNow(name: string, price: number) {
    localStorage.setItem('cart', JSON.stringify([{ name, price }]));
    navigate('/checkout');
  }

  let filtered = allProducts.filter(p => {
    if (cat !== 'all' && p.category !== cat) return false;
    if (sub && p.sub !== sub) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (minP && p.price < parseInt(minP)) return false;
    if (maxP && p.price > parseInt(maxP)) return false;
    if (saleOnly && !p.sale) return false;
    return true;
  });
  if (sort === 'low')  filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'high') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'name') filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  const accBodyClass = (key: AccKey) =>
    `overflow-hidden transition-all duration-300 ${openAcc === key ? 'max-h-[300px]' : 'max-h-0'}`;

  return (
    <div className="min-h-screen font-[Poppins,sans-serif] bg-[#fff5f9] dark:bg-[#1a0a10] text-[#1f1f1f] dark:text-[#f5e6ea]">
      <Navbar />

      {/* TOPBAR */}
      <div className="flex justify-between items-center flex-wrap gap-3 max-w-[1200px] mx-auto mt-6 mb-2 px-5">
        <h2 className="text-[24px] font-semibold m-0 text-[#1f1f1f] dark:text-[#f5e6ea]">All Products 💄</h2>
        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="text"
            placeholder="🔍 Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-[220px] px-[18px] py-[11px] rounded-[30px] border-[1.5px] border-[#f0d0d8] dark:border-[#4a2030] bg-white dark:bg-[#2a1020] text-[#1f1f1f] dark:text-[#f5e6ea] text-[13px] shadow-[0_2px_10px_rgba(255,107,157,0.08)] outline-none focus:border-[#ff6b9d]"
          />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="w-auto min-w-[160px] px-5 py-[11px] pr-10 rounded-[30px] text-[14px] font-medium border-[1.5px] border-[#f0d0d8] dark:border-[#4a2030] bg-white dark:bg-[#2a1020] text-[#1f1f1f] dark:text-[#f5e6ea] shadow-[0_2px_10px_rgba(255,107,157,0.08)] cursor-pointer outline-none"
          >
            <option value="default">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* ACTIVE FILTER TAG */}
      <div className="flex flex-wrap gap-2 mx-3 my-2">
        {activeTag && (
          <div className="flex items-center gap-1.5 bg-white dark:bg-[#2a1020] border border-[#ffd6e0] dark:border-[#4a2030] rounded-[20px] px-3 py-1 text-[12px] text-[#444] dark:text-[#d4b8c0]">
            {activeTag}
            <button onClick={clearAllFilters} className="bg-transparent border-none text-[#888] text-sm p-0 m-0 w-auto cursor-pointer leading-none hover:text-[#ff6b9d]">✕</button>
          </div>
        )}
      </div>

      {/* SHOP LAYOUT */}
      <div className="flex gap-6 max-w-[1200px] mx-auto px-5 pb-10 items-start max-md:flex-col">

        {/* SIDEBAR */}
        <div className="w-[220px] min-w-[200px] bg-white dark:bg-[#2a1020] rounded-[15px] shadow-[0_4px_18px_rgba(255,107,157,0.1)] border border-[#ffe0ee] dark:border-[#4a2030] py-4 shrink-0 max-md:w-full">
          <h3 className="px-4 pb-3 text-[14px] font-bold uppercase tracking-[0.5px] text-[#1f1f1f] dark:text-[#f5e6ea] border-b border-[#ffe0ee] dark:border-[#4a2030] mb-0">Filter By</h3>

          {/* Category */}
          <div className="border-b border-[#ffe0ee] dark:border-[#4a2030]">
            <div onClick={() => toggleAcc('category')} className={`flex justify-between items-center px-4 py-3 cursor-pointer text-[14px] font-medium transition-colors select-none hover:bg-[#fff5f9] dark:hover:bg-[#3a1828] ${openAcc === 'category' ? 'text-[#ff6b9d] bg-[#fff5f9] dark:bg-[#3a1828]' : 'text-[#1f1f1f] dark:text-[#f5e6ea]'}`}>
              Category <span className="text-[16px] text-[#ff6b9d]">{openAcc === 'category' ? '−' : '+'}</span>
            </div>
            <div className={accBodyClass('category')}>
              {[['all','All Products'],['makeup','💄 Makeup'],['skincare','🧴 Skincare'],['haircare','💆 Haircare'],['nailcare','💅 Nailcare']].map(([val, label]) => (
                <a key={val} href="#" onClick={e => { e.preventDefault(); handleSetCat(val); }}
                  className={`block px-6 py-2 text-[13px] no-underline transition-colors rounded-md hover:text-[#ff6b9d] hover:bg-[#fff5f9] dark:hover:bg-[#3a1828] ${cat === val && !sub && !saleOnly ? 'text-[#ff6b9d] font-semibold' : 'text-[#444] dark:text-[#d4b8c0]'}`}>{label}</a>
              ))}
            </div>
          </div>

          {/* Makeup Type */}
          <div className="border-b border-[#ffe0ee] dark:border-[#4a2030]">
            <div onClick={() => toggleAcc('makeup')} className={`flex justify-between items-center px-4 py-3 cursor-pointer text-[14px] font-medium transition-colors select-none hover:bg-[#fff5f9] dark:hover:bg-[#3a1828] ${openAcc === 'makeup' ? 'text-[#ff6b9d] bg-[#fff5f9] dark:bg-[#3a1828]' : 'text-[#1f1f1f] dark:text-[#f5e6ea]'}`}>
              Makeup Type <span className="text-[16px] text-[#ff6b9d]">{openAcc === 'makeup' ? '−' : '+'}</span>
            </div>
            <div className={accBodyClass('makeup')}>
              {[['lips','👄 Lips'],['eyes','👁️ Eyes'],['face','✨ Face'],['nails','💅 Nails']].map(([val, label]) => (
                <a key={val} href="#" onClick={e => { e.preventDefault(); handleSetSub(val); }}
                  className={`block px-6 py-2 text-[13px] no-underline transition-colors rounded-md hover:text-[#ff6b9d] hover:bg-[#fff5f9] dark:hover:bg-[#3a1828] ${sub === val ? 'text-[#ff6b9d] font-semibold' : 'text-[#444] dark:text-[#d4b8c0]'}`}>{label}</a>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="border-b border-[#ffe0ee] dark:border-[#4a2030]">
            <div onClick={() => toggleAcc('price')} className={`flex justify-between items-center px-4 py-3 cursor-pointer text-[14px] font-medium transition-colors select-none hover:bg-[#fff5f9] dark:hover:bg-[#3a1828] ${openAcc === 'price' ? 'text-[#ff6b9d] bg-[#fff5f9] dark:bg-[#3a1828]' : 'text-[#1f1f1f] dark:text-[#f5e6ea]'}`}>
              Price Range <span className="text-[16px] text-[#ff6b9d]">{openAcc === 'price' ? '−' : '+'}</span>
            </div>
            <div className={accBodyClass('price')}>
              <div className="px-4 pb-3.5 pt-2.5 flex flex-col gap-2">
                <input type="number" placeholder="Min Rs." value={minP} onChange={e => setMinP(e.target.value)} className="w-full px-3 py-2.5 border border-[#ffd6e0] dark:border-[#4a2030] rounded-[6px] text-[14px] font-[Poppins,sans-serif] outline-none focus:border-[#ff6b8a] box-border bg-white dark:bg-[#2a1020] text-[#1f1f1f] dark:text-[#f5e6ea]" />
                <input type="number" placeholder="Max Rs." value={maxP} onChange={e => setMaxP(e.target.value)} className="w-full px-3 py-2.5 border border-[#ffd6e0] dark:border-[#4a2030] rounded-[6px] text-[14px] font-[Poppins,sans-serif] outline-none focus:border-[#ff6b8a] box-border bg-white dark:bg-[#2a1020] text-[#1f1f1f] dark:text-[#f5e6ea]" />
                <button onClick={applyPrice} className="w-full mt-0 px-4 py-2.5 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[20px] border-none cursor-pointer text-[13px] transition-all hover:-translate-y-0.5">See Results</button>
              </div>
            </div>
          </div>

          {/* Discount */}
          <div className="border-b border-[#ffe0ee] dark:border-[#4a2030]">
            <div onClick={() => toggleAcc('discount')} className={`flex justify-between items-center px-4 py-3 cursor-pointer text-[14px] font-medium transition-colors select-none hover:bg-[#fff5f9] dark:hover:bg-[#3a1828] ${openAcc === 'discount' ? 'text-[#ff6b9d] bg-[#fff5f9] dark:bg-[#3a1828]' : 'text-[#1f1f1f] dark:text-[#f5e6ea]'}`}>
              Discount <span className="text-[16px] text-[#ff6b9d]">{openAcc === 'discount' ? '−' : '+'}</span>
            </div>
            <div className={accBodyClass('discount')}>
              <a href="#" onClick={e => { e.preventDefault(); setSaleOnly(true); setActiveTag('On Sale'); }}
                className={`block px-6 py-2 text-[13px] no-underline transition-colors rounded-md hover:text-[#ff6b9d] hover:bg-[#fff5f9] dark:hover:bg-[#3a1828] ${saleOnly ? 'text-[#ff6b9d] font-semibold' : 'text-[#444] dark:text-[#d4b8c0]'}`}>🏷️ On Sale Only</a>
              <a href="#" onClick={e => { e.preventDefault(); handleSetCat('all'); }}
                className={`block px-6 py-2 text-[13px] no-underline transition-colors rounded-md hover:text-[#ff6b9d] hover:bg-[#fff5f9] dark:hover:bg-[#3a1828] ${!saleOnly && cat === 'all' ? 'text-[#ff6b9d] font-semibold' : 'text-[#444] dark:text-[#d4b8c0]'}`}>All Products</a>
            </div>
          </div>

          <div className="px-4 pb-3.5 pt-2.5">
            <button onClick={clearAllFilters} className="w-full mt-0 px-4 py-2.5 bg-white dark:bg-[#2a1020] text-[#ff6b9d] border-2 border-[#ff6b9d] font-semibold rounded-[20px] cursor-pointer text-[13px] transition-all hover:bg-gradient-to-br hover:from-[#ff6b9d] hover:to-[#ff8fb8] hover:text-white hover:border-transparent">Clear All Filters</button>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="flex-1">
          <div className="flex flex-wrap gap-4 justify-start max-md:justify-center">
            {filtered.map((p, i) => {
              const isAdded = addedIdx === i;
              return (
                <div key={i} className="flex flex-col bg-white dark:bg-[#2a1020] rounded-[14px] w-[280px] overflow-hidden shadow-[0_4px_18px_rgba(255,107,157,0.1)] border border-[#ffe0ee] dark:border-[#4a2030] cursor-pointer transition-all relative hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(255,107,157,0.3)] hover:border-[#ff6b9d]">
                  {p.sale && <span className="absolute top-2.5 right-2.5 bg-[#e8527f] text-white text-[12px] font-bold px-2.5 py-1 rounded-[20px] z-[2]">{p.discount}</span>}
                  <img src={p.img} alt={p.name} className="w-full h-[240px] object-contain bg-[#fff8fb] dark:bg-[#3a1828] p-3 box-border" />
                  <div className="px-4 pt-3.5 pb-4 flex flex-col gap-1.5">
                    <h3 className="text-[15px] font-semibold m-0 text-[#1f1f1f] dark:text-[#f5e6ea]">{p.name}</h3>
                    <div className="min-h-[44px] flex flex-col justify-end">
                      {p.oldPrice && <p className="line-through text-[#888] dark:text-[#9a7a85] text-[12px] m-0">Rs. {p.oldPrice}</p>}
                      <p className="text-[#ff6b9d] font-bold text-[16px] m-0">Rs. {p.price}</p>
                    </div>
                    <button
                      onClick={() => handleAddToCart(p.name, p.price, i)}
                      disabled={isAdded}
                      className={`mt-1 px-4 py-2.5 rounded-[20px] text-white font-semibold text-[13px] border-none cursor-pointer w-full transition-all
                        ${isAdded ? 'bg-gradient-to-br from-[#c2185b] to-[#e91e8c]' : 'bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,157,0.45)]'}`}
                    >{isAdded ? '✓ Added!' : 'Add to Cart'}</button>
                    <button
                      onClick={() => buyNow(p.name, p.price)}
                      className="mt-1.5 px-4 py-2.5 bg-white dark:bg-[#2a1020] text-[#ff6b9d] border-2 border-[#ff6b9d] font-semibold rounded-[20px] cursor-pointer text-[13px] w-full transition-all hover:bg-gradient-to-br hover:from-[#ff6b9d] hover:to-[#ff8fb8] hover:text-white hover:border-transparent"
                    >Buy Now</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white pt-10 pb-5 px-5 mt-16 text-center">
        <div className="flex flex-wrap justify-between gap-8 max-w-[1100px] mx-auto mb-5 text-left">
          <div className="flex-1 min-w-[160px]">
            <h2 className="text-white text-base font-semibold mb-3">E-commerce Cosmetics Store</h2>
            <p className="text-[#ffd6e0] text-[13px]">Premium beauty products for everyone.</p>
          </div>
          <div className="flex-1 min-w-[160px]">
            <h3 className="text-white text-sm font-semibold mb-2.5">Pages</h3>
            <Link to="/" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Home</Link>
            <Link to="/cart" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Cart</Link>
            <Link to="/checkout" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Checkout</Link>
          </div>
        </div>
        <p className="text-[#ffd6e0] text-[13px]">© 2026 E-commerce Cosmetics Store. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default Products;
