/* =========================================================
   CART UTILITIES
   Pure helper functions for cart calculations.
   ========================================================= */

export interface CartItem {
  name: string;
  price: number;
}

export interface GroupedCartItem {
  name: string;
  price: number;
  qty: number;
  subtotal: number;
}

/** Group flat cart array by product name, summing quantities and subtotals. */
export function groupCart(cart: CartItem[]): Record<string, GroupedCartItem> {
  const grouped: Record<string, GroupedCartItem> = {};
  cart.forEach(item => {
    if (grouped[item.name]) {
      grouped[item.name].qty++;
      grouped[item.name].subtotal += item.price;
    } else {
      grouped[item.name] = { name: item.name, price: item.price, qty: 1, subtotal: item.price };
    }
  });
  return grouped;
}

/** Calculate delivery fee: free above Rs. 2000, Rs. 200 otherwise (0 if cart is empty). */
export function calcDelivery(subtotal: number, cartLength: number): number {
  if (cartLength === 0) return 0;
  return subtotal >= 2000 ? 0 : 200;
}
