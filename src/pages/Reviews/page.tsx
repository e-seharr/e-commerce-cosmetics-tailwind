import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';

interface Review {
  id: number;
  name: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

const initialReviews: Review[] = [
  { id: 1, name: 'Ayesha K.',   product: 'Matte Lipstick',    rating: 5, comment: '"Absolutely love the Matte Lipstick! The color stays all day and feels so smooth. Will definitely order again!"',                                                    date: 'Jan 12, 2026', avatar: '👩' },
  { id: 2, name: 'Sana M.',     product: 'Vitamin C Serum',   rating: 5, comment: '"The Vitamin C Serum is amazing. My skin looks so bright and glowing after just 2 weeks of use. Highly recommend!"',                                                   date: 'Feb 3, 2026',  avatar: '👩‍🦱' },
  { id: 3, name: 'Fatima R.',   product: 'Eyeshadow Palette', rating: 4, comment: '"Fast delivery and beautiful packaging. The Eyeshadow Palette has such gorgeous shades. E-commerce Cosmetics Store never disappoints!"',                               date: 'Feb 18, 2026', avatar: '👩‍🦰' },
  { id: 4, name: 'Zara T.',     product: 'Moisturizer',       rating: 5, comment: '"This moisturizer is a game changer! My skin feels so soft and hydrated. I use it every morning and night. Absolutely love it!"',                                      date: 'Mar 5, 2026',  avatar: '🧕' },
  { id: 5, name: 'Hina B.',     product: 'Liquid Foundation', rating: 4, comment: '"Great coverage and blends beautifully. Lasts all day without looking cakey. Will definitely repurchase!"',                                                            date: 'Mar 22, 2026', avatar: '👩‍🦳' },
  { id: 6, name: 'Nadia S.',    product: 'Face Cleanser',     rating: 5, comment: '"My skin has never felt this clean! The face cleanser is gentle yet effective. No more breakouts since I started using it."',                                          date: 'Apr 1, 2026',  avatar: '👩' },
  { id: 7, name: 'Maham A.',    product: 'Blush Palette',     rating: 5, comment: '"The blush palette has the most beautiful shades. They are so pigmented and blend like a dream. Packaging is also super cute!"',                                       date: 'Apr 14, 2026', avatar: '👩‍🦱' },
  { id: 8, name: 'Rabia Q.',    product: 'Volume Mascara',    rating: 4, comment: '"This mascara gives amazing volume and length. My lashes look so full and dramatic. Great product for the price!"',                                                    date: 'Apr 28, 2026', avatar: '👩‍🦰' },
  { id: 9, name: 'Amna J.',     product: 'Nail Polish',       rating: 5, comment: '"The nail polish is so vibrant and long-lasting. It does not chip for at least a week. Love the wide range of colors available!"',                                    date: 'May 2, 2026',  avatar: '🧕' },
];

const products = ['All Products', 'Matte Lipstick', 'Vitamin C Serum', 'Eyeshadow Palette', 'Moisturizer', 'Liquid Foundation', 'Face Cleanser', 'Blush Palette', 'Volume Mascara', 'Nail Polish'];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="text-[#ff6b9d] text-[18px] tracking-[2px]">
      {[1,2,3,4,5].map(s => (
        <span key={s} className={s <= rating ? 'text-[#ff6b9d]' : 'text-[#ffd6e0]'}>★</span>
      ))}
    </div>
  );
}

function Reviews() {
  const [reviews, setReviews]       = useState<Review[]>(initialReviews);
  const [filterRating, setFilterRating] = useState(0);
  const [filterProduct, setFilterProduct] = useState('All Products');
  const [form, setForm] = useState({ name: '', product: products[1], rating: 5, comment: '' });
  const [submitted, setSubmitted]   = useState(false);

  const h = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.id]: e.target.id === 'rating' ? parseInt(e.target.value) : e.target.value });

  function submitReview(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) { alert('Please fill all fields'); return; }
    const newReview: Review = {
      id: Date.now(),
      name: form.name,
      product: form.product,
      rating: form.rating,
      comment: `"${form.comment}"`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      avatar: '👤',
    };
    setReviews(prev => [newReview, ...prev]);
    setForm({ name: '', product: products[1], rating: 5, comment: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  const filtered = reviews.filter(r => {
    if (filterRating > 0 && r.rating !== filterRating) return false;
    if (filterProduct !== 'All Products' && r.product !== filterProduct) return false;
    return true;
  });

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '0';
  const fiveStars = reviews.filter(r => r.rating === 5).length;

  const inputCls = "w-full px-3 py-2.5 border border-[#ffd6e0] rounded-[6px] font-[Poppins,sans-serif] text-[14px] outline-none focus:border-[#ff6b8a] focus:shadow-[0_0_0_3px_rgba(255,77,109,0.12)] box-border transition-all dark:bg-[#2a1020] dark:border-[#4a2030] dark:text-[#f5e6ea]";
  const labelCls = "block text-[13px] font-medium mb-1 text-[#444] dark:text-[#d4b8c0]";

  return (
    <div className="m-0 font-[Poppins,sans-serif] bg-[#fff5f9] dark:bg-[#1a0a10] text-[#1f1f1f] dark:text-[#f5e6ea] min-h-screen">
      <Navbar />

      {/* HERO */}
      <div className="text-center py-[60px] px-5 bg-gradient-to-br from-[#ffe0ee] via-[#fff5f9] to-white dark:from-[#2a1020] dark:via-[#1a0a10] dark:to-[#1a0a10]">
        <h1 className="text-[36px] font-bold text-[#ff6b9d] mb-3 mt-0">Customer Reviews 💕</h1>
        <p className="text-[15px] text-[#444] dark:text-[#d4b8c0] max-w-[520px] mx-auto">
          Real reviews from real customers. See what people are saying about our products.
        </p>
      </div>

      {/* STATS */}
      <div className="max-w-[1100px] mx-auto px-5 py-8">
        <div className="flex flex-wrap justify-center gap-5 mb-10">
          {[
            { icon: '⭐', num: avgRating, lbl: 'Average Rating' },
            { icon: '💬', num: reviews.length, lbl: 'Total Reviews' },
            { icon: '🌟', num: fiveStars, lbl: '5-Star Reviews' },
            { icon: '💄', num: products.length - 1, lbl: 'Products Reviewed' },
          ].map(({ icon, num, lbl }) => (
            <div key={lbl} className="flex-1 min-w-[140px] max-w-[200px] bg-white dark:bg-[#2a1020] rounded-[16px] px-[18px] py-[22px] text-center shadow-[0_4px_18px_rgba(255,107,157,0.1)] border border-[#ffe0ee] dark:border-[#4a2030] border-t-4 border-t-[#ff6b9d]">
              <div className="text-[28px] mb-2">{icon}</div>
              <p className="text-[26px] font-bold m-0 text-[#ff6b9d]">{num}</p>
              <p className="text-[12px] text-[#888] dark:text-[#9a7a85] mt-1 font-medium">{lbl}</p>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4 mb-8 items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-[13px] font-semibold text-[#444] dark:text-[#d4b8c0]">Filter by Rating:</span>
            {[0,5,4,3,2,1].map(r => (
              <button
                key={r}
                onClick={() => setFilterRating(r)}
                className={`px-4 py-1.5 rounded-[20px] text-[13px] font-semibold border-[1.5px] border-[#ff6b9d] cursor-pointer w-auto mt-0 transition-all
                  ${filterRating === r
                    ? 'bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white border-transparent'
                    : 'bg-white dark:bg-[#2a1020] text-[#ff6b9d] hover:bg-gradient-to-br hover:from-[#ff6b9d] hover:to-[#ff8fb8] hover:text-white hover:border-transparent'
                  }`}
              >
                {r === 0 ? 'All' : `${r}★`}
              </button>
            ))}
          </div>
          <select
            value={filterProduct}
            onChange={e => setFilterProduct(e.target.value)}
            className="px-4 py-2 rounded-[20px] border-[1.5px] border-[#ffd6e0] dark:border-[#4a2030] bg-white dark:bg-[#2a1020] text-[14px] text-[#1f1f1f] dark:text-[#f5e6ea] outline-none cursor-pointer font-[Poppins,sans-serif] w-auto"
          >
            {products.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {/* REVIEW CARDS */}
        <div className="flex flex-wrap justify-center gap-5 mb-12">
          {filtered.length === 0 ? (
            <p className="text-[#888] text-[15px] py-10">No reviews match your filter.</p>
          ) : filtered.map(r => (
            <div key={r.id} className="flex flex-col bg-white dark:bg-[#2a1020] rounded-[18px] p-6 w-[300px] shadow-[0_4px_18px_rgba(255,107,157,0.1)] border border-[#ffe0ee] dark:border-[#4a2030] gap-2.5 transition-all hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(255,107,157,0.25)]">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[32px]">{r.avatar}</span>
                <div>
                  <p className="text-[14px] font-semibold m-0 text-[#1f1f1f] dark:text-[#f5e6ea]">{r.name}</p>
                  <p className="text-[11px] text-[#888] dark:text-[#9a7a85] m-0">{r.date}</p>
                </div>
              </div>
              <StarRating rating={r.rating} />
              <span className="text-[11px] font-semibold text-[#ff6b9d] bg-[#fff0f5] dark:bg-[#3a1828] px-2.5 py-1 rounded-[20px] w-fit border border-[#ffd6e0] dark:border-[#4a2030]">
                {r.product}
              </span>
              <p className="text-[13px] leading-[1.7] text-[#444] dark:text-[#d4b8c0] italic m-0">{r.comment}</p>
            </div>
          ))}
        </div>

        {/* WRITE A REVIEW FORM */}
        <div className="max-w-[560px] mx-auto bg-white dark:bg-[#2a1020] rounded-[20px] p-8 shadow-[0_4px_20px_rgba(255,107,157,0.12)] border border-[#ffe0ee] dark:border-[#4a2030] mb-10">
          <h2 className="text-[22px] font-bold mb-1 text-[#1f1f1f] dark:text-[#f5e6ea]">Write a Review ✍️</h2>
          <p className="text-[13px] text-[#888] dark:text-[#9a7a85] mb-5">Share your experience with our products.</p>

          {submitted && (
            <div className="bg-gradient-to-br from-[#fff0f5] to-[#ffe0ee] border border-[#ffd6e0] rounded-[10px] px-4 py-3 text-[13px] font-semibold text-[#ff6b9d] text-center mb-4">
              🎉 Thank you for your review!
            </div>
          )}

          <form onSubmit={submitReview}>
            <div className="mb-3.5">
              <label htmlFor="name" className={labelCls}>Your Name</label>
              <input id="name" type="text" value={form.name} onChange={h} placeholder="Enter your name" required className={inputCls} />
            </div>
            <div className="mb-3.5">
              <label htmlFor="product" className={labelCls}>Product</label>
              <select id="product" value={form.product} onChange={h} className={`${inputCls} cursor-pointer`}>
                {products.slice(1).map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="mb-3.5">
              <label htmlFor="rating" className={labelCls}>Rating</label>
              <select id="rating" value={form.rating} onChange={h} className={`${inputCls} cursor-pointer`}>
                <option value={5}>⭐⭐⭐⭐⭐ — Excellent</option>
                <option value={4}>⭐⭐⭐⭐ — Very Good</option>
                <option value={3}>⭐⭐⭐ — Good</option>
                <option value={2}>⭐⭐ — Fair</option>
                <option value={1}>⭐ — Poor</option>
              </select>
            </div>
            <div className="mb-3.5">
              <label htmlFor="comment" className={labelCls}>Your Review</label>
              <textarea
                id="comment"
                rows={4}
                value={form.comment}
                onChange={h}
                placeholder="Write your review here..."
                required
                className={`${inputCls} resize-y`}
              />
            </div>
            <button
              type="submit"
              className="w-full mt-2 px-4 py-2.5 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[20px] border-none cursor-pointer text-[13px] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,157,0.45)]"
            >
              Submit Review 💌
            </button>
          </form>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white pt-10 pb-5 px-5 mt-16 text-center">
        <div className="flex flex-wrap justify-between gap-8 max-w-[1100px] mx-auto mb-5 text-left">
          <div className="flex-1 min-w-[160px]">
            <h2 className="text-white text-base font-semibold mb-3">E-commerce Cosmetics Store</h2>
            <p className="text-[#ffd6e0] text-[13px]">Beauty that speaks for you.</p>
          </div>
          <div className="flex-1 min-w-[160px]">
            <h3 className="text-white text-sm font-semibold mb-2.5">Quick Links</h3>
            <Link to="/" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Home</Link>
            <Link to="/products" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Products</Link>
            <Link to="/contact" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Contact</Link>
          </div>
        </div>
        <p className="text-[#ffd6e0] text-[13px]">© 2026 E-commerce Cosmetics Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Reviews;
