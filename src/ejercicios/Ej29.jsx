import React, { useState, useRef } from 'react';
import { P, ok, fmt, money, trunc } from '../utils';
import { Field, Fields, Console, Readouts, Split, Btn, Msg, Meter } from '../components/ui';

/* ---------- 29 Caja de la compañía Barner ---------- */
export function Ej29() {
  const [caja, setCaja] = useState('371');
  const [eg, setEg] = useState([2, 5, 4, 52, 14, 25, 5, 10, 15]);
  const [v, setV] = useState(''), [closed, setClosed] = useState(false), [err, setErr] = useState('');
  const ref = useRef(null);
  const C = P(caja);
  const total = eg.reduce((a, b) => a + b, 0);
  const resto = ok(C) ? C - total : NaN;
  const add = (e) => {
    e.preventDefault();
    const n = P(v);
    if (!ok(n)) { setErr('Escribe un monto.'); return; }
    if (n === -1) { setClosed(true); setV(''); setErr(''); return; }
    if (n < 0) { setErr('Un egreso no puede ser negativo. Escribe -1 para cerrar la caja.'); return; }
    setEg((x) => [...x, n]); setV(''); setErr(''); ref.current && ref.current.focus();
  };
  const lines = eg.map((x, i) => ['in', `Ingrese ${i + 1} egreso: ${x}`]);
  if (closed) lines.push(['in', `Ingrese ${eg.length + 1} egreso: -1`], ['out', ''], ['ok', 'El total de egresos es: ' + fmt(total)], [resto < 0 ? 'err' : 'ok', 'Lo sobrante en caja es: ' + fmt(resto)]);
  else lines.push(['out', `Ingrese ${eg.length + 1} egreso: `]);
  return (
    <Split con={<Console name="ej29" lines={trunc(lines, 6, 6)} />}>
      <Fields><Field id="e29c" label="Caja inicial del día" value={caja} onChange={setCaja} suffix="$" /></Fields>
      <form onSubmit={add} className="inline-form">
        <Field id="e29e" inputRef={ref} label="Nuevo egreso (-1 cierra la caja)" value={v} onChange={setV} disabled={closed} suffix="$" />
        <Btn type="submit" kind="primary" disabled={closed}>Registrar</Btn>
      </form>
      {err && <Msg>{err}</Msg>}
      <Meter value={Math.max(resto, 0)} max={Math.max(C, 1)} tone={resto < 0 ? 'bad' : ''} />
      <Readouts items={[['Egresos registrados', eg.length], ['Total de egresos', '$' + money(total)], ['Queda en caja', '$' + money(resto), resto < 0 ? 'bad' : 'accent']]} />
      {resto < 0 && <Msg tone="warn">Los egresos superan lo que había en caja.</Msg>}
      <Btn kind="ghost" onClick={() => { setEg([]); setClosed(false); setErr(''); }}>Nuevo día</Btn>
    </Split>
  );
}
