import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';
import { loginUser } from '../../utils/authUtils';

function Login() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { alert('Please fill all fields'); return; }
    const user = loginUser(email, password);
    if (user) {
      alert('✅ Welcome back, ' + user.name + '!');
      navigate('/dashboard');
    } else {
      alert('❌ Invalid email or password');
    }
  }

  const inputCls = "w-full px-3 py-2.5 border border-[#ffd6e0] rounded-[6px] font-[Poppins,sans-serif] text-[14px] transition-all outline-none focus:border-[#ff6b8a] focus:shadow-[0_0_0_3px_rgba(255,77,109,0.12)] box-border";
  const labelCls = "block text-[13px] font-medium mb-1 text-[#444]";

  return (
    <div className="m-0 font-[Poppins,sans-serif] bg-[#fff5f9] text-[#1f1f1f]">
      <Navbar />

      <div className="max-w-[480px] mx-auto mt-10 bg-white p-8 rounded-[15px] shadow-[0_4px_20px_rgba(0,0,0,0.09)]">
        <h2 className="text-[24px] font-semibold mb-2 text-[#1f1f1f]">Login 🔐</h2>
        <p className="text-[14px] text-[#444] mb-4">Welcome back! Please sign in to your account.</p>
        <form onSubmit={handleLogin}>
          <div className="mb-3.5"><label className={labelCls}>Email Address</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required className={inputCls} /></div>
          <div className="mb-3.5"><label className={labelCls}>Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required className={inputCls} /></div>
          <button type="submit" className="w-full mt-2 px-4 py-2.5 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[20px] border-none cursor-pointer text-[13px] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,157,0.45)]">Sign In</button>
        </form>
        <br />
        <p className="text-[14px] text-[#444]">Don't have an account? <Link to="/signup" className="text-[#ff6b9d] hover:underline">Register here</Link></p>
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
            <Link to="/signup" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Register</Link>
          </div>
        </div>
        <p className="text-[#ffd6e0] text-[13px]">© 2026 E-commerce Cosmetics Store. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default Login;
