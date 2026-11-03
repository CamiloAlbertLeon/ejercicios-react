import React, { useState } from 'react';
import { ok, norm, rng, trunc } from '../utils';
import { Field, Console, Split, Btn, Msg, Meter } from '../components/ui';

/* ---------- 31 Deportes ---------- */
export const SPORTS = [['futbol', 'Fútbol'], ['basquet', 'Básquet'], ['voley', 'Vóley'], ['ajedrez', 'Ajedrez']];
export function Ej31() {
  const [log, setLog] = useState(() => { const r = rng(31); return Array.from({ length: 24 }, () => SPORTS[Math.floor(r() * 4)][0]); });
  const [v, setV] = useState(''), [err, setErr] = useState('');
  const full = log.length >= 400;
  const counts = Object.fromEntries(SPORTS.map(([k]) => [k, log.filter((x) => x === k).length]));
  const max = Math.max(1, ...Object.values(counts));
  const add = (k) => { if (!full) setLog((l) => [...l, k]); };
  const typed = (e) => {
    e.preventDefault();
    const k = norm(v.trim()).replace('basket', 'basquet').replace('volley', 'voley').replace('voleibol', 'voley');
    if (!SPORTS.some(([s]) => s === k)) { setErr('error deporte no valido. Escribe fútbol, básquet, vóley o ajedrez.'); return; }
    add(k); setV(''); setErr('');
  };
  const simulate = () => { const r = rng(Date.now()); setLog((l) => [...l, ...Array.from({ length: 400 - l.length }, () => SPORTS[Math.floor(r() * 4)][0])]); };
  const lines = [['out', 'LOS DEPORTES A INGRESAR PUEDEN SER FUTBOL, BASQUET, VOLEY Y AJEDREZ'], ...trunc(log.map((k, i) => ['in', `Ingrese deporte del ${i + 1}º alumno : ${k}`]), 4, 4)];
  if (full) lines.push(['out', ''], ...SPORTS.map(([k]) => ['ok', `cantidad de ${k}: ${counts[k]}`]));
  return (
    <Split con={<Console name="ej31" lines={lines} />}>
      <div className="sport-btns">{SPORTS.map(([k, l]) => <button key={k} type="button" className="sport" onClick={() => add(k)} disabled={full}><span>{l}</span><b>+1</b></button>)}</div>
      <form onSubmit={typed} className="inline-form">
        <Field id="e31d" label="O escribe el deporte" value={v} onChange={setV} inputMode="text" placeholder="Ej. ajedrez" disabled={full} />
        <Btn type="submit" kind="primary" disabled={full}>Clasificar</Btn>
      </form>
      {err && <Msg>{err}</Msg>}
      <p className={'count ' + (full ? 'good' : '')}>{log.length} de 400 personas clasificadas</p>
      <Meter value={log.length} max={400} />
      <div className="bars">{SPORTS.map(([k, l]) => (
        <div key={k} className="bar-row"><span>{l}</span><div className="bar"><i style={{ width: (counts[k] / max) * 100 + '%' }} /></div><b>{counts[k]}</b></div>
      ))}</div>
      <div className="row">
        <Btn onClick={simulate} disabled={full}>Completar las 400 al azar</Btn>
        <Btn kind="ghost" onClick={() => { setLog([]); setErr(''); }}>Reiniciar</Btn>
      </div>
    </Split>
  );
}
