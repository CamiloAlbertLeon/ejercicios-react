import React, { useState } from 'react';
import { P, ok, fmt } from '../utils';
import { Field, Fields, Console, Readouts, Split, Meter } from '../components/ui';

/* ---------- 30 Promedio de dos notas ---------- */
export function Ej30() {
  const [a, setA] = useState('15'), [b, setB] = useState('14');
  const A = P(a), B = P(b);
  const lines = [['out', 'ingrese primera nota: ' + a], ['out', 'ingrese segunda nota: ' + b]];
  let pr = null;
  if (ok(A, B)) {
    if (A < 0 || A > 20 || B < 0 || B > 20) lines.push(['out', ''], ['err', 'ERROR... Las notas ingresadas no se encuentran en la escala vigesimal (0-20)']);
    else { pr = (A + B) / 2; lines.push(['out', ''], ['ok', 'Promedio: ' + fmt(pr)], [pr >= 10.5 ? 'ok' : 'err', pr >= 10.5 ? 'aprobado' : 'desaprobado']); }
  }
  return (
    <Split con={<Console name="ej30" lines={lines} />}>
      <Fields>
        <Field id="e30a" label="Primera nota" value={a} onChange={setA} suffix="/20" />
        <Field id="e30b" label="Segunda nota" value={b} onChange={setB} suffix="/20" />
      </Fields>
      {pr != null && <>
        <Meter value={pr} max={20} mark={10.5} tone={pr >= 10.5 ? 'good' : 'bad'} />
        <div className="scale"><span>0</span><span>10.5 aprueba</span><span>20</span></div>
        <Readouts items={[['Promedio', fmt(pr), 'accent'], ['Estado', pr >= 10.5 ? 'Aprobado' : 'Desaprobado', pr >= 10.5 ? 'good' : 'bad']]} />
      </>}
    </Split>
  );
}
