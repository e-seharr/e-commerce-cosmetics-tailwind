import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';
import { validateSignupForm, registerUser } from '../../utils/authUtils';

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const navigate = useNavigate();

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validateSignupForm(form.name, form.email, form.password, form.confirm);
    if (validationError) { alert(validationError); return; }
    const registerError = registerUser(form.name, form.email, form.password);
    if (registerError) { alert(registerError); return; }
    alert('🎉 Account created! Please login.');
    navigate('/login');
  }

  const h = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.id]: e.target.value });
  const inputCls = "w-full px-3 py-2.5 border border-[#ffd6e0] rounded-[6px] font-[Poppins,sans-serif] text-[14px] transition-all outline-none focus:border-[#ff6b8a] focus:shadow-[0_0_0_3px_rgba(255,77,109,0.12)] box-border";
  const labelCls = "block text-[13px] font-medium mb-1 text-[#444]";

  return (
    <div className="m-0 font-[Poppins,sans-serif] bg-[#fff5f9] text-[#1f1f1f]">
      <Navbar />

      <div className="max-w-[480px] mx-auto mt-10 bg-white p-8 rounded-[15px] shadow-[0_4px_20px_rgba(0,0,0,0.09)]">
        <h2 className="text-[24px] font-semibold mb-2 text-[#1f1f1f]">Create Account 💄</h2>
        <p className="text-[14px] text-[#444] mb-4">Join E-commerce Cosmetics Store and enjoy exclusive deals.</p>
        <form onSubmit={handleSignup}>
          <div className="mb-3.5"><label className={labelCls}>Full Name</label><input id="name" type="text" value={form.name} onChange={h} placeholder="Enter your full name" required className={inputCls} /></div>
          <div className="mb-3.5"><label className={labelCls}>Email Address</label><input id="email" type="email" value={form.email} onChange={h} placeholder="Enter your email" required className={inputCls} /></div>
          <div className="mb-3.5"><label className={labelCls}>Password</label><input id="password" type="password" value={form.password} onChange={h} placeholder="Min 6 characters" required className={inputCls} /></div>
          <div className="mb-3.5"><label className={labelCls}>Confirm Password</label><input id="confirm" type="password" value={form.confirm} onChange={h} placeholder="Confirm your password" required className={inputCls} /></div>
          <button type="submit" className="w-full mt-2 px-4 py-2.5 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[20px] border-none cursor-pointer text-[13px] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,157,0.45)]">Create Account</button>
        </form>
        <br />
        <p className="text-[14px] text-[#444]">Already have an account? <Link to="/login" className="text-[#ff6b9d] hover:underline">Login here</Link></p>
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
            <Link to="/login" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Login</Link>
          </div>
        </div>
        <p className="text-[#ffd6e0] text-[13px]">© 2026 E-commerce Cosmetics Store. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default Signup;
