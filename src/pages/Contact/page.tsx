import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';
import { validateContactForm } from '../../utils/contactUtils';

function Contact() {
  const [form, setForm] = useState({ cfname: '', clname: '', cemail: '', cmessage: '' });
  const h = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  function send(e: React.FormEvent) {
    e.preventDefault();
    const error = validateContactForm(form);
    if (error) { alert(error); return; }
    alert('✅ Message sent! We will get back to you soon.');
    setForm({ cfname: '', clname: '', cemail: '', cmessage: '' });
  }

  const inputCls = "w-full px-3 py-[10px] border border-[#ffd6e0] dark:border-[#4a2030] rounded-[6px] font-[Poppins,sans-serif] text-[14px] outline-none focus:border-[#ff6b8a] focus:shadow-[0_0_0_3px_rgba(255,77,109,0.12)] box-border transition-all bg-white dark:bg-[#3a1828] text-[#1f1f1f] dark:text-[#f5e6ea]";
  const labelCls = "block text-[13px] font-medium mb-1 text-[#444] dark:text-[#d4b8c0]";

  return (
    <div className="min-h-screen font-[Poppins,sans-serif] bg-[#fff5f9] dark:bg-[#1a0a10] text-[#1f1f1f] dark:text-[#f5e6ea]">
      <Navbar />

      <div className="flex gap-[60px] max-w-[1000px] mx-auto mt-[60px] mb-[60px] px-[30px] flex-wrap items-start">

        {/* LEFT */}
        <div className="flex-1 min-w-[260px]">
          <h1 className="text-[38px] font-bold text-[#ff6b9d] mb-[10px] mt-0">Get in Touch</h1>
          <p className="text-[#ff6b9d] font-semibold text-[15px] mb-3">I'd love to hear from you!</p>
          <p className="text-[14px] text-[#444] dark:text-[#d4b8c0] leading-relaxed mb-2">If you have any inquiries, feedback or just want to say hi — please use the contact form or reach us directly.</p>

          <div className="flex items-start gap-3 my-4">
            <span className="text-[22px] mt-0.5">📧</span>
            <div>
              <p className="text-[13px] text-[#444] dark:text-[#d4b8c0] my-0.5">escosmetics@gmail.com</p>
              <p className="text-[13px] text-[#444] dark:text-[#d4b8c0] my-0.5">support@escosmetics.pk</p>
            </div>
          </div>

          <div className="flex items-start gap-3 my-4">
            <span className="text-[22px] mt-0.5">📞</span>
            <div>
              <p className="text-[13px] text-[#444] dark:text-[#d4b8c0] my-0.5">+92 311 1234567</p>
              <p className="text-[13px] text-[#444] dark:text-[#d4b8c0] my-0.5">Mon – Sat, 10am – 7pm</p>
            </div>
          </div>

          <div className="flex items-start gap-3 my-4">
            <span className="text-[22px] mt-0.5">📍</span>
            <div>
              <p className="text-[13px] text-[#444] dark:text-[#d4b8c0] my-0.5">Shop 12, Beauty Plaza</p>
              <p className="text-[13px] text-[#444] dark:text-[#d4b8c0] my-0.5">Main Bazar, Gujrat, Pakistan</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-5">
            {[
              { href: 'javascript:void(0)', title: 'Like',      icon: '👍' },
              { href: 'javascript:void(0)', title: 'Instagram', icon: '📸' },
              { href: 'javascript:void(0)', title: 'WhatsApp',  icon: '💬' },
              { href: 'javascript:void(0)', title: 'TikTok',    icon: '🎵' },
              { href: 'mailto:escosmetics@gmail.com', title: 'Email', icon: '✉️' },
            ].map(s => (
              <a key={s.title} href={s.href} title={s.title}
                onClick={s.href === 'javascript:void(0)' ? e => e.preventDefault() : undefined}
                className="text-[20px] bg-[#fff0f5] dark:bg-[#3a1828] border border-[#ffd6e0] dark:border-[#4a2030] rounded-[12px] w-[46px] h-[46px] flex items-center justify-center no-underline text-[#ff6b9d] transition-all hover:-translate-y-[3px] hover:shadow-[0_6px_16px_rgba(255,107,157,0.3)]"
              >{s.icon}</a>
            ))}
          </div>
        </div>

        {/* RIGHT — FORM */}
        <div className="flex-1 min-w-[280px] bg-white dark:bg-[#2a1020] rounded-[18px] p-8 shadow-[0_4px_20px_rgba(255,107,157,0.1)] border border-[#ffe0ee] dark:border-[#4a2030]">
          <form onSubmit={send}>
            <div className="flex gap-4 mb-3.5">
              <div className="flex-1">
                <label className={labelCls}>First Name</label>
                <input id="cfname" type="text" value={form.cfname} onChange={h} placeholder="First name" required className={inputCls} />
              </div>
              <div className="flex-1">
                <label className={labelCls}>Last Name</label>
                <input id="clname" type="text" value={form.clname} onChange={h} placeholder="Last name" className={inputCls} />
              </div>
            </div>
            <div className="mb-3.5">
              <label className={labelCls}>Email *</label>
              <input id="cemail" type="email" value={form.cemail} onChange={h} placeholder="Your email" required className={inputCls} />
            </div>
            <div className="mb-3.5">
              <label className={labelCls}>Message</label>
              <textarea id="cmessage" rows={5} value={form.cmessage} onChange={h} placeholder="Write your message here..." required
                className="w-full px-3 py-[10px] border border-[#ffd6e0] dark:border-[#4a2030] rounded-[6px] font-[Poppins,sans-serif] text-[14px] resize-y outline-none focus:border-[#ff6b8a] focus:shadow-[0_0_0_3px_rgba(255,77,109,0.12)] box-border transition-all bg-white dark:bg-[#3a1828] text-[#1f1f1f] dark:text-[#f5e6ea]" />
            </div>
            <button type="submit"
              className="w-full mt-2 px-4 py-3 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[25px] border-none cursor-pointer text-[15px] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,157,0.45)]">
              Send Message 💌
            </button>
          </form>
        </div>
      </div>

      <footer className="bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white pt-10 pb-5 px-5 mt-[60px] text-center">
        <div className="flex flex-wrap justify-between gap-[30px] max-w-[1100px] mx-auto mb-5 text-left">
          <div className="flex-1 min-w-[160px]">
            <h2 className="text-white text-base font-semibold mb-3">E-commerce Cosmetics Store</h2>
            <p className="text-[#ffd6e0] text-[13px]">Beauty that speaks for you.</p>
          </div>
          <div className="flex-1 min-w-[160px]">
            <h3 className="text-white text-sm font-semibold mb-2.5">Pages</h3>
            <Link to="/" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Home</Link>
            <Link to="/products" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Products</Link>
            <Link to="/cart" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Cart</Link>
          </div>
        </div>
        <p className="text-[#ffd6e0] text-[13px]">© 2026 E-commerce Cosmetics Store. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default Contact;
