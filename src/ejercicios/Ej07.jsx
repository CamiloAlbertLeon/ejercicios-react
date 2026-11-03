import React, { useState, useRef } from 'react';
import { P, ok, fmt, money } from '../utils';
import { Console, Readouts, Split, Btn } from '../components/ui';
import { salarioExtra } from './Ej01';

/* ---------- 07 Suma de salarios ---------- */
export function Ej07() {
  const [rows, setRows] = useState([{ id: 1, h: '40', t: '120' }, { id: 2, h: '45', t: '150' }, { id: 3, h: '38', t: '200' }]);
  const [extra, setExtra] = useState(true);
  const nid = useRef(4);
  const upd = (id, k, v) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [k]: v } : r)));
  const calc = rows.map((r) => {
    const H = P(r.h), T = P(r.t);
    if (!ok(H, T) || H < 0 || T < 0) return null;
    return extra ? salarioExtra(H, T).s : H * T;
  });
  const total = calc.reduce((a, c) => a + (c || 0), 0);
  const lines = [['out', 'ingrese la cantidad de trabajadores: ' + rows.length]];
  rows.forEach((r, i) => lines.push(['out', ` trabajador ${i + 1}: `], ['in', ' horas trabajadas : ' + r.h], ['in', ' tarifa : ' + r.t], ['out', '']));
  lines.push(['ok', 'la suma de los salarios es : ' + fmt(total)]);
  return (
    <Split con={<Console name="ej07" lines={lines} />}>
      <div className="tablewrap">
        <table className="tbl edit">
          <thead><tr><th>#</th><th>Horas</th><th>Tarifa</th><th className="num">Salario</th><th><span className="sr">Quitar</span></th></tr></thead>
          <tbody>{rows.map((r, i) => (
            <tr key={r.id}>
              <td>{i + 1}</td>
              <td><input id={'e7h' + r.id} aria-label={`Horas del trabajador ${i + 1}`} inputMode="decimal" value={r.h} onChange={(e) => upd(r.id, 'h', e.target.value)} /></td>
              <td><input id={'e7t' + r.id} aria-label={`Tarifa del trabajador ${i + 1}`} inputMode="decimal" value={r.t} onChange={(e) => upd(r.id, 't', e.target.value)} /></td>
              <td className="num">{calc[i] == null ? '—' : '$' + money(calc[i])}</td>
              <td><button type="button" className="x" aria-label={`Quitar trabajador ${i + 1}`} onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))}>×</button></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
      <div className="row">
        <Btn onClick={() => setRows((rs) => [...rs, { id: nid.current++, h: '40', t: '100' }])}>Agregar trabajador</Btn>
        <label className="check-toggle"><input id="e7x" type="checkbox" checked={extra} onChange={(e) => setExtra(e.target.checked)} /> Pagar horas extra (+50 % después de 40 h)</label>
      </div>
      <Readouts items={[['Trabajadores', rows.length], ['Suma de salarios', '$' + money(total), 'accent']]} />
    </Split>
  );
}
