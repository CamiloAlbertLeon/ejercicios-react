import React, { useState } from 'react';
import { P, ok, fmt, money } from '../utils';
import { Field, Fields, Console, Readouts, Split } from '../components/ui';

/* ---------- 08 Salario simple ---------- */
export function Ej08() {
  const [h, setH] = useState('4'), [t, setT] = useState('50');
  const H = P(h), T = P(t);
  const lines = [['out', 'ingrese horas trabajadas: ' + h], ['out', 'ingrese tarifa:  ' + t]];
  if (ok(H, T)) lines.push(['ok', 'El salario del trabajador es: ' + fmt(H * T)]);
  return (
    <Split con={<Console name="ej08" lines={lines} />}>
      <Fields>
        <Field id="e8h" label="Horas trabajadas" value={h} onChange={setH} suffix="h" />
        <Field id="e8t" label="Tarifa por hora" value={t} onChange={setT} suffix="$/h" />
      </Fields>
      {ok(H, T) && <Readouts items={[['Operación', `${fmt(H)} × ${fmt(T)}`], ['Salario', '$' + money(H * T), 'accent']]} />}
    </Split>
  );
}
