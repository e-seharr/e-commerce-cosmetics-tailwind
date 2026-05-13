/* =========================================================
   ORDER UTILITIES
   Functions for saving and loading orders from localStorage.
   ========================================================= */

import type { CartItem } from './cartUtils';

export interface Order {
  id: string;
  customer: string;
  phone: string;
  city: string;
  address: string;
  payment: string;
  shipping: string;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  total: number;
  date: string;
  status: string;
  seen: boolean;
}

export interface OrderFormData {
  fname: string;
  phone: string;
  city: string;
  postal: string;
  address: string;
  shipping: string;
  payment: string;
}

/** Validate order form fields. Returns an error message string, or null if valid. */
export function validateOrderForm(form: OrderFormData): string | null {
  if (!form.fname || !form.phone || !form.city || !form.postal || !form.address || !form.shipping || !form.payment) {
    return 'Please fill all fields';
  }
  if (form.phone.length < 11) {
    return 'Invalid phone number — must be 11 digits';
  }
  return null;
}

/** Save a new order to localStorage and return the generated order ID. */
export function saveOrder(form: OrderFormData, cart: CartItem[], subtotal: number, delivery: number): string {
  const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
  const orderId = 'ORD-' + Date.now();
  orders.push({
    id:       orderId,
    customer: form.fname,
    phone:    form.phone,
    city:     form.city,
    address:  form.address,
    payment:  form.payment,
    shipping: form.shipping,
    items:    cart,
    subtotal,
    delivery,
    total:    subtotal + delivery,
    date:     new Date().toLocaleDateString(),
    status:   'New',
    seen:     false,
  });
  localStorage.setItem('orders', JSON.stringify(orders));
  return orderId;
}

/** Load all orders from localStorage. */
export function loadOrders(): Order[] {
  return JSON.parse(localStorage.getItem('orders') || '[]');
}
