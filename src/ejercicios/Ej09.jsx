import React, { useState } from 'react';
import { P, ok, fmt, avg, trunc } from '../utils';
import { Field, Console, Readouts, Split, Btn, Msg } from '../components/ui';

/* ---------- 09 Notas aprobadas y desaprobadas ---------- */
export function Ej09() {
  const [notas, setNotas] = useState([15, 14, 10, 5, 9]);
  const [v, setV] = useState(''), [err, setErr] = useState('');
  const add = (e) => {
    e.preventDefault();
    const n = P(v);
    if (!ok(n) || n < 0 || n > 20) { setErr('La nota debe ser un número entre 0 y 20.'); return; }
    setNotas((a) => [...a, n]); setV(''); setErr('');
  };
  const des = notas.filter((n) => n <= 10.5), apr = notas.filter((n) => n > 10.5);
  const show = (x) => (Number.isFinite(x) ? fmt(x, 1) : '—');
  const lines = [];
  notas.forEach((n, i) => lines.push(['in', ' Introduce la nota: ' + n], ['out', ' ¿deseas ingresar otra nota?: ' + (i === notas.length - 1 ? 'no' : 'si')]));
  lines.push(['out', ''], ['ok', 'la cantidad de notas desaprobadas es: ' + des.length], ['ok', 'la cantidad de notas aprobadas es: ' + apr.length],
    ['ok', 'el promedio de las notas aprobadas es: ' + show(avg(apr))], ['ok', 'el promedio de las notas desaprobadas es: ' + show(avg(des))], ['ok', 'el promedio final es: ' + show(avg(notas))]);
  return (
    <Split con={<Console name="ej09" lines={trunc(lines, 10, 7)} />}>
      <form onSubmit={add} className="inline-form">
        <Field id="e9n" label="Nueva nota (0 a 20)" value={v} onChange={setV} placeholder="Ej. 16" />
        <Btn type="submit" kind="primary">Agregar</Btn>
      </form>
      {err && <Msg>{err}</Msg>}
      <div className="chips" aria-label="Notas ingresadas">
        {notas.map((n, i) => (
          <span key={i} className={'chip ' + (n > 10.5 ? 'good' : 'bad')}>{n}
            <button type="button" aria-label={`Quitar la nota ${n}`} onClick={() => setNotas((a) => a.filter((_, j) => j !== i))}>×</button>
          </span>
        ))}
        {!notas.length && <span className="muted">Aún no hay notas. Escribe una y pulsa Agregar.</span>}
      </div>
      <Readouts items={[['Aprobadas (más de 10.5)', apr.length, 'good'], ['Desaprobadas', des.length, 'bad'], ['Promedio aprobadas', show(avg(apr))], ['Promedio desaprobadas', show(avg(des))], ['Promedio general', show(avg(notas)), 'accent']]} />
    </Split>
  );
}
