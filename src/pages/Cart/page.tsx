import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';
import { useCart } from '../../context/CartContext';
import { groupCart, calcDelivery } from '../../utils/cartUtils';

function Cart() {
  const { cart, addToCart, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((s, i) => s + i.price, 0);
  const delivery = calcDelivery(subtotal, cart.length);
  const grouped  = groupCart(cart);

  function changeQty(name: string, price: number, delta: number) {
    if (delta === 1) { addToCart(name, price); }
    else { const idx = cart.findIndex(i => i.name === name); if (idx > -1) removeItem(idx); }
  }

  function removeByName(name: string) {
    const indices: number[] = [];
    cart.forEach((item, i) => { if (item.name === name) indices.push(i); });
    for (let i = indices.length - 1; i >= 0; i--) removeItem(indices[i]);
  }

  return (
    <div className="m-0 font-[Poppins,sans-serif] bg-[#fff5f9] text-[#1f1f1f]">
      <Navbar />
      <div className="max-w-[1100px] mx-auto px-5 py-8">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-5 justify-center">
          <h2 className="text-[24px] font-semibold m-0 text-[#1f1f1f]">Your Cart</h2>
          <span className="bg-[#ffd6e8] text-[#ff6b9d] text-[12px] font-semibold px-3 py-1 rounded-[20px]">{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
        </div>

        {/* TABLE */}
        <div className="max-w-[860px] mx-auto mb-8">
          <div className="w-full overflow-x-auto mt-5">
            <table className="w-full border-collapse rounded-[15px] overflow-hidden text-[14px]">
              <thead className="bg-[#ff6b9d] text-white">
                <tr>
                  {['Product','Price','Qty','Subtotal','Action'].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-[13px]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(grouped).length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-5 text-[#888]">
                      <div className="flex flex-col items-center py-10 gap-3">
                        <div className="text-[48px]">🛒</div>
                        <p className="text-[#888] text-[15px] m-0">Your cart is empty</p>
                        <button onClick={() => navigate('/products')} className="w-auto px-7 py-2.5 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[20px] border-none cursor-pointer text-[13px] transition-all hover:-translate-y-0.5">Shop Now</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  Object.values(grouped).map((item, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-[#fff5f7]' : 'bg-[#ffe5ec]'} hover:bg-[#ffc2d1] cursor-pointer`}>
                      <td className="px-4 py-3 text-[#444] align-middle"><strong>{item.name}</strong></td>
                      <td className="px-4 py-3 text-[#444] align-middle">Rs. {item.price}</td>
                      <td className="px-4 py-3 text-[#444] align-middle">
                        <div className="flex items-center gap-2">
                          <button onClick={() => changeQty(item.name, item.price, -1)} className="w-7 h-7 p-0 rounded-full text-[16px] font-bold m-0 flex items-center justify-center bg-[#ffd6e8] text-[#ff6b9d] border border-[#ffd6e0] cursor-pointer transition-colors hover:bg-[#ff6b9d] hover:text-white">−</button>
                          <span className="font-semibold text-[15px] min-w-[20px] text-center">{item.qty}</span>
                          <button onClick={() => changeQty(item.name, item.price, 1)} className="w-7 h-7 p-0 rounded-full text-[16px] font-bold m-0 flex items-center justify-center bg-[#ffd6e8] text-[#ff6b9d] border border-[#ffd6e0] cursor-pointer transition-colors hover:bg-[#ff6b9d] hover:text-white">+</button>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#444] align-middle">Rs. {item.subtotal}</td>
                      <td className="px-4 py-3 text-[#444] align-middle">
                        <button onClick={() => removeByName(item.name)} className="bg-transparent border-none text-[18px] cursor-pointer px-2 py-1 rounded-md w-auto m-0 transition-colors hover:bg-[#ffe0ee]">🗑️</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="max-w-[500px] mx-auto mb-10 bg-white rounded-[20px] px-8 py-7 shadow-[0_8px_30px_rgba(255,107,157,0.15)] border border-[#ffe0ee]">
          <div className="flex justify-between text-[15px] text-[#444] mb-3"><span>Subtotal</span><span>Rs. {subtotal}</span></div>
          <div className="flex justify-between text-[15px] text-[#444] mb-3"><span>Delivery</span><span>{delivery === 0 && subtotal > 0 ? 'FREE 🚚' : `Rs. ${delivery}`}</span></div>
          <div className="border-t border-[#ffe0ee] my-4"></div>
          <div className="flex justify-between text-[18px] font-bold text-[#1f1f1f] mb-1.5"><span>Estimated Total</span><span>Rs. {subtotal + delivery}</span></div>
          <p className="text-[11px] text-[#888] mb-5">Taxes and discounts calculated at checkout</p>
          {subtotal >= 10000 && (
            <div className="bg-gradient-to-br from-[#fff0f5] to-[#ffe0ee] border border-[#ffd6e0] rounded-[10px] px-3.5 py-2.5 text-[13px] font-semibold text-[#ff6b9d] text-center mb-2.5">🎁 Yay! A free gift has been added to your order!</div>
          )}
          {subtotal > 0 && subtotal < 10000 && (
            <p className="text-[12px] text-[#ff6b9d] font-medium text-center mb-2 bg-[#fff0f5] px-3 py-2 rounded-[10px] border border-dashed border-[#ff8fb8]">Spend Rs. {10000 - subtotal} more for a FREE gift! 🎁</p>
          )}
          <button onClick={() => navigate('/checkout')} className="w-full mt-2.5 px-4 py-3.5 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[30px] border-none cursor-pointer text-[15px] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,157,0.45)]">Checkout</button>
          <button onClick={clearCart} className="w-full mt-1.5 px-4 py-2.5 bg-white text-[#ff6b9d] border-2 border-[#ff6b9d] font-semibold rounded-[20px] cursor-pointer text-[13px] transition-all hover:bg-gradient-to-br hover:from-[#ff6b9d] hover:to-[#ff8fb8] hover:text-white hover:border-transparent">Clear Cart</button>
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
            <Link to="/products" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Products</Link>
            <Link to="/checkout" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Checkout</Link>
          </div>
        </div>
        <p className="text-[#ffd6e0] text-[13px]">© 2026 E-commerce Cosmetics Store. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default Cart;
