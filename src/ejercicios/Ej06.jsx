import React, { useState } from 'react';
import { P, ok } from '../utils';
import { Field, Fields, Console, Readouts, Split, Msg, Tries } from '../components/ui';

/* ---------- 06 Suma de los N primeros naturales ---------- */
export function Ej06() {
  const [n, setN] = useState('12');
  const N = P(n);
  let lines = [['out', 'ingrese el numero N :  ' + n]];
  let suma = null, err = '';
  if (ok(N)) {
    if (!Number.isInteger(N) || N < 0) err = 'N debe ser un entero positivo.';
    else if (N > 100000) err = 'Usa un N de hasta 100 000 para no congelar la página.';
    else {
      suma = 0;
      const body = [];
      for (let x = 1; x <= N; x++) { suma += x; if (x <= 10 || x > N - 3) body.push(['out', `n${x}: ${x}`]); else if (x === 11) body.push(['dim', `… ${N - 13} líneas más …`]); }
      lines = [...lines, ...body, ['out', ''], ['ok', 'La suma de la serie es: ' + suma]];
    }
  }
  return (
    <Split con={<Console name="ej06" lines={lines} />}>
      <Fields><Field id="e6n" label="N" value={n} onChange={setN} inputMode="numeric" /></Fields>
      <Tries values={[4, 12, 40, 100]} onPick={setN} />
      {err && <Msg>{err}</Msg>}
      {suma != null && <>
        <Readouts items={[['Suma con el bucle for', suma, 'accent'], ['Fórmula N(N+1)/2', (N * (N + 1)) / 2]]} />
        {N > 0 && N <= 40 && <div className="stairs" aria-hidden="true">{Array.from({ length: N }, (_, i) => <span key={i} style={{ height: ((i + 1) / N) * 100 + '%' }} />)}</div>}
      </>}
    </Split>
  );
}
