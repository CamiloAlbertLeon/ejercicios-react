import React, { useState } from 'react';
import { P, ok, fmt, money } from '../utils';
import { Field, Fields, Console, Split, Tries } from '../components/ui';

/* ---------- 11 Factura con IVA ---------- */
export function Ej11() {
  const [p, setP] = useState('25'), [q, setQ] = useState('40');
  const Pr = P(p), Q = P(q);
  const lines = [['out', 'ingrese el precio: ' + p], ['out', 'ingrese numero de articulos: ' + q]];
  let r = null;
  if (ok(Pr, Q) && Pr >= 0 && Q >= 0) {
    const venta = Pr * Q, iva = Math.round(venta * 0.15 * 100) / 100, bruto = venta + iva;
    const desc = bruto > 50 ? Math.round(bruto * 5) / 100 : 0;
    r = { venta, iva, bruto, desc, total: bruto - desc };
    lines.push(['out', ''], ['out', ' Datos de la factura '], ['out', ''], ['ok', ' Precio de venta : ' + fmt(venta)], ['ok', ' Impuesto sobre el valor añadido (IVA) es: ' + fmt(iva)],
      ['ok', ' Precio bruto es : ' + fmt(bruto)], ['ok', ' Descuento es : ' + fmt(desc)], ['ok', ' Total a pagar: ' + fmt(r.total)]);
  } else if (p && q) lines.push(['err', 'precio y cantidad deben ser números positivos']);
  return (
    <Split con={<Console name="ej11" lines={lines} />}>
      <Fields>
        <Field id="e11p" label="Precio unitario" value={p} onChange={setP} suffix="pts" />
        <Field id="e11q" label="Unidades" value={q} onChange={setQ} inputMode="numeric" />
      </Fields>
      <Tries values={[1, 2, 40]} onPick={setQ} label="Unidades" />
      {r && (
        <div className="ticket">
          <div className="ticket-head">FACTURA</div>
          {[['Precio de venta', r.venta], ['IVA 15 %', r.iva], ['Precio bruto', r.bruto], [r.bruto > 50 ? 'Descuento 5 %' : 'Descuento (bruto ≤ 50)', -r.desc]].map(([k, val]) => (
            <div key={k} className="ticket-line"><span>{k}</span><i /><span>{money(val)}</span></div>
          ))}
          <div className="ticket-line total"><span>Total a pagar</span><i /><span>{money(r.total)} pts</span></div>
        </div>
      )}
    </Split>
  );
}
