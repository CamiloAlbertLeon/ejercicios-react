import React, { useState } from 'react';
import { P, ok } from '../utils';
import { Field, Fields, Console, Readouts, Split, Msg, Tries } from '../components/ui';

/* ---------- 13 Factorial ---------- */
export function Ej13() {
  const [v, setV] = useState('20');
  const N = P(v);
  const lines = [['out', 'ingresar numero: ' + v]];
  let f = null, i32 = null, err = '';
  if (ok(N)) {
    if (!Number.isInteger(N) || N < 0) err = 'El factorial solo existe para enteros no negativos.';
    else if (N > 1000) err = 'Usa un número de hasta 1000.';
    else {
      f = 1n; i32 = 1;
      for (let i = 1; i <= N; i++) { f *= BigInt(i); i32 = Math.imul(i32, i); }
      lines.push(['out', ''], ['out', 'Factorial: '], ['ok', ` ${N}! = ${f}`]);
    }
  }
  const fs = f != null ? f.toString() : '';
  return (
    <Split con={<Console name="ej13" lines={lines} />}>
      <Fields><Field id="e13n" label="Número" value={v} onChange={setV} inputMode="numeric" /></Fields>
      <Tries values={[5, 10, 12, 13, 20, 100]} onPick={setV} />
      {err && <Msg>{err}</Msg>}
      {f != null && <>
        {N <= 12 && N > 0 && <p className="chain">{Array.from({ length: N }, (_, i) => i + 1).join(' × ')}</p>}
        <div className="bignum"><span>{N}! =</span> {fs}</div>
        <Readouts items={[['Dígitos', fs.length], ['Lo que imprimía el int de C#', String(i32), String(i32) === fs ? 'good' : 'bad']]} />
        {String(i32) !== fs && <Msg tone="warn">A partir de 13! el resultado ya no cabe en un int de 32 bits, por eso el programa original mostraría un número equivocado.</Msg>}
      </>}
    </Split>
  );
}
