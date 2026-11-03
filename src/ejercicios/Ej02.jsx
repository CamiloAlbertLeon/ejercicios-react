import React, { useState } from 'react';
import { P, ok, fmt, money } from '../utils';
import { Field, Fields, Console, Readouts, Split, Tries } from '../components/ui';

/* ---------- 02 Descuento escalonado ---------- */
export function Ej02() {
  const [s, setS] = useState('2500');
  const S = P(s);
  const lines = [['out', 'ingrese el sueldo'], ['in', s]];
  let rows = null, desc, neto;
  if (ok(S)) {
    if (S < 0) lines.push(['err', 'error el sueldo no puede ser negativo']);
    else {
      rows = [
        ['Hasta 1,000', '10 %', Math.min(S, 1000), 0.1],
        ['De 1,000 a 2,000', '5 % del adicional', Math.min(Math.max(S - 1000, 0), 1000), 0.05],
        ['Más de 2,000', '3 % del adicional', Math.max(S - 2000, 0), 0.03],
      ];
      desc = rows.reduce((a, r) => a + r[2] * r[3], 0);
      neto = S - desc;
      lines.push(['ok', `el descuento es: ${fmt(desc)} y el sueldo neto es: ${fmt(neto)}`]);
    }
  }
  return (
    <Split con={<Console name="ej02" lines={lines} />}>
      <Fields><Field id="e2s" label="Sueldo" value={s} onChange={setS} suffix="$" /></Fields>
      <Tries values={[800, 1000, 1500, 2000, 5000]} onPick={setS} />
      {rows && <>
        <div className="tablewrap">
          <table className="tbl">
            <thead><tr><th>Tramo</th><th>Regla</th><th className="num">Base</th><th className="num">Descuento</th></tr></thead>
            <tbody>{rows.map((r, i) => (
              <tr key={i} className={r[2] > 0 ? 'on' : 'off'}><td>{r[0]}</td><td>{r[1]}</td><td className="num">{money(r[2])}</td><td className="num">{money(r[2] * r[3])}</td></tr>
            ))}</tbody>
          </table>
        </div>
        <Readouts items={[['Descuento total', '$' + money(desc)], ['Sueldo neto', '$' + money(neto), 'accent']]} />
      </>}
    </Split>
  );
}
