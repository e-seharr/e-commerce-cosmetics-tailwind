import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';

interface User { name: string; email: string; password: string; }
interface Order { id: string; customer: string; items: { name: string; price: number }[]; total: number; date: string; payment: string; seen: boolean; }

// Read user once — synchronously — no useEffect needed
const getUser = (): User | null => {
  const raw = localStorage.getItem('loggedIn');
  return raw ? JSON.parse(raw) : null;
};

function Profile() {
  const navigate = useNavigate();
  const [user, setUser]           = useState<User | null>(getUser);
  const [orders]                  = useState<Order[]>(() => JSON.parse(localStorage.getItem('orders') || '[]'));
  const [activeTab, setActiveTab] = useState<'info' | 'orders' | 'edit'>('info');
  const [editForm, setEditForm]   = useState(() => {
    const u = getUser();
    return { name: u?.name || '', email: u?.email || '', password: '', confirm: '' };
  });
  const [saved, setSaved] = useState(false);

  // If not logged in, show login prompt (no navigate — avoids redirect loop)
  if (!user) {
    return (
      <div className="min-h-screen font-[Poppins,sans-serif] bg-[#fff5f9] dark:bg-[#1a0a10] text-[#1f1f1f] dark:text-[#f5e6ea]">
        <Navbar />
        <div className="max-w-[440px] mx-auto mt-20 text-center px-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#ffd6e8] flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-[32px] font-bold">👤</span>
          </div>
          <h2 className="text-[24px] font-bold mb-2 text-[#1f1f1f] dark:text-[#f5e6ea]">Sign In to Continue</h2>
          <p className="text-[14px] text-[#888] dark:text-[#9a7a85] mb-8">Access your profile, orders, and exclusive member benefits.</p>
          <Link to="/login"
            className="inline-block px-10 py-3.5 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[25px] no-underline text-[14px] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,107,157,0.45)]">
            Sign In
          </Link>
          <p className="text-[13px] text-[#888] dark:text-[#9a7a85] mt-5">
            New here? <Link to="/signup" className="text-[#ff6b9d] hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    );
  }

  function handleLogout() {
    localStorage.removeItem('loggedIn');
    setUser(null);
    navigate('/login');
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editForm.name || !editForm.email) { alert('Name and email are required'); return; }
    if (editForm.password && editForm.password !== editForm.confirm) { alert('Passwords do not match'); return; }
    if (editForm.password && editForm.password.length < 6) { alert('Password must be at least 6 characters'); return; }
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(u => u.email === user!.email);
    const updated: User = { name: editForm.name, email: editForm.email, password: editForm.password || user!.password };
    if (idx > -1) { users[idx] = updated; localStorage.setItem('users', JSON.stringify(users)); }
    localStorage.setItem('loggedIn', JSON.stringify(updated));
    setUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const myOrders   = orders.filter(o => o.customer === user.name);
  const totalSpent = myOrders.reduce((s, o) => s + o.total, 0);
  const initials   = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const inputCls = "w-full px-4 py-3 border border-[#ffd6e0] dark:border-[#4a2030] rounded-[8px] font-[Poppins,sans-serif] text-[14px] outline-none focus:border-[#ff6b9d] focus:shadow-[0_0_0_3px_rgba(255,107,157,0.12)] box-border transition-all bg-white dark:bg-[#3a1828] text-[#1f1f1f] dark:text-[#f5e6ea]";
  const labelCls = "block text-[11px] font-semibold mb-1.5 text-[#888] dark:text-[#9a7a85] uppercase tracking-[1.5px]";
  const tabCls   = (t: string) =>
    `px-6 py-2.5 text-[13px] font-semibold border-b-2 transition-all cursor-pointer bg-transparent w-auto mt-0 rounded-none
    ${activeTab === t ? 'border-[#ff6b9d] text-[#ff6b9d]' : 'border-transparent text-[#888] dark:text-[#9a7a85] hover:text-[#ff6b9d]'}`;

  return (
    <div className="min-h-screen font-[Poppins,sans-serif] bg-[#fff5f9] dark:bg-[#1a0a10] text-[#1f1f1f] dark:text-[#f5e6ea]">
      <Navbar />

      {/* HERO BANNER */}
      <div className="bg-gradient-to-r from-[#1f1f1f] via-[#3a1828] to-[#ff6b9d] py-14 px-5 relative z-0">
        <div className="max-w-[900px] mx-auto flex items-center gap-8 flex-wrap">
          <div className="w-[90px] h-[90px] rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#ffd6e8] flex items-center justify-center shrink-0 shadow-[0_0_0_4px_rgba(255,255,255,0.2)]">
            <span className="text-[30px] font-bold text-white">{initials}</span>
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-white/60 m-0 mb-1">Member Account</p>
            <h1 className="text-[28px] font-bold text-white m-0 mb-1">{user.name}</h1>
            <p className="text-white/60 text-[13px] m-0">{user.email}</p>
          </div>
          <button onClick={handleLogout}
            className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-[25px] text-[13px] font-semibold cursor-pointer transition-all w-auto mt-0">
            Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-5 py-10">

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { num: myOrders.length,                                        lbl: 'Orders Placed'   },
            { num: `Rs. ${totalSpent.toLocaleString()}`,                   lbl: 'Total Spent'     },
            { num: myOrders.reduce((s, o) => s + o.items.length, 0),      lbl: 'Items Purchased' },
          ].map(({ num, lbl }) => (
            <div key={lbl} className="bg-white dark:bg-[#2a1020] rounded-[12px] px-5 py-6 text-center shadow-[0_2px_12px_rgba(255,107,157,0.08)] border border-[#ffe0ee] dark:border-[#4a2030]">
              <p className="text-[22px] font-bold m-0 text-[#ff6b9d]">{num}</p>
              <p className="text-[11px] text-[#888] dark:text-[#9a7a85] mt-1 m-0 uppercase tracking-[1px]">{lbl}</p>
            </div>
          ))}
        </div>

        {/* TAB BAR */}
        <div className="flex border-b border-[#ffe0ee] dark:border-[#4a2030] mb-8">
          <button className={tabCls('info')}   onClick={() => setActiveTab('info')}>My Info</button>
          <button className={tabCls('orders')} onClick={() => setActiveTab('orders')}>Order History</button>
          <button className={tabCls('edit')}   onClick={() => setActiveTab('edit')}>Edit Profile</button>
        </div>

        {/* INFO TAB */}
        {activeTab === 'info' && (
          <div className="bg-white dark:bg-[#2a1020] rounded-[16px] overflow-hidden shadow-[0_4px_18px_rgba(255,107,157,0.08)] border border-[#ffe0ee] dark:border-[#4a2030] mb-6">
            <div className="px-8 py-5 border-b border-[#ffe0ee] dark:border-[#4a2030]">
              <h2 className="text-[16px] font-bold text-[#1f1f1f] dark:text-[#f5e6ea] m-0 uppercase tracking-[1.5px]">Account Details</h2>
            </div>
            <div className="divide-y divide-[#ffe0ee] dark:divide-[#4a2030]">
              {[
                { label: 'Full Name',    value: user.name        },
                { label: 'Email',        value: user.email       },
                { label: 'Password',     value: '••••••••'       },
                { label: 'Member Since', value: 'May 2026'       },
                { label: 'Status',       value: 'Active Member'  },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between px-8 py-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-[#888] dark:text-[#9a7a85]">{label}</span>
                  <span className="text-[14px] font-medium text-[#1f1f1f] dark:text-[#f5e6ea]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="bg-white dark:bg-[#2a1020] rounded-[16px] overflow-hidden shadow-[0_4px_18px_rgba(255,107,157,0.08)] border border-[#ffe0ee] dark:border-[#4a2030] mb-6">
            <div className="px-8 py-5 border-b border-[#ffe0ee] dark:border-[#4a2030]">
              <h2 className="text-[16px] font-bold text-[#1f1f1f] dark:text-[#f5e6ea] m-0 uppercase tracking-[1.5px]">Order History</h2>
            </div>
            {myOrders.length === 0 ? (
              <div className="text-center py-16 px-5">
                <span className="text-[48px]">🛍️</span>
                <p className="text-[#888] dark:text-[#9a7a85] text-[14px] my-4">You haven't placed any orders yet.</p>
                <Link to="/products"
                  className="inline-block px-8 py-3 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[25px] no-underline text-[13px] transition-all hover:-translate-y-0.5">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse text-[13px]">
                  <thead>
                    <tr className="bg-[#fff5f9] dark:bg-[#3a1828]">
                      {['Order ID','Items','Total','Payment','Date','Status'].map(h => (
                        <th key={h} className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[1.5px] text-[#888] dark:text-[#9a7a85]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ffe0ee] dark:divide-[#4a2030]">
                    {myOrders.map((o, i) => (
                      <tr key={i} className="hover:bg-[#fff5f9] dark:hover:bg-[#3a1828] transition-colors">
                        <td className="px-6 py-4 text-[#888] dark:text-[#9a7a85] text-[11px] font-mono">{o.id}</td>
                        <td className="px-6 py-4 text-[#444] dark:text-[#d4b8c0] text-[12px]">{o.items.map(it => it.name).join(', ')}</td>
                        <td className="px-6 py-4 text-[#1f1f1f] dark:text-[#f5e6ea] font-semibold">Rs. {o.total}</td>
                        <td className="px-6 py-4 text-[#444] dark:text-[#d4b8c0]">{o.payment}</td>
                        <td className="px-6 py-4 text-[#444] dark:text-[#d4b8c0]">{o.date}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold ${o.seen ? 'bg-[#fff0f5] text-[#ff8fb8]' : 'bg-[#fff0f5] text-[#e8527f]'}`}>
                            {o.seen ? 'Delivered' : 'Processing'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* EDIT TAB */}
        {activeTab === 'edit' && (
          <div className="bg-white dark:bg-[#2a1020] rounded-[16px] overflow-hidden shadow-[0_4px_18px_rgba(255,107,157,0.08)] border border-[#ffe0ee] dark:border-[#4a2030] mb-6">
            <div className="px-8 py-5 border-b border-[#ffe0ee] dark:border-[#4a2030]">
              <h2 className="text-[16px] font-bold text-[#1f1f1f] dark:text-[#f5e6ea] m-0 uppercase tracking-[1.5px]">Edit Profile</h2>
            </div>
            <div className="px-8 py-8">
              {saved && (
                <div className="bg-[#fff0f5] border border-[#ffd6e0] rounded-[8px] px-5 py-3.5 text-[13px] font-semibold text-[#ff6b9d] mb-6">
                  ✅ Profile updated successfully.
                </div>
              )}
              <form onSubmit={handleSave} className="max-w-[480px] space-y-5">
                <div>
                  <label className={labelCls}>Full Name</label>
                  <input type="text" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} placeholder="Full name" required className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Email Address</label>
                  <input type="email" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} placeholder="Email" required className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>New Password <span className="normal-case tracking-normal font-normal">(leave blank to keep current)</span></label>
                  <input type="password" value={editForm.password} onChange={e => setEditForm({ ...editForm, password: e.target.value })} placeholder="New password" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Confirm Password</label>
                  <input type="password" value={editForm.confirm} onChange={e => setEditForm({ ...editForm, confirm: e.target.value })} placeholder="Confirm password" className={inputCls} />
                </div>
                <button type="submit"
                  className="w-full px-4 py-3.5 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[25px] border-none cursor-pointer text-[14px] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,107,157,0.45)]">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}

        {/* QUICK LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { to: '/products', label: '🛍️ Shop Now'    },
            { to: '/reviews',  label: '⭐ My Reviews'  },
            { to: '/contact',  label: '💬 Get Support' },
            { to: '/teams',    label: '👥 About Us'    },
          ].map(({ to, label }) => (
            <Link key={to} to={to}
              className="bg-white dark:bg-[#2a1020] border-2 border-[#ff6b9d] rounded-[14px] px-4 py-4 text-center no-underline text-[13px] font-semibold text-[#ff6b9d] hover:bg-gradient-to-br hover:from-[#ff6b9d] hover:to-[#ff8fb8] hover:text-white hover:border-transparent transition-all block">
              {label}
            </Link>
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
            <Link to="/"         className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Home</Link>
            <Link to="/products" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Products</Link>
            <Link to="/login"    className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Login</Link>
          </div>
        </div>
        <p className="text-[#ffd6e0] text-[13px]">© 2026 E-commerce Cosmetics Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Profile;
