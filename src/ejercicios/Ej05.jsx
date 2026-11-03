import React, { useState } from 'react';
import { P, ok } from '../utils';
import { Field, Fields, Console, Split, Tries } from '../components/ui';

/* ---------- 05 Minutos a días, horas y minutos ---------- */
export function Ej05() {
  const [m, setM] = useState('20155');
  const M = P(m);
  const lines = [['out', 'ingrese un tiempo en minutos'], ['in', m]];
  let r = null;
  if (ok(M)) {
    if (!Number.isInteger(M)) lines.push(['err', 'ingresa una cantidad entera de minutos']);
    else if (M < 0) lines.push(['err', 'el tiempo no puede ser negativo']);
    else {
      r = { d: Math.floor(M / 1440), h: Math.floor((M % 1440) / 60), mi: M % 60 };
      lines.push(['ok', `equivale a ${r.d} dias con ${r.h} horas y ${r.mi} minutos`]);
    }
  }
  return (
    <Split con={<Console name="ej05" lines={lines} />}>
      <Fields><Field id="e5m" label="Tiempo" value={m} onChange={setM} suffix="min" inputMode="numeric" /></Fields>
      <Tries values={[59, 1440, 20155, 525600]} onPick={setM} />
      {r && <>
        <div className="tiles3">
          <div><b>{r.d}</b><span>días</span></div>
          <div><b>{r.h}</b><span>horas</span></div>
          <div><b>{r.mi}</b><span>minutos</span></div>
        </div>
        <p className="check">Comprobación: {r.d} × 1440 + {r.h} × 60 + {r.mi} = {r.d * 1440 + r.h * 60 + r.mi} min</p>
      </>}
    </Split>
  );
}
