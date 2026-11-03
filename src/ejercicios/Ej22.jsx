import React, { useState, useRef } from 'react';
import { P, ok, fmt, trunc } from '../utils';
import { Field, Console, Split, Btn, Msg } from '../components/ui';

/* ---------- 22 Cubo y raíz cuadrada ---------- */
export function Ej22() {
  const [v, setV] = useState(''), [hist, setHist] = useState([2, 3, 5, -5]), [ended, setEnded] = useState(false), [err, setErr] = useState('');
  const ref = useRef(null);
  const run = (e) => {
    e.preventDefault();
    const n = P(v);
    if (!ok(n)) { setErr('Escribe un número.'); return; }
    setErr(''); setV('');
    if (n === 0) { setEnded(true); return; }
    setHist((h) => [...h, n]); ref.current && ref.current.focus();
  };
  const raiz = (n) => (n >= 0 ? fmt(Math.sqrt(n)) : fmt(Math.sqrt(-n)) + 'i');
  const lines = [];
  hist.forEach((n, i) => lines.push(['out', `PROCESO Nº${i + 1}:`], ['in', 'ingrese un numero:  ' + n], ['ok', 'El cubo es: ' + fmt(n ** 3, 4)], ['ok', 'La raiz cuadrada es: ' + raiz(n)], ['out', '']));
  lines.push(['out', `PROCESO Nº${hist.length + 1}:`]);
  if (ended) lines.push(['in', 'ingrese un numero:  0'], ['out', ''], ['ok', 'FINAL DEL PROCESO']);
  return (
    <Split con={<Console name="ej22" lines={trunc(lines, 5, 16)} />}>
      <form onSubmit={run} className="inline-form">
        <Field id="e22n" inputRef={ref} label="Número (0 para terminar)" value={v} onChange={setV} disabled={ended} />
        <Btn type="submit" kind="primary" disabled={ended}>Calcular</Btn>
      </form>
      {err && <Msg>{err}</Msg>}
      {ended && <Msg tone="good">Final del proceso.</Msg>}
      <div className="tablewrap">
        <table className="tbl">
          <thead><tr><th>Nº</th><th className="num">Número</th><th className="num">Cubo</th><th className="num">Raíz cuadrada</th></tr></thead>
          <tbody>{hist.map((n, i) => <tr key={i}><td>{i + 1}</td><td className="num">{n}</td><td className="num">{fmt(n ** 3, 4)}</td><td className={'num ' + (n < 0 ? 'warn-t' : '')}>{raiz(n)}</td></tr>)}</tbody>
        </table>
      </div>
      <Btn kind="ghost" onClick={() => { setHist([]); setEnded(false); }}>Empezar de nuevo</Btn>
    </Split>
  );
}
