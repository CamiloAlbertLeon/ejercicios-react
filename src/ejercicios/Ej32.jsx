import React, { useState, useRef } from 'react';
import { ok, norm, ORD } from '../utils';
import { Field, Console, Split, Btn } from '../components/ui';

/* ---------- 32 Fiesta con claves ---------- */
export const KEYS = ['tienes', 'que ser', 'invitado', 'para', 'ingresar'];
export function Ej32() {
  const [vals, setVals] = useState(['tienes', 'que ser']);
  const [status, setStatus] = useState('pending');
  const [v, setV] = useState(''), [hint, setHint] = useState(false);
  const ref = useRef(null);
  const step = vals.length;
  const submit = (e) => {
    e.preventDefault();
    if (status !== 'pending') return;
    const t = v.trim();
    const nv = [...vals, t];
    setVals(nv); setV('');
    if (norm(t).replace(/\s+/g, ' ') !== KEYS[step]) setStatus('fail');
    else if (nv.length === 5) setStatus('ok');
    ref.current && ref.current.focus();
  };
  const lines = vals.map((x, i) => ['in', `ingrese ${ORD[i]} clave:  ${x}`]);
  if (status === 'fail') lines.push(['err', 'TE EQUIVOCASTE DE FIESTA']);
  else if (status === 'ok') lines.push(['out', ''], ['ok', 'BIENVENIDO A LA FIESTA']);
  else lines.push(['out', `ingrese ${ORD[step]} clave: `]);
  return (
    <Split con={<Console name="ej32" lines={lines} />}>
      <div className={'door ' + status}>
        <div className="slots">{KEYS.map((_, i) => <span key={i} className={i < step ? (status === 'fail' && i === step - 1 ? 'bad' : 'good') : i === step && status === 'pending' ? 'now' : ''}>{i + 1}</span>)}</div>
        <p className="door-msg">{status === 'ok' ? 'BIENVENIDO A LA FIESTA' : status === 'fail' ? 'TE EQUIVOCASTE DE FIESTA' : `Falta${5 - step === 1 ? '' : 'n'} ${5 - step} clave${5 - step === 1 ? '' : 's'}`}</p>
      </div>
      <form onSubmit={submit} className="inline-form">
        <Field id="e32k" inputRef={ref} label={status === 'pending' ? `Clave ${step + 1}` : 'Puerta cerrada'} value={v} onChange={setV} inputMode="text" disabled={status !== 'pending'} />
        <Btn type="submit" kind="primary" disabled={status !== 'pending'}>Entrar</Btn>
      </form>
      <div className="row">
        <Btn kind="ghost" onClick={() => { setVals([]); setStatus('pending'); setV(''); }}>Intentar de nuevo</Btn>
        <label className="check-toggle"><input id="e32h" type="checkbox" checked={hint} onChange={(e) => setHint(e.target.checked)} /> Mostrar las claves</label>
      </div>
      {hint && <ol className="keys">{KEYS.map((k) => <li key={k}><code>{k.toUpperCase()}</code></li>)}</ol>}
    </Split>
  );
}
