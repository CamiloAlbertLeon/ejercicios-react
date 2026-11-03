

/* ---------- utilidades ---------- */
export const P = (v) => {
  if (v === '' || v == null) return NaN;
  const s = String(v).trim().replace(',', '.');
  if (s === '' || s === '-' || s === '.' || s === '-.') return NaN;
  return Number(s);
};
export const ok = (...ns) => ns.every(Number.isFinite);
export const fmt = (n, d = 2) => {
  if (typeof n === 'bigint') return n.toString();
  if (!Number.isFinite(n)) return Number.isNaN(n) ? 'NaN' : n > 0 ? '∞' : '-∞';
  const r = Math.round(n * 10 ** d) / 10 ** d;
  return Object.is(r, -0) ? '0' : String(r);
};
export const money = (n) =>
  Number.isFinite(n) ? n.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—';
export const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
export const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN);
export function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const randInts = (n, lo, hi, seed = Date.now()) => {
  const r = rng(seed);
  return Array.from({ length: n }, () => Math.floor(lo + r() * (hi - lo + 1)));
};
export const parseNums = (t) => {
  const toks = t.split(/[\s;,]+/).filter(Boolean);
  const nums = [];
  let bad = 0;
  toks.forEach((x) => { const n = Number(x); Number.isNaN(n) ? bad++ : nums.push(n); });
  return { nums, bad };
};
export const trunc = (arr, head = 8, tail = 3) =>
  arr.length > head + tail + 1
    ? [...arr.slice(0, head), ['dim', `… ${arr.length - head - tail} líneas más …`], ...arr.slice(-tail)]
    : arr;
export const ORD = ['primera', 'segunda', 'tercera', 'cuarta', 'quinta'];
