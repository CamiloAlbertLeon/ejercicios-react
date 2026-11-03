import React, { useState } from 'react';
import { P, ok, fmt } from '../utils';
import { Field, Fields, Console, Readouts, Split, Msg } from '../components/ui';

/* ---------- 20 Ecuación cuadrática ---------- */
export function Parabola({ a, b, c, roots }) {
  const W = 340, H = 210, pad = 22;
  const xv = -b / (2 * a);
  let span = 4;
  roots.forEach((r) => { span = Math.max(span, Math.abs(r - xv) * 1.6); });
  const x0 = xv - span, x1 = xv + span;
  const pts = [];
  for (let i = 0; i <= 80; i++) { const x = x0 + ((x1 - x0) * i) / 80; pts.push([x, a * x * x + b * x + c]); }
  const ys = pts.map((p) => p[1]);
  let y0 = Math.min(...ys, 0), y1 = Math.max(...ys, 0);
  if (y1 - y0 < 1e-9) { y0 -= 1; y1 += 1; }
  const sx = (x) => pad + ((x - x0) / (x1 - x0)) * (W - 2 * pad);
  const sy = (y) => H - pad - ((y - y0) / (y1 - y0)) * (H - 2 * pad);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + sx(p[0]).toFixed(1) + ' ' + sy(p[1]).toFixed(1)).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="plot" role="img" aria-label="Gráfica de la parábola">
      <line x1={pad} x2={W - pad} y1={sy(0)} y2={sy(0)} className="axis" />
      {x0 < 0 && x1 > 0 && <line x1={sx(0)} x2={sx(0)} y1={pad} y2={H - pad} className="axis" />}
      <path d={d} className="curve" />
      <circle cx={sx(xv)} cy={sy(a * xv * xv + b * xv + c)} r="3.5" className="vertex" />
      {roots.map((r, i) => <g key={i}><circle cx={sx(r)} cy={sy(0)} r="5" className="root" /><text x={sx(r)} y={sy(0) + (a > 0 ? 18 : -10)} textAnchor="middle" className="plot-label">{fmt(r)}</text></g>)}
      <text x={W - pad} y={sy(0) - 6} textAnchor="end" className="plot-label">x</text>
    </svg>
  );
}
export function Ej20() {
  const [a, setA] = useState('2'), [b, setB] = useState('4'), [c, setC] = useState('5');
  const A = P(a), B = P(b), C = P(c);
  const lines = [['out', 'dada la ecuacion aX2 + bx + c = 0 ingresar los coeficientes a,b,c'], ['out', ''], ['out', 'ingrese el coeficiente a'], ['in', a], ['out', 'ingrese el coeficiente b'], ['in', b], ['out', 'ingrese el coeficiente c'], ['in', c]];
  let r = null;
  if (ok(A, B, C)) {
    const disc = B * B - 4 * A * C;
    if (A === 0) {
      lines.push(['err', "esta no es una ecuacion cuadratica coeficiente 'a' debe ser diferente de 0"]);
      r = { lineal: B !== 0 ? -C / B : null };
    } else if (disc > 0) {
      const x1 = (-B + Math.sqrt(disc)) / (2 * A), x2 = (-B - Math.sqrt(disc)) / (2 * A);
      r = { disc, kind: 'dos', roots: [x1, x2] };
      lines.push(['ok', ` el discriminante es positivo: x1 = ${fmt(x1)} y x2 = ${fmt(x2)}`]);
    } else if (disc === 0) {
      const x = -B / (2 * A);
      r = { disc, kind: 'una', roots: [x] };
      lines.push(['ok', ` el discriminante es 0, solucion unica: x = ${fmt(x)}`]);
    } else {
      const re = -B / (2 * A), im = Math.sqrt(-disc) / (2 * Math.abs(A));
      r = { disc, kind: 'img', roots: [], re, im };
      lines.push(['ok', ` discriminante es ${fmt(disc)}: x1 = ${fmt(re, 3)} + ${fmt(im, 4)}i , x2 = ${fmt(re, 3)} - ${fmt(im, 4)}i`]);
    }
  }
  return (
    <Split con={<Console name="ej20" lines={lines} />}>
      <p className="eq">{a || 'a'}x² {B < 0 ? '−' : '+'} {ok(B) ? fmt(Math.abs(B), 4) : 'b'}x {C < 0 ? '−' : '+'} {ok(C) ? fmt(Math.abs(C), 4) : 'c'} = 0</p>
      <Fields>
        <Field id="e20a" label="a" value={a} onChange={setA} />
        <Field id="e20b" label="b" value={b} onChange={setB} />
        <Field id="e20c" label="c" value={c} onChange={setC} />
      </Fields>
      <div className="tries"><span>Ejemplos</span>
        {[['2', '4', '5'], ['1', '-3', '2'], ['1', '2', '1'], ['-1', '0', '9']].map((e) => (
          <button key={e.join()} type="button" className="try" onClick={() => { setA(e[0]); setB(e[1]); setC(e[2]); }}>{e.join(', ')}</button>
        ))}
      </div>
      {r && r.kind && <>
        <Readouts items={[
          ['Discriminante b² − 4ac', fmt(r.disc, 4), r.disc < 0 ? 'warn' : ''],
          ...(r.kind === 'img'
            ? [['x₁', `${fmt(r.re, 3)} + ${fmt(r.im, 4)}i`, 'accent'], ['x₂', `${fmt(r.re, 3)} − ${fmt(r.im, 4)}i`, 'accent']]
            : r.roots.map((x, i) => [r.roots.length > 1 ? `x${i ? '₂' : '₁'}` : 'x', fmt(x, 4), 'accent'])),
        ]} />
        <Parabola a={A} b={B} c={C} roots={r.roots} />
        {r.kind === 'img' && <p className="cap">La parábola no corta el eje x, por eso las raíces son imaginarias.</p>}
      </>}
      {r && r.lineal !== undefined && r.lineal !== null && <Msg tone="warn">Con a = 0 queda una ecuación lineal: x = {fmt(r.lineal, 4)}</Msg>}
    </Split>
  );
}
