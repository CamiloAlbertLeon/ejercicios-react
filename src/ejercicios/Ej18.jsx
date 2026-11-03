import React, { useState, useRef } from 'react';
import { ok, trunc } from '../utils';
import { Field, Fields, Console, Split, Btn, Msg } from '../components/ui';

/* ---------- 18 Primera vocal ---------- */
export const isVowel = (c) => 'aeiouáéíóúü'.includes(c.toLowerCase());
export function Ej18() {
  const [chars, setChars] = useState(['b', 'c', 'd', 'a']);
  const ref = useRef(null);
  const found = chars.find(isVowel);
  const onType = (v) => {
    if (found) return;
    const next = [...chars];
    for (const ch of v) { if (ch.trim() === '') continue; next.push(ch); if (isVowel(ch)) break; }
    setChars(next);
  };
  const lines = [];
  chars.forEach((c) => lines.push(['out', 'ingrese caracter'], ['in', c]));
  if (!found) lines.push(['out', 'ingrese caracter']);
  else lines.push(['out', ''], ['ok', 'La primera vocal ingresada fue: ' + found]);
  return (
    <Split con={<Console name="ej18" lines={trunc(lines, 14, 4)} />}>
      <Fields>
        <Field id="e18c" inputRef={ref} label={found ? 'Ya apareció una vocal' : 'Escribe un carácter a la vez'} value="" onChange={onType} inputMode="text" placeholder={found ? 'Reinicia para jugar otra vez' : 'Ej. k'} disabled={!!found} />
      </Fields>
      <div className="row">
        <Btn kind="primary" onClick={() => { setChars([]); setTimeout(() => ref.current && ref.current.focus(), 0); }}>Reiniciar</Btn>
      </div>
      <div className="letters" aria-label="Caracteres leídos">
        {chars.map((c, i) => <span key={i} className={isVowel(c) ? 'hit' : ''}>{c}</span>)}
        {!chars.length && <span className="ghost">?</span>}
      </div>
      {found ? <Msg tone="good">La primera vocal fue «{found}», en la posición {chars.indexOf(found) + 1}.</Msg> : <p className="muted">El bucle sigue pidiendo caracteres hasta que aparece una vocal.</p>}
    </Split>
  );
}
