/* =========================================================
   CHART UTILITIES
   Canvas bar-chart drawing functions used by Dashboard page.
   ========================================================= */

import type { StockItem } from './stockUtils';

export interface Order {
  id: string;
  customer: string;
  phone: string;
  city: string;
  address: string;
  payment: string;
  shipping: string;
  items: { name: string; price: number }[];
  subtotal: number;
  delivery: number;
  total: number;
  date: string;
  status: string;
  seen: boolean;
}

/** Draw a bar chart of stock quantity grouped by category. */
export function drawChart(stock: StockItem[], canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const cats: Record<string, number> = {};
  stock.forEach(item => {
    cats[item.category] = (cats[item.category] || 0) + item.qty;
  });

  const labels = Object.keys(cats);
  const values = Object.values(cats);
  const colors = ['#ff4d6d', '#ff8fa3', '#ffccd5', '#c9184a', '#ff006e'];
  const maxVal = Math.max(...values);
  const barW = 60, gap = 30, padL = 50, padB = 50;
  const chartH = canvas.height - padB - 20;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#ccc';
  ctx.beginPath();
  ctx.moveTo(padL, 10);
  ctx.lineTo(padL, canvas.height - padB);
  ctx.lineTo(canvas.width - 10, canvas.height - padB);
  ctx.stroke();

  labels.forEach((label, i) => {
    const x    = padL + i * (barW + gap) + gap;
    const barH = (values[i] / maxVal) * chartH;
    const y    = canvas.height - padB - barH;

    ctx.fillStyle = colors[i % colors.length];
    ctx.fillRect(x, y, barW, barH);

    ctx.fillStyle = '#333';
    ctx.font = '12px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(String(values[i]), x + barW / 2, y - 5);

    ctx.fillStyle = '#555';
    ctx.font = '11px Poppins, sans-serif';
    ctx.fillText(label, x + barW / 2, canvas.height - padB + 18);
  });
}

/** Draw a bar chart showing total, new, and seen orders. */
export function drawOrdersChart(orders: Order[], canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const total  = orders.length;
  const newO   = orders.filter(o => !o.seen).length;
  const seen   = orders.filter(o => o.seen).length;
  const labels = ['Total Orders', 'New Orders', 'Seen Orders'];
  const values = [total, newO, seen];
  const colors = ['#ff6b9d', '#e8527f', '#ffd6e8'];
  const maxVal = Math.max(...values) || 1;
  const barW = 80, gap = 60, padL = 60, padB = 50;
  const chartH = canvas.height - padB - 20;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#eee';
  ctx.beginPath();
  ctx.moveTo(padL, 10);
  ctx.lineTo(padL, canvas.height - padB);
  ctx.lineTo(canvas.width - 10, canvas.height - padB);
  ctx.stroke();

  for (let i = 0; i < 3; i++) {
    const x    = padL + i * (barW + gap) + gap;
    const barH = maxVal > 0 ? (values[i] / maxVal) * chartH : 0;
    const y    = canvas.height - padB - barH;

    ctx.fillStyle = colors[i];
    ctx.beginPath();
    if ((ctx as any).roundRect) (ctx as any).roundRect(x, y, barW, barH, 6);
    else ctx.rect(x, y, barW, barH);
    ctx.fill();

    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(String(values[i]), x + barW / 2, y - 8);

    ctx.fillStyle = '#555';
    ctx.font = '12px Poppins, sans-serif';
    ctx.fillText(labels[i], x + barW / 2, canvas.height - padB + 18);
  }
}
