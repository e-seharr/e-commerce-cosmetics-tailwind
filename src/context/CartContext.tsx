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
