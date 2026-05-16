import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';
import { team } from '../../context/CartContext';

const values = [
  { icon: '◆', title: 'Premium Quality',   desc: 'We source only the finest cosmetics, tested and approved by beauty experts.' },
  { icon: '◆', title: 'Cruelty Free',       desc: 'All our products are cruelty-free and ethically sourced.' },
  { icon: '◆', title: 'Fast Delivery',      desc: 'We deliver across Pakistan with care and speed.' },
  { icon: '◆', title: 'Customer First',     desc: 'Your satisfaction is our top priority — always.' },
  { icon: '◆', title: 'Authentic Products', desc: '100% original products, no fakes, no compromises.' },
  { icon: '◆', title: 'Exclusive Deals',    desc: 'Regular offers, free gifts, and loyalty rewards for our customers.' },
];

function Teams() {
  return (
    <div className="min-h-screen font-[Poppins,sans-serif] bg-[#fff5f9] dark:bg-[#1a0a10] text-[#1f1f1f] dark:text-[#f5e6ea]">
      <Navbar />

      {/* HERO */}
      <div className="text-center py-[80px] px-5 bg-gradient-to-br from-[#ffe0ee] via-[#fff5f9] to-white dark:from-[#2a1020] dark:via-[#1a0a10] dark:to-[#1a0a10]">
        <p className="text-[12px] font-semibold tracking-[4px] uppercase text-[#ff6b9d] mb-4">The People Behind the Brand</p>
        <h1 className="text-[42px] font-bold text-[#1f1f1f] dark:text-[#f5e6ea] mb-4 mt-0 leading-tight">Meet Our Team</h1>
        <div className="w-16 h-[2px] bg-[#ff6b9d] mx-auto mb-5"></div>
        <p className="text-[15px] text-[#444] dark:text-[#d4b8c0] max-w-[560px] mx-auto leading-relaxed">
          A passionate team of beauty experts, strategists, and innovators dedicated to redefining cosmetics in Pakistan.
        </p>
      </div>

      <div className="max-w-[1100px] mx-auto px-5 py-12">

        {/* ABOUT SECTION */}
        <div className="grid md:grid-cols-2 gap-10 mb-16 items-center">
          <div>
            <p className="text-[12px] font-semibold tracking-[3px] uppercase text-[#ff6b9d] mb-3">Our Story</p>
            <h2 className="text-[30px] font-bold text-[#1f1f1f] dark:text-[#f5e6ea] mb-5 leading-tight">Beauty That Speaks For You</h2>
            <p className="text-[14px] text-[#444] dark:text-[#d4b8c0] leading-[1.9] mb-4">
              Founded in 2024 by Eman Sehar, E-commerce Cosmetics Store was born from a simple idea — every person deserves access to premium beauty products without breaking the bank. We started as a small online store and have grown into one of Pakistan's most trusted cosmetics destinations.
            </p>
            <p className="text-[14px] text-[#444] dark:text-[#d4b8c0] leading-[1.9]">
              Our collection spans makeup, skincare, haircare, and nailcare — carefully curated by our team of beauty experts. We believe beauty is for everyone, and our diverse range reflects that belief.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#ff6b9d] to-[#ffd6e8] dark:from-[#3a1828] dark:to-[#2a1020] rounded-[24px] p-10 text-center">
            <p className="text-[48px] font-bold text-white mb-2">2024</p>
            <p className="text-white/80 text-[14px] mb-6">Year Founded</p>
            <div className="grid grid-cols-2 gap-4">
              {[['1K+','Happy Customers'],['50+','Products'],['9','Team Members'],['4.8★','Avg Rating']].map(([n,l]) => (
                <div key={l} className="bg-white/20 rounded-[12px] p-3">
                  <p className="text-white font-bold text-[20px] m-0">{n}</p>
                  <p className="text-white/80 text-[11px] m-0">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OUR VALUES */}
        <div className="mb-16">
          <p className="text-[12px] font-semibold tracking-[3px] uppercase text-[#ff6b9d] mb-2 text-center">What We Stand For</p>
          <h2 className="text-[28px] font-bold mb-8 text-[#1f1f1f] dark:text-[#f5e6ea] text-center">Our Values</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {values.map(({ title, desc }) => (
              <div key={title} className="bg-white dark:bg-[#2a1020] rounded-[16px] px-6 py-6 shadow-[0_4px_18px_rgba(255,107,157,0.08)] border border-[#ffe0ee] dark:border-[#4a2030] transition-all hover:-translate-y-1 hover:shadow-[0_10px_26px_rgba(255,107,157,0.22)]">
                <div className="w-8 h-[2px] bg-[#ff6b9d] mb-4"></div>
                <h3 className="text-[14px] font-bold mb-2 text-[#1f1f1f] dark:text-[#f5e6ea] uppercase tracking-wide">{title}</h3>
                <p className="text-[12px] text-[#888] dark:text-[#9a7a85] m-0 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TEAM SECTION */}
        <div className="mb-16">
          <p className="text-[11px] font-semibold tracking-[4px] uppercase text-[#ff6b9d] mb-2 text-center">The People</p>
          <h2 className="text-[26px] font-bold mb-10 text-[#1f1f1f] dark:text-[#f5e6ea] text-center">Leadership Team</h2>

          {/* FOUNDER — elegant centered spotlight card */}
          <div className="flex justify-center mb-10">
            <div className="relative bg-white dark:bg-[#2a1020] rounded-[20px] px-10 py-8 border border-[#ffd6e8] dark:border-[#4a2030] shadow-[0_4px_30px_rgba(255,107,157,0.12)] max-w-[520px] w-full text-center overflow-hidden">
              {/* Subtle top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#ff6b9d] to-[#ff8fb8]"></div>
              {/* Avatar */}
              <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] flex items-center justify-center mx-auto mb-4 shadow-[0_4px_16px_rgba(255,107,157,0.35)]">
                <span className="text-[22px] font-extrabold text-white">ES</span>
              </div>
              <span className="inline-block text-[9px] font-bold tracking-[3px] uppercase text-[#ff6b9d] bg-[#fff0f5] dark:bg-[#3a1828] px-3 py-1 rounded-full mb-2">Founder & CEO</span>
              <h3 className="text-[20px] font-bold text-[#1f1f1f] dark:text-[#f5e6ea] m-0 mb-2">Eman Sehar</h3>
              <p className="text-[12px] text-[#777] dark:text-[#d4b8c0] leading-relaxed m-0 max-w-[360px] mx-auto">
                Founded E-commerce Cosmetics Store in 2024. Leads brand strategy, vision, and overall business direction.
              </p>
            </div>
          </div>

          {/* TEAM GRID — compact 4-column cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {team.filter(m => !m.founder).map(({ name, role, initials, bio }) => (
              <div key={name} className="bg-white dark:bg-[#2a1020] rounded-[14px] p-4 border border-[#ffe0ee] dark:border-[#4a2030] shadow-[0_2px_12px_rgba(255,107,157,0.06)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,107,157,0.15)] hover:border-[#ffd6e8] text-center">
                <div className="w-[48px] h-[48px] rounded-full bg-gradient-to-br from-[#ffd6e8] to-[#fff0f5] dark:from-[#4a2030] dark:to-[#3a1828] flex items-center justify-center mx-auto mb-3">
                  <span className="text-[14px] font-extrabold text-[#ff6b9d]">{initials}</span>
                </div>
                <h3 className="text-[13px] font-bold m-0 text-[#1f1f1f] dark:text-[#f5e6ea]">{name}</h3>
                <p className="text-[9px] font-semibold text-[#ff6b9d] uppercase tracking-[1.5px] mt-1 mb-2">{role}</p>
                <p className="text-[11px] text-[#777] dark:text-[#d4b8c0] leading-relaxed m-0">{bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-[#ff6b9d] via-[#ff8fb8] to-[#ffd6e8] rounded-[24px] p-14 mb-10">
          <p className="text-[12px] font-semibold tracking-[3px] uppercase text-white/70 mb-3">Join Us</p>
          <h2 className="text-[30px] font-bold text-white mb-4 mt-0">Be Part of Our Story</h2>
          <p className="text-white/85 text-[15px] mb-8 max-w-[480px] mx-auto">
            Shop, review, and connect with thousands of beauty lovers across Pakistan.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/products" className="px-8 py-3 bg-white text-[#ff6b9d] font-bold rounded-[4px] no-underline text-[13px] tracking-wide uppercase transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
              Shop Now
            </Link>
            <Link to="/contact" className="px-8 py-3 bg-transparent text-white font-bold rounded-[4px] no-underline text-[13px] tracking-wide uppercase border border-white transition-all hover:bg-white hover:text-[#ff6b9d]">
              Contact Us
            </Link>
          </div>
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
          <div className="flex-1 min-w-[160px]">
            <h3 className="text-white text-sm font-semibold mb-2.5">Company</h3>
            <Link to="/teams" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Our Team</Link>
            <Link to="/reviews" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Reviews</Link>
          </div>
        </div>
        <p className="text-[#ffd6e0] text-[13px]">© 2026 E-commerce Cosmetics Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Teams;
