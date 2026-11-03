import React, { useState, useRef } from 'react';
import { P, ok, fmt, trunc } from '../utils';
import { Field, Console, Readouts, Split, Btn, Msg } from '../components/ui';

/* ---------- 21 / 23 Calculadora repetitiva ---------- */
export const ops = (A, B) => ({ suma: A + B, resta: A - B, mult: A * B, div: B === 0 ? null : Math.round((A / B) * 100) / 100 });
export function Calc({ mode }) {
  const diez = mode === 'diez';
  const [a, setA] = useState(''), [b, setB] = useState('');
  const [hist, setHist] = useState(diez ? [[1, 5], [12, 4], [7, 0]] : [[2, 4], [9, 3]]);
  const [ended, setEnded] = useState(false), [err, setErr] = useState('');
  const ref = useRef(null);
  const A = P(a);
  const run = (e) => {
    e.preventDefault();
    if (ended) return;
    if (!diez && A === 0) { setEnded(true); setErr(''); return; }
    const B = P(b);
    if (!ok(A, B)) { setErr('Escribe dos números válidos.'); return; }
    const nh = [...hist, [A, B]];
    setHist(nh); setA(''); setB(''); setErr('');
    if (diez && nh.length >= 10) setEnded(true);
    ref.current && ref.current.focus();
  };
  const lines = [];
  hist.forEach(([x, y], i) => {
    const o = ops(x, y);
    lines.push(['out', `PROCESO Nº${i + 1}:`], ['in', 'ingrese primer numero: ' + x], ['in', 'ingrese segundo numero: ' + y], ['ok', 'La suma es: ' + fmt(o.suma)], ['ok', 'La resta es : ' + fmt(o.resta)], ['ok', 'La multiplicacion es: ' + fmt(o.mult)], [o.div == null ? 'err' : 'ok', 'La division es: ' + (o.div == null ? 'no definida (division entre 0)' : fmt(o.div))], ['out', '']);
  });
  if (ended) { if (!diez) lines.push(['out', `PROCESO Nº${hist.length + 1}:`], ['in', 'ingrese primer numero: 0']); lines.push(['out', ''], ['ok', diez ? 'final del proceso' : 'FINAL DEL PROCESO']); }
  else lines.push(['out', `PROCESO Nº${hist.length + 1}:`]);
  const last = hist[hist.length - 1];
  return (
    <Split con={<Console name={diez ? 'ej21' : 'ej23'} lines={trunc(lines, 6, 18)} />}>
      {diez && <div className="pips" aria-label={`${hist.length} de 10 procesos`}>{Array.from({ length: 10 }, (_, i) => <span key={i} className={i < hist.length ? 'on' : ''} />)}<b>{hist.length}/10</b></div>}
      <form onSubmit={run} className="inline-form">
        <Field id={mode + 'a'} inputRef={ref} label="Primer número" value={a} onChange={setA} disabled={ended} />
        <Field id={mode + 'b'} label="Segundo número" value={b} onChange={setB} disabled={ended || (!diez && A === 0)} />
        <Btn type="submit" kind="primary" disabled={ended}>{!diez && A === 0 ? 'Terminar' : 'Procesar'}</Btn>
      </form>
      {!diez && !ended && <p className="muted">Escribe 0 como primer número para terminar el proceso.</p>}
      {err && <Msg>{err}</Msg>}
      {ended && <Msg tone="good">Final del proceso: {hist.length} {hist.length === 1 ? 'operación' : 'operaciones'}.</Msg>}
      {last && (() => { const o = ops(last[0], last[1]); return <Readouts items={[['Suma', fmt(o.suma)], ['Resta', fmt(o.resta)], ['Multiplicación', fmt(o.mult)], ['División', o.div == null ? 'no definida' : fmt(o.div), o.div == null ? 'warn' : 'accent']]} />; })()}
      <Btn kind="ghost" onClick={() => { setHist([]); setEnded(false); setErr(''); setA(''); setB(''); }}>Empezar de nuevo</Btn>
    </Split>
  );
}
export const Ej21 = () => <Calc mode="diez" />;
export const Ej23 = () => <Calc mode="cero" />;
