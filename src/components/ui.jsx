import React, { useEffect, useRef } from 'react';
import { money } from '../utils';

/* ---------- piezas de interfaz ---------- */
export function Field({ id, label, value, onChange, suffix, hint, inputMode = 'decimal', placeholder, onKeyDown, inputRef, disabled }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="box">
        <input id={id} ref={inputRef} type="text" inputMode={inputMode} value={value} placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)} onKeyDown={onKeyDown} autoComplete="off" spellCheck={false} disabled={disabled} />
        {suffix && <span className="suffix">{suffix}</span>}
      </div>
      {hint && <small>{hint}</small>}
    </div>
  );
}
export const Fields = ({ children }) => <div className="fields">{children}</div>;
export function Console({ name, lines }) {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; });
  return (
    <figure className="console" aria-label="Salida de consola">
      <figcaption className="console-bar">
        <span className="console-title">C:\ejercicios\{name}.exe</span>
        <span className="win" aria-hidden="true"><i>–</i><i>□</i><i>×</i></span>
      </figcaption>
      <div className="console-body" ref={ref}>
        {lines.map((l, i) => <div key={i} className={'cl cl-' + l[0]}>{l[1] === '' || l[1] == null ? '\u00a0' : String(l[1])}</div>)}
        <div className="cl cursor">_</div>
      </div>
    </figure>
  );
}
export function Readouts({ items }) {
  return (
    <dl className="readouts">
      {items.map(([k, v, tone], i) => (
        <div key={i} className={'readout ' + (tone || '') + (String(v).length > 11 ? ' long' : '')}><dt>{k}</dt><dd>{v}</dd></div>
      ))}
    </dl>
  );
}
export const Split = ({ children, con }) => (
  <div className="split"><div className="controls">{children}</div><div className="output">{con}</div></div>
);
export const Btn = ({ children, onClick, kind, disabled, type = 'button' }) => (
  <button type={type} className={'btn ' + (kind || '')} onClick={onClick} disabled={disabled}>{children}</button>
);
export const Msg = ({ tone = 'bad', children }) => <p className={'msg ' + tone} role="status">{children}</p>;
export function Tries({ values, onPick, label = 'Probar con' }) {
  return (
    <div className="tries"><span>{label}</span>
      {values.map((v) => <button key={v} type="button" className="try" onClick={() => onPick(String(v))}>{v}</button>)}
    </div>
  );
}
export function StackBar({ parts }) {
  const total = parts.reduce((a, p) => a + p.value, 0) || 1;
  return (
    <div className="stack">
      <div className="stack-track">
        {parts.map((p, i) => p.value > 0 && <span key={i} className={'seg seg-' + i} style={{ width: (p.value / total) * 100 + '%' }} />)}
      </div>
      <div className="stack-legend">
        {parts.map((p, i) => <span key={i}><i className={'dot seg-' + i} />{p.label}: ${money(p.value)}</span>)}
      </div>
    </div>
  );
}
export function Meter({ value, max, mark, tone }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="meter" aria-hidden="true">
      <div className={'meter-fill ' + (tone || '')} style={{ width: pct + '%' }} />
      {mark != null && <div className="meter-mark" style={{ left: (mark / max) * 100 + '%' }} />}
    </div>
  );
}
export function NumList({ id, label, text, setText, gen, expected }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} rows={5} value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} />
      <div className="row">
        <Btn onClick={gen}>Generar {expected} al azar</Btn>
        <Btn kind="ghost" onClick={() => setText('')}>Vaciar</Btn>
      </div>
    </div>
  );
}
