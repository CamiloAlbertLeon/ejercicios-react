import React, { useState } from 'react';
import { P, ok } from '../utils';
import { Field, Fields, Console, Readouts, Split, Btn, Msg, Tries } from '../components/ui';

/* ---------- 15 Suma y producto de pares ---------- */
export function Ej15() {
  const [a, setA] = useState('20'), [b, setB] = useState('400');
  const [full, setFull] = useState(false);
  const A = P(a), B = P(b);
  let r = null, err = '';
  if (ok(A, B)) {
    if (!Number.isInteger(A) || !Number.isInteger(B)) err = 'Usa números enteros.';
    else if (A > B) err = 'El inicio debe ser menor o igual que el final.';
    else if (B - A > 20000) err = 'Usa un rango de hasta 20 000 números.';
    else {
      let suma = 0, prod = 1n, n = 0;
      for (let x = A % 2 === 0 ? A : A + 1; x <= B; x += 2) { suma += x; prod *= BigInt(x); n++; }
      r = { suma, prod: prod.toString(), n };
    }
  }
  const lines = [['out', `Rango : numeros pares del ${a} al ${b}`], ['out', '']];
  if (r) lines.push(['ok', 'La suma es: ' + r.suma], ['ok', 'El producto es: ' + (r.prod.length > 60 ? r.prod.slice(0, 60) + '…' : r.prod)]);
  return (
    <Split con={<Console name="ej15" lines={lines} />}>
      <Fields>
        <Field id="e15a" label="Desde" value={a} onChange={setA} inputMode="numeric" />
        <Field id="e15b" label="Hasta" value={b} onChange={setB} inputMode="numeric" />
      </Fields>
      <Tries values={[30, 100, 400]} onPick={setB} label="Hasta" />
      {err && <Msg>{err}</Msg>}
      {r && <>
        <Readouts items={[['Pares en el rango', r.n], ['Suma', r.suma, 'accent'], ['Dígitos del producto', r.prod.length]]} />
        <div className="bignum"><span>Producto =</span> {full || r.prod.length <= 120 ? r.prod : r.prod.slice(0, 120) + '…'}</div>
        {r.prod.length > 120 && <Btn kind="ghost" onClick={() => setFull(!full)}>{full ? 'Mostrar menos' : `Ver los ${r.prod.length} dígitos`}</Btn>}
      </>}
    </Split>
  );
}
