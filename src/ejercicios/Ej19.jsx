import React, { useState } from 'react';
import { P, ok, fmt } from '../utils';
import { Field, Fields, Console, Readouts, Split, Tries } from '../components/ui';

/* ---------- 19 Parte fraccionaria ---------- */
export function Ej19() {
  const [v, setV] = useState('10.5');
  const N = P(v);
  const lines = [['out', 'ingrese un numero'], ['in', v]];
  let r = null;
  if (ok(N)) {
    const has = !Number.isInteger(N);
    const s = String(v).trim().replace(',', '.');
    const [ent, frac = ''] = s.includes('.') && !/e/i.test(s) ? s.split('.') : [String(Math.trunc(N)), has ? String(Math.abs(N - Math.trunc(N))).slice(2) : ''];
    r = { has, ent, frac };
    lines.push(['ok', has ? 'tiene parte fraccionaria' : 'no tiene parte fraccionaria']);
  }
  return (
    <Split con={<Console name="ej19" lines={lines} />}>
      <Fields><Field id="e19n" label="Número" value={v} onChange={setV} /></Fields>
      <Tries values={['10.5', '7', '3.000', '-0.25']} onPick={setV} />
      {r && <>
        <div className="frac"><span className="int">{r.ent || '0'}</span><span className="sep">.</span><span className={'dec ' + (r.has ? 'on' : '')}>{r.frac || '0'}</span></div>
        <Readouts items={[['Math.Truncate', fmt(Math.trunc(N), 10)], ['¿Tiene parte fraccionaria?', r.has ? 'Sí' : 'No', r.has ? 'accent' : '']]} />
      </>}
    </Split>
  );
}
