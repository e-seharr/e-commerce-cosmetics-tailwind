/* =========================================================
   STOCK UTILITIES
   Shared stock data and helpers used by Dashboard page.
   ========================================================= */

export interface StockItem {
  name: string;
  category: string;
  price: number;
  qty: number;
}

export const DEFAULT_STOCK: StockItem[] = [
  { name: 'Matte Lipstick',    category: 'Makeup',   price: 1200, qty: 50 },
  { name: 'Foundation',        category: 'Makeup',   price: 2500, qty: 30 },
  { name: 'Mascara',           category: 'Makeup',   price: 1800, qty: 40 },
  { name: 'Face Cleanser',     category: 'Skincare', price: 1500, qty: 25 },
  { name: 'Moisturizer',       category: 'Skincare', price: 2000, qty: 35 },
  { name: 'Vitamin C Serum',   category: 'Skincare', price: 1200, qty: 20 },
  { name: 'Shampoo',           category: 'Haircare', price: 1200, qty: 45 },
  { name: 'Hair Oil',          category: 'Haircare', price: 700,  qty: 60 },
  { name: 'Nail Polish',       category: 'Nailcare', price: 700,  qty: 80 },
  { name: 'Eyeshadow Palette', category: 'Makeup',   price: 3500, qty: 15 },
];

/** Load stock from localStorage, seeding defaults on first run. */
export function getDefaultStock(): StockItem[] {
  const saved = localStorage.getItem('stock');
  if (saved) return JSON.parse(saved);
  localStorage.setItem('stock', JSON.stringify(DEFAULT_STOCK));
  return DEFAULT_STOCK;
}

/** Save updated stock array to localStorage. */
export function saveStock(stock: StockItem[]): void {
  localStorage.setItem('stock', JSON.stringify(stock));
}
