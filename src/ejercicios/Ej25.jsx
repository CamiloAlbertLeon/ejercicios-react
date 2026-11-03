import React, { useState } from 'react';
import { P, ok, fmt } from '../utils';
import { Field, Fields, Console, Readouts, Split } from '../components/ui';

/* ---------- 25 Hipotenusa ---------- */
export function Ej25() {
  const [a, setA] = useState('2'), [b, setB] = useState('4');
  const A = P(a), B = P(b);
  const lines = [['out', 'Ingrese primer cateto: ' + a], ['out', 'Ingrese segundo cateto: ' + b]];
  let h = null;
  if (ok(A, B)) {
    if (A <= 0 || B <= 0) lines.push(['err', 'los catetos deben ser mayores que 0']);
    else { h = Math.hypot(A, B); lines.push(['out', ''], ['ok', 'La hipotenusa es: ' + fmt(h)]); }
  }
  let svg = null;
  if (h) {
    const W = 300, H = 180, pad = 30, k = Math.min((W - 2 * pad) / A, (H - 2 * pad) / B);
    const p0 = [pad, H - pad], p1 = [pad + A * k, H - pad], p2 = [pad, H - pad - B * k];
    svg = (
      <svg viewBox={`0 0 ${W} ${H}`} className="plot" role="img" aria-label="Triángulo rectángulo a escala">
        <polygon points={[p0, p1, p2].map((p) => p.join(',')).join(' ')} className="shape" />
        <rect x={pad} y={H - pad - 10} width="10" height="10" className="right-mark" />
        <text x={(p0[0] + p1[0]) / 2} y={H - pad + 18} textAnchor="middle" className="plot-label">{fmt(A)}</text>
        <text x={pad - 8} y={(p0[1] + p2[1]) / 2} textAnchor="end" className="plot-label">{fmt(B)}</text>
        <text x={(p1[0] + p2[0]) / 2 + 10} y={(p1[1] + p2[1]) / 2 - 6} className="plot-label strong">{fmt(h)}</text>
      </svg>
    );
  }
  return (
    <Split con={<Console name="ej25" lines={lines} />}>
      <Fields>
        <Field id="e25a" label="Primer cateto" value={a} onChange={setA} />
        <Field id="e25b" label="Segundo cateto" value={b} onChange={setB} />
      </Fields>
      {h && <><Readouts items={[['a² + b²', fmt(A * A + B * B, 4)], ['Hipotenusa √(a² + b²)', fmt(h, 4), 'accent']]} />{svg}</>}
    </Split>
  );
}
