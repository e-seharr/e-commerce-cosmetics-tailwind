import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/page';
import { getDefaultStock, saveStock } from '../../utils/stockUtils';
import { drawChart, drawOrdersChart } from '../../utils/chartUtils';
import { loadOrders } from '../../utils/orderUtils';
import type { StockItem } from '../../utils/stockUtils';
import type { Order } from '../../utils/chartUtils';

interface LogEntry { msg: string; icon: string; time: string; }

function Dashboard() {
  const [activeTab, setActiveTab] = useState('stock');
  const [stock,     setStock]     = useState<StockItem[]>(getDefaultStock);
  const [orders,    setOrders]    = useState<Order[]>(() => loadOrders());
  const [log,       setLog]       = useState<LogEntry[]>(() => JSON.parse(localStorage.getItem('activityLog') || '[]'));
  const [form, setForm] = useState({ sname: '', scategory: '', sprice: '', sqty: '' });
  const stockChartRef  = useRef<HTMLCanvasElement>(null);
  const ordersChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => { setStock(getDefaultStock()); setOrders(loadOrders()); }, []);

  useEffect(() => {
    if (activeTab === 'orders')     setOrders(loadOrders());
    if (activeTab === 'log')        setLog(JSON.parse(localStorage.getItem('activityLog') || '[]'));
    if (activeTab === 'categories') setStock(getDefaultStock());
    if (activeTab === 'chart') {
      setTimeout(() => {
        const s = getDefaultStock(); const o = loadOrders();
        if (stockChartRef.current)  drawChart(s, stockChartRef.current);
        if (ordersChartRef.current) drawOrdersChart(o, ordersChartRef.current);
      }, 50);
    }
  }, [activeTab]);

  function addLogEntry(msg: string, icon: string) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const current: LogEntry[] = JSON.parse(localStorage.getItem('activityLog') || '[]');
    const updated = [{ msg, icon, time }, ...current].slice(0, 20);
    localStorage.setItem('activityLog', JSON.stringify(updated));
    setLog(updated);
  }

  function loadStockWithStatus() {
    const s = getDefaultStock(); setStock(s);
    if (activeTab === 'chart' && stockChartRef.current) drawChart(s, stockChartRef.current);
  }

  function editStock(index: number) {
    const item = stock[index];
    const newName = prompt('Product Name:', item.name);
    const newPrice = prompt('Price:', String(item.price));
    const newQty = prompt('Quantity:', String(item.qty));
    if (newName && newPrice && newQty) {
      const updated = stock.map((s, i) => i === index ? { ...s, name: newName, price: parseInt(newPrice), qty: parseInt(newQty) } : s);
      saveStock(updated); setStock(updated); addLogEntry('Updated: ' + newName, '✏️');
    }
  }

  function deleteStockNew(index: number) {
    if (!confirm('Delete this item?')) return;
    const name = stock[index].name;
    const updated = stock.filter((_, i) => i !== index);
    saveStock(updated); setStock(updated); addLogEntry('Deleted: ' + name, '🗑️');
  }

  function insertStockNew(e: React.SyntheticEvent) {
    e.preventDefault();
    if (!form.sname || !form.scategory || !form.sprice || !form.sqty) { alert('Fill all fields'); return; }
    const newItem: StockItem = { name: form.sname, category: form.scategory, price: parseInt(form.sprice), qty: parseInt(form.sqty) };
    const updated = [...stock, newItem];
    saveStock(updated); setStock(updated);
    addLogEntry('Added: ' + form.sname + ' (' + form.scategory + ')', '➕');
    alert('Product added!');
    setForm({ sname: '', scategory: '', sprice: '', sqty: '' });
  }

  function handleMarkSeen(id: string) {
    const updated = orders.map(o => o.id === id ? { ...o, seen: true } : o);
    localStorage.setItem('orders', JSON.stringify(updated)); setOrders(updated);
  }

  function showTab(name: string, scroll = false) {
    setActiveTab(name);
    if (scroll) setTimeout(() => { const el = document.getElementById('section-' + name); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 50);
  }

  const newOrders  = orders.filter(o => !o.seen);
  const totalQty   = stock.reduce((s, i) => s + i.qty, 0);
  const uniqueCats = [...new Set(stock.map(i => i.category))];
  const catStats: Record<string, { count: number; prices: number[]; qty: number }> = {};
  stock.forEach(item => {
    if (!catStats[item.category]) catStats[item.category] = { count: 0, prices: [], qty: 0 };
    catStats[item.category].count++; catStats[item.category].prices.push(item.price); catStats[item.category].qty += item.qty;
  });

  function statusBadge(qty: number) {
    if (qty <= 5)  return <span className="text-[#e8527f] font-bold">Low Stock</span>;
    if (qty <= 15) return <span className="text-[#ff8fb8] font-semibold">Medium</span>;
    return <span className="text-[#ff6b9d] font-semibold">Good</span>;
  }

  const isTab = (name: string) => activeTab === name;
  const tabBtnCls = (name: string) => `px-5 py-2 rounded-[20px] border-[1.5px] border-[#ff6b9d] font-semibold text-[13px] cursor-pointer w-auto mt-0 transition-all
    ${isTab(name) ? 'bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white border-transparent' : 'bg-white dark:bg-[#2a1020] text-[#ff6b9d] hover:bg-gradient-to-br hover:from-[#ff6b9d] hover:to-[#ff8fb8] hover:text-white hover:border-transparent'}`;

  const inputCls = "w-full px-3 py-2.5 border border-[#ffd6e0] dark:border-[#4a2030] rounded-[6px] font-[Poppins,sans-serif] text-[14px] outline-none focus:border-[#ff6b8a] box-border bg-white dark:bg-[#2a1020] text-[#1f1f1f] dark:text-[#f5e6ea]";
  const labelCls = "block text-[13px] font-medium mb-1 text-[#444] dark:text-[#d4b8c0]";
  const thCls    = "px-4 py-3 text-left font-semibold text-[13px]";
  const tdCls    = "px-4 py-3 text-[#444] dark:text-[#d4b8c0] align-middle break-words";

  return (
    <div className="min-h-screen font-[Poppins,sans-serif] bg-[#fff5f9] dark:bg-[#1a0a10] text-[#1f1f1f] dark:text-[#f5e6ea]">
      <Navbar />
      <div className="max-w-[1100px] mx-auto px-5 py-8">

        {/* HERO */}
        <div className="bg-gradient-to-br from-[#ff6b9d] via-[#ff8fb8] to-[#ffd6e8] p-10 rounded-[20px] mb-9 flex items-center justify-between flex-wrap gap-5">
          <div>
            <p className="text-white/75 text-[12px] font-semibold tracking-widest uppercase m-0 mb-1.5">Admin Panel</p>
            <h1 className="text-white text-[30px] font-bold m-0 mb-1.5">Inventory Dashboard</h1>
            <p className="text-white/88 text-[14px] m-0">Manage your cosmetics store - stock, orders, charts, and more.</p>
          </div>
          <div className="text-[60px] leading-none">📈</div>
        </div>

        {/* STATS */}
        <h2 className="text-[20px] font-bold mb-4 text-[#1f1f1f] dark:text-[#f5e6ea]">Store Statistics</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-9">
          {[
            { icon: '📦', num: stock.length,     lbl: 'Total Products',  tab: 'stock',      alert: false },
            { icon: '📊', num: totalQty,          lbl: 'Total Stock Qty', tab: 'stock',      alert: false },
            { icon: '🛒', num: orders.length,     lbl: 'Total Orders',    tab: 'orders',     alert: false },
            { icon: '🔔', num: newOrders.length,  lbl: 'New Orders',      tab: 'orders',     alert: true  },
            { icon: '💄', num: uniqueCats.length, lbl: 'Categories',      tab: 'categories', alert: false },
          ].map(({ icon, num, lbl, tab, alert }) => (
            <div key={lbl} onClick={() => showTab(tab, true)}
              className="flex-1 min-w-[150px] max-w-[200px] bg-white dark:bg-[#2a1020] rounded-[16px] px-[18px] py-[22px] text-center shadow-[0_4px_18px_rgba(255,107,157,0.1)] border border-[#ffe0ee] dark:border-[#4a2030] border-t-4 border-t-[#ff6b9d] cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(255,107,157,0.28)]">
              <div className="text-[28px] mb-2">{icon}</div>
              <p className={`text-[26px] font-bold m-0 ${alert ? 'text-[#e8527f]' : 'text-[#ff6b9d]'}`}>{num}</p>
              <p className="text-[12px] text-[#888] dark:text-[#9a7a85] mt-1 font-medium">{lbl}</p>
            </div>
          ))}
        </div>

        {/* ACTIONS */}
        <h2 className="text-[20px] font-bold mb-4 text-[#1f1f1f] dark:text-[#f5e6ea]">Dashboard Actions</h2>
        <div className="flex flex-wrap justify-center gap-4 mb-9">
          {[
            { title: '📦 View All Stock',   desc: 'Browse the complete inventory with product name, category, price and quantity.', btn: 'View Stock',      tab: 'stock'      },
            { title: '➕ Add New Product',  desc: 'Insert a new product into the inventory by filling in the details.',             btn: 'Add Product',     tab: 'add'        },
            { title: '✏️ Update Stock',     desc: 'Edit existing inventory records using the Edit button in the stock table.',      btn: 'Update Stock',    tab: 'stock'      },
            { title: '🗑️ Delete Stock',     desc: 'Remove products from inventory using the Delete button in the table.',          btn: 'Delete Stock',    tab: 'stock'      },
            { title: '📊 Graphical View',   desc: 'View bar chart of stock quantities per category for easy analysis.',            btn: 'View Chart',      tab: 'chart'      },
            { title: '🛒 Orders',           desc: 'Track all customer orders, new and seen, with full bill details.',              btn: 'View Orders',     tab: 'orders'     },
            { title: '💄 Categories',       desc: 'View product categories with price ranges and stock quantities.',               btn: 'View Categories', tab: 'categories' },
            { title: '📋 Activity Log',     desc: 'Track all recent inventory changes - inserts, updates, and deletions.',        btn: 'View Log',        tab: 'log'        },
          ].map(({ title, desc, btn, tab }) => (
            <div key={tab + btn} className="flex-1 min-w-[200px] max-w-[260px] bg-white dark:bg-[#2a1020] rounded-[16px] px-5 py-6 shadow-[0_4px_18px_rgba(255,107,157,0.08)] border border-[#ffe0ee] dark:border-[#4a2030] flex flex-col transition-all hover:-translate-y-1 hover:shadow-[0_10px_26px_rgba(255,107,157,0.22)]">
              <h3 className="text-[15px] font-semibold m-0 mb-2 text-[#1f1f1f] dark:text-[#f5e6ea]">{title}</h3>
              <p className="text-[12px] text-[#888] dark:text-[#9a7a85] m-0 mb-3.5 leading-relaxed flex-1">{desc}</p>
              <button onClick={() => showTab(tab, true)} className="w-full mt-auto px-4 py-2.5 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[20px] border-none cursor-pointer text-[13px] transition-all hover:-translate-y-0.5">{btn}</button>
            </div>
          ))}
        </div>

        {/* TAB BUTTONS */}
        <div className="flex gap-2.5 flex-wrap mb-5">
          <button className={tabBtnCls('stock')}      onClick={() => showTab('stock',      true)}>📦 Stock</button>
          <button className={tabBtnCls('orders')}     onClick={() => showTab('orders',     true)}>
            🛒 Orders {newOrders.length > 0 && <span className="inline-block bg-[#e8527f] text-white text-[11px] font-bold px-2 py-0.5 rounded-[20px] ml-1.5">{newOrders.length}</span>}
          </button>
          <button className={tabBtnCls('chart')}      onClick={() => showTab('chart',      true)}>📊 Chart</button>
          <button className={tabBtnCls('categories')} onClick={() => showTab('categories', true)}>💄 Categories</button>
          <button className={tabBtnCls('add')}        onClick={() => showTab('add',        true)}>➕ Add Product</button>
          <button className={tabBtnCls('log')}        onClick={() => showTab('log',        true)}>📋 Activity Log</button>
        </div>

        {/* STOCK TAB */}
        <div id="section-stock" className={isTab('stock') ? 'block' : 'hidden'}>
          <h2 className="text-[20px] font-bold mb-4 text-[#1f1f1f] dark:text-[#f5e6ea]">All Inventory Records</h2>
          <div className="bg-white dark:bg-[#2a1020] rounded-[16px] p-6 shadow-[0_4px_18px_rgba(255,107,157,0.08)] border border-[#ffe0ee] dark:border-[#4a2030] mb-6">
            <button onClick={loadStockWithStatus} className="px-[22px] py-2 rounded-[20px] bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white text-[13px] font-semibold cursor-pointer border-none w-auto mt-0 mb-4 transition-all hover:-translate-y-0.5">🔄 View All Records</button>
            <div className="w-full overflow-x-auto mt-5">
              <table className="w-full border-collapse rounded-[15px] overflow-hidden text-[14px]">
                <thead className="bg-[#ff6b9d] text-white">
                  <tr>{['#','Product Name','Category','Price (Rs.)','Qty','Status','Actions'].map(h => <th key={h} className={thCls}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {stock.map((item, i) => (
                    <tr key={i} className={`${i % 2 === 0 ? 'bg-[#fff5f7] dark:bg-[#2a1020]' : 'bg-[#ffe5ec] dark:bg-[#3a1828]'} hover:bg-[#ffc2d1] dark:hover:bg-[#4a2030] cursor-pointer`}>
                      <td className={tdCls}>{i + 1}</td>
                      <td className={tdCls}><strong>{item.name}</strong></td>
                      <td className={tdCls}>{item.category}</td>
                      <td className={tdCls}>Rs. {item.price}</td>
                      <td className={tdCls}>{item.qty}</td>
                      <td className={tdCls}>{statusBadge(item.qty)}</td>
                      <td className={tdCls}>
                        <button onClick={() => editStock(i)} className="w-auto mr-1.5 px-3 py-1.5 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[20px] border-none cursor-pointer text-[12px] mt-0">Edit</button>
                        <button onClick={() => deleteStockNew(i)} className="w-auto px-3 py-1.5 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[20px] border-none cursor-pointer text-[12px] mt-0">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ORDERS TAB */}
        <div id="section-orders" className={isTab('orders') ? 'block' : 'hidden'}>
          <h2 className="text-[20px] font-bold mb-4 text-[#1f1f1f] dark:text-[#f5e6ea]">New Orders <span className="inline-block bg-[#e8527f] text-white text-[11px] font-bold px-2 py-0.5 rounded-[20px] ml-1.5">{newOrders.length}</span></h2>
          <div className="bg-white dark:bg-[#2a1020] rounded-[16px] p-6 shadow-[0_4px_18px_rgba(255,107,157,0.08)] border border-[#ffe0ee] dark:border-[#4a2030] mb-6">
            {newOrders.length > 0 && <p className="text-[13px] text-[#888] dark:text-[#9a7a85] mb-3.5">Orders placed by customers not yet reviewed.</p>}
            <div className="w-full overflow-x-auto mt-5">
              <table className="w-full border-collapse rounded-[15px] overflow-hidden text-[14px]">
                <thead className="bg-[#ff6b9d] text-white">
                  <tr>{['Order ID','Customer','City','Items','Total Bill','Payment','Date','Status','Action'].map(h => <th key={h} className={thCls}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {newOrders.length === 0
                    ? <tr><td colSpan={9} className="text-center p-5 text-[#888]">No new orders</td></tr>
                    : newOrders.map((o, i) => (
                      <tr key={i} className={`${i % 2 === 0 ? 'bg-[#fff5f7] dark:bg-[#2a1020]' : 'bg-[#ffe5ec] dark:bg-[#3a1828]'} hover:bg-[#ffc2d1] dark:hover:bg-[#4a2030]`}>
                        <td className={tdCls}>{o.id}</td><td className={tdCls}>{o.customer}</td><td className={tdCls}>{o.city}</td>
                        <td className="px-4 py-3 text-[12px] text-[#888] align-middle">{o.items.map(it => it.name).join(', ')}</td>
                        <td className={tdCls}><strong>Rs. {o.total}</strong></td><td className={tdCls}>{o.payment}</td><td className={tdCls}>{o.date}</td>
                        <td className="px-4 py-3 text-[#e8527f] font-bold align-middle">New</td>
                        <td className={tdCls}><button onClick={() => handleMarkSeen(o.id)} className="w-auto px-3 py-1.5 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[20px] border-none cursor-pointer text-[12px] mt-0">Mark Seen</button></td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>

          <h2 className="text-[20px] font-bold mb-4 text-[#1f1f1f] dark:text-[#f5e6ea]">All Customer Orders</h2>
          <div className="bg-white dark:bg-[#2a1020] rounded-[16px] p-6 shadow-[0_4px_18px_rgba(255,107,157,0.08)] border border-[#ffe0ee] dark:border-[#4a2030] mb-6">
            <div className="w-full overflow-x-auto mt-5">
              <table className="w-full border-collapse rounded-[15px] overflow-hidden text-[14px]">
                <thead className="bg-[#ff6b9d] text-white">
                  <tr>{['Order ID','Customer','Phone','Products','Subtotal','Delivery','Total','Payment','Date','Status'].map(h => <th key={h} className={thCls}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {orders.length === 0
                    ? <tr><td colSpan={10} className="text-center p-5 text-[#888]">No orders yet</td></tr>
                    : orders.map((o, i) => (
                      <tr key={i} className={`${i % 2 === 0 ? 'bg-[#fff5f7] dark:bg-[#2a1020]' : 'bg-[#ffe5ec] dark:bg-[#3a1828]'} hover:bg-[#ffc2d1] dark:hover:bg-[#4a2030]`}>
                        <td className={tdCls}>{o.id}</td><td className={tdCls}>{o.customer}</td><td className={tdCls}>{o.phone}</td>
                        <td className="px-4 py-3 text-[12px] text-[#888] align-middle">{o.items.map(it => `${it.name} (Rs.${it.price})`).join(', ')}</td>
                        <td className={tdCls}>Rs. {o.subtotal}</td><td className={tdCls}>Rs. {o.delivery}</td>
                        <td className={tdCls}><strong>Rs. {o.total}</strong></td>
                        <td className={tdCls}>{o.payment}</td><td className={tdCls}>{o.date}</td>
                        <td className={`px-4 py-3 align-middle font-bold ${o.seen ? 'text-[#ff8fb8]' : 'text-[#e8527f]'}`}>{o.seen ? 'Seen' : 'New'}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CHART TAB */}
        <div id="section-chart" className={isTab('chart') ? 'block' : 'hidden'}>
          <h2 className="text-[20px] font-bold mb-4 text-[#1f1f1f] dark:text-[#f5e6ea]">Stock Graphical View</h2>
          <div className="bg-white dark:bg-[#2a1020] rounded-[16px] p-6 shadow-[0_4px_18px_rgba(255,107,157,0.08)] border border-[#ffe0ee] dark:border-[#4a2030] mb-6">
            <p className="text-[13px] text-[#888] dark:text-[#9a7a85] mb-3.5">Bar chart showing total stock quantity per category.</p>
            <canvas ref={stockChartRef} id="stockChart" width={600} height={280} className="max-w-full rounded-[10px]"></canvas>
          </div>
          <h2 className="text-[20px] font-bold mb-4 mt-8 text-[#1f1f1f] dark:text-[#f5e6ea]">Orders Overview</h2>
          <div className="bg-white dark:bg-[#2a1020] rounded-[16px] p-6 shadow-[0_4px_18px_rgba(255,107,157,0.08)] border border-[#ffe0ee] dark:border-[#4a2030] mb-6">
            <p className="text-[13px] text-[#888] dark:text-[#9a7a85] mb-3.5">Bar chart showing total orders received, new (unseen) and seen orders.</p>
            <canvas ref={ordersChartRef} id="ordersChart" width={600} height={260} className="max-w-full rounded-[10px]"></canvas>
          </div>
        </div>

        {/* CATEGORIES TAB */}
        <div id="section-categories" className={isTab('categories') ? 'block' : 'hidden'}>
          <h2 className="text-[20px] font-bold mb-4 text-[#1f1f1f] dark:text-[#f5e6ea]">Product Categories</h2>
          <div className="bg-white dark:bg-[#2a1020] rounded-[16px] p-6 shadow-[0_4px_18px_rgba(255,107,157,0.08)] border border-[#ffe0ee] dark:border-[#4a2030] mb-6">
            <div className="w-full overflow-x-auto mt-5">
              <table className="w-full border-collapse rounded-[15px] overflow-hidden text-[14px]">
                <thead className="bg-[#ff6b9d] text-white">
                  <tr>{['Category','Total Products','Min Price','Max Price','Avg Price','Total Qty'].map(h => <th key={h} className={thCls}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {Object.entries(catStats).map(([cat, d], i) => {
                    const min = Math.min(...d.prices); const max = Math.max(...d.prices);
                    const avg = Math.round(d.prices.reduce((a, b) => a + b, 0) / d.prices.length);
                    return (
                      <tr key={i} className={`${i % 2 === 0 ? 'bg-[#fff5f7] dark:bg-[#2a1020]' : 'bg-[#ffe5ec] dark:bg-[#3a1828]'} hover:bg-[#ffc2d1] dark:hover:bg-[#4a2030]`}>
                        <td className={tdCls}><strong>{cat}</strong></td><td className={tdCls}>{d.count}</td>
                        <td className={tdCls}>Rs. {min}</td><td className={tdCls}>Rs. {max}</td><td className={tdCls}>Rs. {avg}</td><td className={tdCls}>{d.qty}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ADD PRODUCT TAB */}
        <div id="section-add" className={isTab('add') ? 'block' : 'hidden'}>
          <h2 className="text-[20px] font-bold mb-4 text-[#1f1f1f] dark:text-[#f5e6ea]">Add New Product</h2>
          <div className="bg-white dark:bg-[#2a1020] rounded-[16px] p-6 shadow-[0_4px_18px_rgba(255,107,157,0.08)] border border-[#ffe0ee] dark:border-[#4a2030] mb-6">
            <div className="max-w-[480px]">
              <form onSubmit={insertStockNew}>
                <div className="mb-3.5"><label className={labelCls}>Product Name</label><input type="text" placeholder="Product name" value={form.sname} onChange={e => setForm({ ...form, sname: e.target.value })} required className={inputCls} /></div>
                <div className="mb-3.5">
                  <label className={labelCls}>Category</label>
                  <select value={form.scategory} onChange={e => setForm({ ...form, scategory: e.target.value })} required className={`${inputCls} cursor-pointer`}>
                    <option value="">Select Category</option>
                    <option value="Makeup">Makeup</option>
                    <option value="Skincare">Skincare</option>
                    <option value="Haircare">Haircare</option>
                    <option value="Nailcare">Nailcare</option>
                  </select>
                </div>
                <div className="mb-3.5"><label className={labelCls}>Price (Rs.)</label><input type="number" placeholder="Price" value={form.sprice} onChange={e => setForm({ ...form, sprice: e.target.value })} required className={inputCls} /></div>
                <div className="mb-3.5"><label className={labelCls}>Quantity</label><input type="number" placeholder="Quantity" value={form.sqty} onChange={e => setForm({ ...form, sqty: e.target.value })} required className={inputCls} /></div>
                <button type="submit" className="w-full mt-2 px-4 py-2.5 bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white font-semibold rounded-[20px] border-none cursor-pointer text-[13px] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(255,107,157,0.45)]">Add to Stock</button>
              </form>
            </div>
          </div>
        </div>

        {/* ACTIVITY LOG TAB */}
        <div id="section-log" className={isTab('log') ? 'block' : 'hidden'}>
          <h2 className="text-[20px] font-bold mb-4 text-[#1f1f1f] dark:text-[#f5e6ea]">Recent Activity Log</h2>
          <div className="bg-white dark:bg-[#2a1020] rounded-[16px] p-6 shadow-[0_4px_18px_rgba(255,107,157,0.08)] border border-[#ffe0ee] dark:border-[#4a2030] mb-6">
            <p className="text-[13px] text-[#888] dark:text-[#9a7a85] mb-3.5">Latest actions performed on the inventory.</p>
            <ul className="list-none p-0 m-0">
              {log.length === 0
                ? <li className="flex items-center gap-3 py-2.5 text-[13px] text-[#555] dark:text-[#d4b8c0]"><span className="text-[18px] min-w-[28px] text-center">📋</span> No activity yet.</li>
                : log.map((l, i) => (
                  <li key={i} className={`flex items-center gap-3 py-2.5 text-[13px] text-[#555] dark:text-[#d4b8c0] ${i < log.length - 1 ? 'border-b border-[#fff0f5] dark:border-[#4a2030]' : ''}`}>
                    <span className="text-[18px] min-w-[28px] text-center">{l.icon}</span>
                    {l.msg}
                    <span className="text-[11px] text-[#aaa] dark:text-[#9a7a85] ml-auto whitespace-nowrap">{l.time}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-gradient-to-br from-[#ff6b9d] to-[#ff8fb8] text-white pt-10 pb-5 px-5 mt-16 text-center">
        <div className="flex flex-wrap justify-between gap-8 max-w-[1100px] mx-auto mb-5 text-left">
          <div className="flex-1 min-w-[160px]">
            <h2 className="text-white text-base font-semibold mb-3">E-commerce Cosmetics Store</h2>
            <p className="text-[#ffd6e0] text-[13px]">Admin Panel - Manage your store.</p>
          </div>
          <div className="flex-1 min-w-[160px]">
            <h3 className="text-white text-sm font-semibold mb-2.5">Quick Links</h3>
            <Link to="/" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Home</Link>
            <Link to="/products" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Products</Link>
            <Link to="/login" className="text-[#ffd6e0] no-underline text-[13px] block mb-1.5 hover:text-white hover:underline">Logout</Link>
          </div>
        </div>
        <p className="text-[#ffd6e0] text-[13px]">© 2026 E-commerce Cosmetics Store. All rights reserved.</p>
      </footer>
    </div>
  );
}
export default Dashboard;
