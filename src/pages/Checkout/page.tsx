import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';
import { useCart } from '../../context/CartContext';
import { validateOrderForm, saveOrder } from '../../utils/orderUtils';
import { calcDelivery } from '../../utils/cartUtils';

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fname: '', phone: '', city: '', postal: '', address: '', shipping: '', payment: '' });

  const subtotal = cart.reduce((s, i) => s + i.price, 0);
  const delivery = calcDelivery(subtotal, cart.length);

  const h = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    const error = validateOrderForm(form);
    if (error) { alert(error); return; }
    saveOrder(form, cart, subtotal, delivery);
    clearCart();
    alert('🎉 Order placed successfully! Thank you for shopping with E-commerce Cosmetics Store.');
    navigate('/');
  }

  const inputCls = "w-full px-3 py-2.5 border border-[#ffd6e0] rounded-[6px] font-[Poppins,sans-serif] text-[14px] transition-all outline-none focus:border-[#ff6b8a] focus:shadow-[0_0_0_3px_rgba(255,77,109,0.12)] box-border";
  const labelCls = "block text-[13px] font-medium mb-1 text-[#444]";

  return (
    <div className="m-0 font-[Poppins,sans-serif] bg-[#fff5f9] text-[#1f1f1f]">
      <Navbar />
      <div className="flex gap-6 max-w-[1000px] mx-auto mt-10 px-5 flex-wrap">

        {/* BILLING FORM */}
        <div className="flex-[2] bg-white p-6 rounded-[15px] shadow-[0_4px_15px_rgba(0,0,0,0.08)] min-w-[280px]">
          <h2 className="text-[24px] font-semibold mb-4 text-[#1f1f1f]">Billing Details</h2>
          <form onSubmit={placeOrder}>
            <div className="mb-3.5"><label className={labelCls}>Full Name</label><input id="fname" type="text" value={form.fname} onChange={h} placeholder="Full Name" required className={inputCls} /></div>
            <div className="mb-3.5"><label className={labelCls}>Phone Number</label><input id="phone" type="tel" value={form.phone} onChange={h} placeholder="03xxxxxxxxx" required className={inputCls} /></div>
            <div className="mb-3.5"><label className={labelCls}>City</label><input id="city" type="text" value={form.city} onChange={h} placeholder="City" required className={inputCls} /></div>
            <div className="mb-3.5"><label className={labelCls}>Postal Code</label><input id="postal" type="text" value={form.postal} onChange={h} placeholder="Postal Code" required className={inputCls} /></div>
            <div className="mb-3.5"><label className={labelCls}>Full Address</label><textarea id="address" rows={3} value={form.address} onChange={h} placeholder="Full Address" required className={`${inputCls} resize-y`} /></div>
            <div className="mb-3.5">
              <label className={labelCls}>Shipping Method</label>
              <select id="shipping" value={form.shipping} onChange={h} required className={`${inputCls} cursor-pointer`}>
                <option value="">Select Shipping Method</option>
                <option>Standard Delivery (Rs 200)</option>
                <option>Express Delivery (Rs 400)</option>
              </select>
            </div>
            <div className="mb-3.5">
              <label className={labelCls}>Payment Method</label>
              <select id="payment" value={form.payment} onChange={h} required className={`${inputCls} cursor-pointer`}>
                <option value="">Select Payment Method</option>
                <option>Cash on Delivery</option>
                <option>JazzCash</option>
                <option>EasyPaisa</option>
                <option>Card</option>
              </select>
            </div>
            <button type="submit" className="w-full mt-2 px-4 py-2.5 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[20px] border-none cursor-pointer text-[13px] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,157,0.45)]">Place Order</button>
          </form>
        </div>

        {/* ORDER SUMMARY */}
        <div className="flex-1 bg-[#fff0f5] p-6 rounded-[15px] shadow-[0_4px_15px_rgba(0,0,0,0.08)] h-fit min-w-[220px]">
          <h3 className="text-[18px] font-semibold mb-3 text-[#1f1f1f]">Order Summary</h3>
          <div>
            {cart.length === 0
              ? <p className="text-[14px] text-[#444]">No items</p>
              : cart.map((item, i) => <p key={i} className="text-[14px] text-[#444] mb-2">{item.name} — Rs. {item.price}</p>)
            }
          </div>
          <p className="text-[14px] text-[#444] mb-2">Subtotal: Rs. {subtotal}</p>
          <p className="text-[14px] text-[#444] mb-2">Delivery: Rs. {delivery}</p>
          <h3 className="text-[18px] font-semibold text-[#1f1f1f]">Total: Rs. {subtotal + delivery}</h3>
        </div>
      </div>

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
          </div>
        </div>
        <p className="text-[#ffd6e0] text-[13px]">© 2026 E-commerce Cosmetics Store. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default Checkout;
