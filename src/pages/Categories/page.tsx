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
    addToCart(name, price);
    setAdded(key);
    setTimeout(() => setAdded(null), 1800);
  }

  function CardItem({ name, price, img, section, idx }: { name: string; price: number; img: string; section: string; idx: number }) {
    const key = section + idx;
    const isAdded = added === key;
    return (
      <article className="flex flex-col bg-white dark:bg-[#2a1020] border border-[#ffe0ee] dark:border-[#4a2030] rounded-[18px] overflow-hidden shadow-[0_4px_18px_rgba(255,107,157,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(255,107,157,0.25)]">
        <img src={img} alt={name} className="w-full h-52 object-cover" />
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-[#1f1f1f] dark:text-[#f5e6ea] text-[16px] font-semibold mb-2">{name}</h3>
          <p className="text-[#444] dark:text-[#d4b8c0] mb-4 text-[14px]">Rs. {price}</p>
          <button
            onClick={() => handleAdd(name, price, key)}
            disabled={isAdded}
            className={`w-full rounded-[20px] px-4 py-2.5 text-[13px] font-semibold border-none cursor-pointer transition-all mt-auto
              ${isAdded ? 'bg-gradient-to-br from-[#c2185b] to-[#e91e8c] text-white' : 'bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,157,0.45)]'}`}
          >
            {isAdded ? '✓ Added!' : 'Add to Cart'}
          </button>
        </div>
      </article>
    );
  }

  function CategoryCard({ title, description, img, route, tags }: { title: string; description: string; img: string; route: string; tags: string[] }) {
    return (
      <div
        className="cursor-pointer overflow-hidden rounded-[20px] border border-[#ffe0ee] dark:border-[#4a2030] bg-white dark:bg-[#2a1020] shadow-[0_4px_20px_rgba(255,107,157,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(255,107,157,0.28)] hover:border-[#ff6b9d]"
        onClick={() => navigate(route)}
      >
        <img src={img} alt={title} className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105" />
        <div className="p-6">
          <h2 className="text-[#1f1f1f] dark:text-[#f5e6ea] text-[18px] font-bold mb-3">{title}</h2>
          <p className="text-[#444] dark:text-[#d4b8c0] text-[13px] mb-5">{description}</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {tags.map(tag => (
              <span key={tag} className="rounded-full border border-[#ffd6e0] dark:border-[#4a2030] bg-[#fff0f5] dark:bg-[#3a1828] px-3 py-1 text-[12px] text-[#ff6b9d]">
                {tag}
              </span>
            ))}
          </div>
          <button className="inline-flex items-center justify-center rounded-[20px] bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] px-4 py-2.5 text-[13px] font-semibold text-white border-none cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,157,0.45)]">
            Shop {title.split(' ')[0]} →
          </button>
        </div>
      </div>
    );
  }

  const sections = [
    {
      label: 'Makeup', emoji: '💄', route: '/products?cat=makeup',
      items: [
        { name: 'Matte Lipstick',    price: 1200, img: `${base}images/lipstick1.jpeg` },
        { name: 'Liquid Foundation', price: 2500, img: `${base}images/foundation.jpg` },
        { name: 'Volume Mascara',    price: 1800, img: `${base}images/maskara.jpeg` },
        { name: 'Eyeshadow Palette', price: 3500, img: `${base}images/palette.jpeg` },
      ],
    },
    {
      label: 'Skincare', emoji: '🧴', route: '/products?cat=skincare',
      items: [
        { name: 'Vitamin C Serum', price: 1200, img: `${base}images/vitamin c.jpeg` },
        { name: 'Moisturizer',     price: 2000, img: `${base}images/moisturizers.jpeg` },
        { name: 'Face Cleanser',   price: 1500, img: `${base}images/face cleanser.jpeg` },
      ],
    },
    {
      label: 'Haircare', emoji: '💆', route: '/products?cat=haircare',
      items: [
        { name: 'Shampoo',  price: 1200, img: `${base}images/shampoo.jpeg` },
        { name: 'Hair Oil', price: 700,  img: `${base}images/hair oil.jpeg` },
      ],
    },
    {
      label: 'Nailcare', emoji: '💅', route: '/products?cat=nailcare',
      items: [
        { name: 'Nail Polish', price: 700, img: `${base}images/nailpolish.jpeg` },
        { name: 'Nail Kit',    price: 900, img: `${base}images/nailkit.jpeg` },
      ],
    },
  ];

  return (
    <div className="min-h-screen font-[Poppins,sans-serif] bg-[#fff5f9] dark:bg-[#1a0a10] text-[#1f1f1f] dark:text-[#f5e6ea]">
      <Navbar />

      {/* HERO */}
      <div className="text-center py-[60px] px-5 bg-gradient-to-br from-[#ffe0ee] via-[#fff5f9] to-white dark:from-[#2a1020] dark:via-[#1a0a10] dark:to-[#1a0a10]">
        <h1 className="text-[36px] font-bold text-[#ff6b9d] mb-3 mt-0">Shop by Category</h1>
        <p className="text-[15px] text-[#444] dark:text-[#d4b8c0] max-w-[520px] mx-auto">
          Explore our full range of beauty products — from makeup to skincare, haircare and nailcare.
        </p>
      </div>

      {/* CATEGORY CARDS */}
      <div className="max-w-[1100px] mx-auto px-5 py-8">
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <CategoryCard title="Makeup"   description="Lipsticks, foundations, mascaras, eyeshadows, primers and more." img={`${base}images/lipstick1.jpeg`}  route="/products?cat=makeup"   tags={['👄 Lips','👁️ Eyes','✨ Face']} />
          <CategoryCard title="Skincare" description="Serums, moisturizers, cleansers and everything your skin needs to glow." img={`${base}images/vitamin c.jpeg`} route="/products?cat=skincare" tags={['✨ Face Care','🌿 All Skincare']} />
          <CategoryCard title="Haircare" description="Shampoos, hair oils and treatments for healthy, shiny hair." img={`${base}images/shampoo.jpeg`}    route="/products?cat=haircare" tags={['🧴 Shampoo','💧 Hair Oil']} />
          <CategoryCard title="Nailcare" description="Nail polishes, nail kits and everything for perfect nails." img={`${base}images/nailpolish.jpeg`} route="/products?cat=nailcare" tags={['💅 Nail Polish','🧰 Nail Kits']} />
        </div>

        {/* FEATURED PER CATEGORY */}
        <h2 className="text-[24px] font-bold mb-8 text-[#1f1f1f] dark:text-[#f5e6ea]">Featured from Each Category</h2>
        <div className="space-y-12">
          {sections.map(section => (
            <div key={section.label}>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-5">
                <h3 className="text-[20px] font-bold text-[#ff6b9d] border-l-4 border-[#ff6b9d] pl-3">{section.emoji} {section.label}</h3>
                <button onClick={() => navigate(section.route)}
                  className="inline-flex items-center justify-center rounded-[20px] bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] px-4 py-2.5 text-[13px] font-semibold text-white border-none cursor-pointer transition-all hover:-translate-y-0.5 w-auto mt-0">
                  View All {section.label} →
                </button>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {section.items.map((product, index) => (
                  <CardItem key={`${section.label}-${index}`} {...product} section={section.label.toLowerCase()} idx={index} />
                ))}
              </div>
            </div>
          ))}
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
            <h3 className="text-white text-sm font-semibold mb-2.5">Quick Links</h3>
            <Link to="/"           className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Home</Link>
            <Link to="/products"   className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Products</Link>
            <Link to="/cart"       className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Cart</Link>
            <Link to="/contact"    className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Contact</Link>
            <Link to="/dashboard"  className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Dashboard</Link>
          </div>
        </div>
        <p className="text-[#ffd6e0] text-[13px]">© 2026 E-commerce Cosmetics Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Categories;
