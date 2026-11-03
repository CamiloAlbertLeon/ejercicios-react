import React, { useState } from 'react';
import { P, ok, fmt } from '../utils';
import { Field, Fields, Console, Readouts, Split } from '../components/ui';

/* ---------- 26 Circunferencia, círculo y esfera ---------- */
export function Ej26() {
  const [v, setV] = useState('4'), [pi314, setPi] = useState(false);
  const R = P(v), pi = pi314 ? 3.14 : Math.PI;
  const lines = [['out', 'Ingrese el radio de la circunferencia: ' + v]];
  let r = null;
  if (ok(R)) {
    if (R < 0) lines.push(['err', 'el radio no puede ser negativo']);
    else {
      r = { L: 2 * pi * R, A: pi * R * R, V: (4 / 3) * pi * R ** 3, orig: Math.round(3.14 * R ** 3 * 100) / 100 };
      lines.push(['out', ''], ['ok', 'Longitud de la circunferencia: ' + fmt(r.L)], ['ok', 'Area del circulo: ' + fmt(r.A)], ['ok', 'Volumen de la esfera: ' + fmt(r.V)]);
    }
  }
  return (
    <Split con={<Console name="ej26" lines={lines} />}>
      <Fields><Field id="e26r" label="Radio" value={v} onChange={setV} /></Fields>
      <label className="check-toggle"><input id="e26p" type="checkbox" checked={pi314} onChange={(e) => setPi(e.target.checked)} /> Usar π = 3.14 como el programa original</label>
      {r && <Readouts items={[['Longitud 2πr', fmt(r.L)], ['Área πr²', fmt(r.A)], ['Volumen (4/3)πr³', fmt(r.V), 'accent'], ['Volumen que daba el original', fmt(r.orig), 'bad']]} />}
    </Split>
  );
}
