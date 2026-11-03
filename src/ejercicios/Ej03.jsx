import React, { useState } from 'react';
import { P, ok, fmt, money } from '../utils';
import { Field, Fields, Console, Readouts, Split, Tries } from '../components/ui';

/* ---------- 03 Descuento por monto ---------- */
export function Ej03() {
  const [m, setM] = useState('45');
  const M = P(m);
  const lines = [['out', 'ingrese monto'], ['in', m]];
  let r = null;
  if (ok(M)) {
    if (M < 0) lines.push(['err', 'error el monto no puede ser negativo']);
    else {
      const pct = M > 100 ? 0.1 : 0.02;
      r = { pct, d: M * pct };
      lines.push(['ok', `el monto ${fmt(M)} tiene un descuento del ${fmt(r.d)}`]);
    }
  }
  return (
    <Split con={<Console name="ej03" lines={lines} />}>
      <Fields><Field id="e3m" label="Monto" value={m} onChange={setM} suffix="$" /></Fields>
      <Tries values={[45, 100, 100.01, 250]} onPick={setM} />
      {r && <Readouts items={[['Regla', M > 100 ? 'Más de 100 → 10 %' : '100 o menos → 2 %'], ['Descuento', '$' + money(r.d)], ['A pagar', '$' + money(M - r.d), 'accent']]} />}
    </Split>
  );
}
