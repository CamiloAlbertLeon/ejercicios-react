import React, { useState } from 'react';
import { ok } from '../utils';
import { Field, Fields, Console, Split, Tries } from '../components/ui';

/* ---------- 10 Suma de dígitos ---------- */
export function Ej10() {
  const [v, setV] = useState('152');
  const clean = v.trim().replace(/^-/, '');
  const valid = /^\d{1,40}$/.test(clean);
  const lines = [['out', 'ingresar un numero'], ['in', v]];
  const steps = [];
  let suma = 0n;
  if (valid) {
    let n = BigInt(clean);
    do { const r = n % 10n; suma += r; steps.push({ n, r, suma }); n = n / 10n; } while (n !== 0n);
    lines.push(['out', ''], ['ok', 'la suma es de los digitos es:  ' + suma]);
  } else if (v.trim()) lines.push(['err', 'escribe un número entero (hasta 40 dígitos)']);
  return (
    <Split con={<Console name="ej10" lines={lines} />}>
      <Fields><Field id="e10n" label="Número entero" value={v} onChange={setV} inputMode="numeric" /></Fields>
      <Tries values={[152, 9999, 1000001, '31415926535']} onPick={setV} />
      {valid && <>
        <div className="digits" aria-hidden="true">{[...clean].map((d, i) => <span key={i}>{d}</span>)}</div>
        <p className="cap">Traza del bucle do-while: cada vuelta toma el último dígito con % 10 y lo quita con / 10.</p>
        <div className="tablewrap">
          <table className="tbl">
            <thead><tr><th>Vuelta</th><th className="num">numero</th><th className="num">numero % 10</th><th className="num">suma</th></tr></thead>
            <tbody>{steps.slice(0, 40).map((s, i) => <tr key={i}><td>{i + 1}</td><td className="num">{s.n.toString()}</td><td className="num">{s.r.toString()}</td><td className="num">{s.suma.toString()}</td></tr>)}</tbody>
          </table>
        </div>
      </>}
    </Split>
  );
}
