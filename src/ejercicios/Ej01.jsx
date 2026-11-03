import React, { useState } from 'react';
import { P, ok, fmt, money } from '../utils';
import { Field, Fields, Console, Readouts, Split, Tries, StackBar } from '../components/ui';

/* ---------- 01 Salario con horas extra ---------- */
export function salarioExtra(H, T) {
  const n = Math.min(H, 40), e = Math.max(H - 40, 0), te = T * 1.5;
  return { n, e, te, s: n * T + e * te };
}
export function Ej01() {
  const [h, setH] = useState('46'), [t, setT] = useState('150');
  const H = P(h), T = P(t);
  const lines = [['out', 'ingrese horas trabajadas'], ['in', h], ['out', 'ingrese tarifa'], ['in', t]];
  let r = null;
  if (ok(H, T)) {
    if (H < 0) lines.push(['err', 'las horas trabajadas no pueden ser negativas']);
    else { r = salarioExtra(H, T); lines.push(['ok', 'el salario es: ' + fmt(r.s)]); }
  }
  return (
    <Split con={<Console name="ej01" lines={lines} />}>
      <Fields>
        <Field id="e1h" label="Horas trabajadas" value={h} onChange={setH} suffix="h" />
        <Field id="e1t" label="Tarifa por hora" value={t} onChange={setT} suffix="$/h" />
      </Fields>
      <Tries values={[38, 40, 41, 60]} onPick={setH} label="Horas" />
      {r && <>
        <Readouts items={[['Horas normales', fmt(r.n) + ' h'], ['Horas extra', fmt(r.e) + ' h'], ['Tarifa extra (+50 %)', '$' + money(r.te)], ['Salario', '$' + money(r.s), 'accent']]} />
        <StackBar parts={[{ label: 'Pago normal', value: r.n * T }, { label: 'Pago extra', value: r.e * r.te }]} />
      </>}
    </Split>
  );
}
