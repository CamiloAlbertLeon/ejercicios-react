import React, { useState } from 'react';
import { P, ok } from '../utils';
import { Field, Fields, Console, Readouts, Split, Tries } from '../components/ui';

/* ---------- 28 Serie desde 8 ---------- */
export function Ej28() {
  const [v, setV] = useState('10');
  const N = P(v);
  const lines = [['out', 'Ingrese el numero enesimo:  ' + v]];
  let s = null;
  if (ok(N)) {
    if (!Number.isInteger(N)) lines.push(['err', 'ingresa un numero entero']);
    else if (N < 8) lines.push(['out', ''], ['err', 'Error el numero ingresado es menor a 8']);
    else if (N > 1e6) lines.push(['err', 'usa un numero de hasta 1 000 000']);
    else { s = 0; for (let x = 8; x <= N; x++) s += x; lines.push(['out', ''], ['ok', `La suma de la serie de rango 8 hasta ${N}, con un incremento de 1 es: ${s}`]); }
  }
  const terms = s != null ? (N - 8 <= 8 ? Array.from({ length: N - 7 }, (_, i) => i + 8).join(' + ') : `8 + 9 + 10 + … + ${N - 1} + ${N}`) : '';
  return (
    <Split con={<Console name="ej28" lines={lines} />}>
      <Fields><Field id="e28n" label="N (8 o más)" value={v} onChange={setV} inputMode="numeric" /></Fields>
      <Tries values={[7, 8, 10, 100]} onPick={setV} />
      {s != null && <>
        <p className="chain">S = {terms}</p>
        <Readouts items={[['Términos', N - 7], ['Suma S', s, 'accent']]} />
      </>}
    </Split>
  );
}
