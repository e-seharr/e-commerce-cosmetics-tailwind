import { createContext, useContext, useState, useEffect } from 'react';

interface CartItem { name: string; price: number; }
interface CartContextType {
  cart: CartItem[];
  addToCart: (name: string, price: number) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() =>
    JSON.parse(localStorage.getItem('cart') || '[]')
  );
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)); }, [cart]);
  function addToCart(name: string, price: number) { setCart(prev => [...prev, { name, price }]); }
  function removeItem(index: number) { setCart(prev => prev.filter((_, i) => i !== index)); }
  function clearCart() { setCart([]); }
  return (
    <CartContext.Provider value={{ cart, addToCart, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() { return useContext(CartContext); }
export const team = [
  // Founder
  { name: 'Eman Sehar', role: 'Founder & CEO', initials: 'ES', bio: 'Founded E-commerce Cosmetics Store in 2024. Leads brand strategy, vision, and overall business direction.', founder: true },
  // Senior
  { name: 'Ayesha Malik', role: 'Head of Product', initials: 'AM', bio: 'Curates every product with 5+ years of beauty expertise to ensure the highest quality standards.', founder: false },
  { name: 'Amna Sehar', role: 'Marketing Manager', initials: 'AS', bio: 'Drives brand campaigns, social media strategy, and customer engagement across all platforms.', founder: false },
  { name: 'Omar Farooq', role: 'IT & Web Developer', initials: 'OF', bio: 'Builds and maintains the online store. Ensures a fast, secure, and seamless shopping experience.', founder: false },
  { name: 'Bilal Ahmed', role: 'Finance & Accounts', initials: 'BA', bio: 'Manages financial operations, vendor payments, and budgeting to keep the business running efficiently.', founder: false },
  { name: 'Fatima Khan', role: 'Customer Experience Lead', initials: 'FK', bio: 'Oversees customer support and ensures every order is handled with care and professionalism.', founder: false },
  { name: 'Hina Butt', role: 'Skincare Specialist', initials: 'HB', bio: 'Certified skincare consultant helping customers find the right routine for their skin type.', founder: false },
  { name: 'Kamran Malik', role: 'Supply Chain Manager', initials: 'KM', bio: 'Manages vendor relationships, product sourcing, and inventory to ensure stock availability.', founder: false },
  { name: 'Zain Ali', role: 'Digital Marketing Analyst', initials: 'ZA', bio: 'Handles SEO, paid ads, and analytics to grow our online presence and drive qualified traffic.', founder: false },
];
