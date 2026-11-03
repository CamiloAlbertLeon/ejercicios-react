import React, { useState } from 'react';
import { P, ok, fmt } from '../utils';
import { Field, Fields, Console, Readouts, Split, Msg } from '../components/ui';

/* ---------- 24 Área de un triángulo (Herón) ---------- */
export function TriSvg({ a, b, c }) {
  // c sobre la base, b = AC, a = BC
  const cx = (b * b + c * c - a * a) / (2 * c), cy = Math.sqrt(Math.max(b * b - cx * cx, 0));
  const xs = [0, c, cx], minx = Math.min(...xs), maxx = Math.max(...xs);
  const W = 320, H = 190, pad = 28;
  const k = Math.min((W - 2 * pad) / (maxx - minx || 1), (H - 2 * pad) / (cy || 1));
  const X = (x) => pad + (x - minx) * k + ((W - 2 * pad) - (maxx - minx) * k) / 2, Y = (y) => H - pad - y * k;
  const A = [X(0), Y(0)], B = [X(c), Y(0)], C = [X(cx), Y(cy)];
  const mid = (p, q, dy = 0) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2 + dy];
  const ma = mid(B, C), mb = mid(A, C), mc = mid(A, B, 18);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="plot" role="img" aria-label="Dibujo del triángulo a escala">
      <polygon points={[A, B, C].map((p) => p.join(',')).join(' ')} className="shape" />
      <text x={mc[0]} y={mc[1]} textAnchor="middle" className="plot-label">c = {fmt(c)}</text>
      <text x={mb[0] - 8} y={mb[1]} textAnchor="end" className="plot-label">b = {fmt(b)}</text>
      <text x={ma[0] + 8} y={ma[1]} textAnchor="start" className="plot-label">a = {fmt(a)}</text>
    </svg>
  );
}
export function Ej24() {
  const [a, setA] = useState('2'), [b, setB] = useState('4'), [c, setC] = useState('5');
  const A = P(a), B = P(b), C = P(c);
  const lines = [['out', 'ingrese lado A: ' + a], ['out', 'ingrese lado B: ' + b], ['out', 'ingrese lado C: ' + c]];
  let r = null, err = '';
  if (ok(A, B, C)) {
    if (A <= 0 || B <= 0 || C <= 0) err = 'Los lados deben ser mayores que 0.';
    else if (A + B <= C || A + C <= B || B + C <= A) err = 'Esos lados no forman un triángulo: cada lado debe ser menor que la suma de los otros dos.';
    else {
      const s = (A + B + C) / 2;
      r = { s, area: Math.sqrt(s * (s - A) * (s - B) * (s - C)), orig: Math.sqrt(s * (s - A) * s * (s - B) * s * (s - C)) };
      lines.push(['ok', 'El area del triangulo es: ' + fmt(r.area)]);
    }
  }
  if (err) lines.push(['err', err]);
  return (
    <Split con={<Console name="ej24" lines={lines} />}>
      <Fields>
        <Field id="e24a" label="Lado A" value={a} onChange={setA} />
        <Field id="e24b" label="Lado B" value={b} onChange={setB} />
        <Field id="e24c" label="Lado C" value={c} onChange={setC} />
      </Fields>
      <div className="tries"><span>Ejemplos</span>
        {[['2', '4', '5'], ['3', '4', '5'], ['6', '6', '6'], ['1', '2', '8']].map((e) => <button key={e.join()} type="button" className="try" onClick={() => { setA(e[0]); setB(e[1]); setC(e[2]); }}>{e.join(', ')}</button>)}
      </div>
      {err && <Msg>{err}</Msg>}
      {r && <>
        <Readouts items={[['Semiperímetro s', fmt(r.s)], ['Área (Herón)', fmt(r.area), 'accent'], ['Lo que daba el original', fmt(r.orig), 'bad']]} />
        <TriSvg a={A} b={B} c={C} />
      </>}
    </Split>
  );
}
