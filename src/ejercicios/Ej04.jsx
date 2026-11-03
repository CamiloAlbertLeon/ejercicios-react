import React, { useState } from 'react';
import { P, ok } from '../utils';
import { Field, Fields, Console, Readouts, Split, Tries } from '../components/ui';

/* ---------- 04 Segundos a minutos ---------- */
export function Ej04() {
  const [s, setS] = useState('520');
  const S = P(s);
  const lines = [['out', 'ingrese el tiempo en segundos'], ['in', s]];
  let r = null;
  if (ok(S)) {
    if (!Number.isInteger(S)) lines.push(['err', 'ingresa una cantidad entera de segundos']);
    else if (S <= 0) lines.push(['err', 'la cantidad de segundos debe ser un numero positivo']);
    else {
      const min = Math.floor(S / 60), sob = S % 60, falta = sob === 0 ? 0 : 60 - sob;
      r = { min, sob, falta };
      lines.push(['ok', S < 60
        ? `Le falta ${falta} segundos para convertirse en minuto`
        : `equivale a ${min} minutos y ${sob} segundos; le faltan ${falta} para el siguiente minuto`]);
    }
  }
  const C = 2 * Math.PI * 44;
  return (
    <Split con={<Console name="ej04" lines={lines} />}>
      <Fields><Field id="e4s" label="Tiempo" value={s} onChange={setS} suffix="s" inputMode="numeric" /></Fields>
      <Tries values={[45, 60, 520, 3599]} onPick={setS} />
      {r && <div className="ring-row">
        <svg viewBox="0 0 110 110" className="ring" role="img" aria-label={`${r.sob} de 60 segundos del minuto en curso`}>
          <circle cx="55" cy="55" r="44" className="ring-track" />
          <circle cx="55" cy="55" r="44" className="ring-fill" strokeDasharray={`${(r.sob / 60) * C} ${C}`} transform="rotate(-90 55 55)" />
          <text x="55" y="52" textAnchor="middle" className="ring-big">{r.sob}</text>
          <text x="55" y="70" textAnchor="middle" className="ring-small">de 60 s</text>
        </svg>
        <Readouts items={[['Minutos completos', r.min], ['Segundos sobrantes', r.sob], ['Faltan para el siguiente minuto', r.falta + ' s', 'accent']]} />
      </div>}
    </Split>
  );
}
