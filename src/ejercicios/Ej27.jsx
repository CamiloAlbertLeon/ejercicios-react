import React, { useState } from 'react';
import { ok, fmt, money, randInts, parseNums, trunc } from '../utils';
import { Console, Readouts, Split, Msg, NumList } from '../components/ui';

/* ---------- 27 Consumos del restaurante ---------- */
export function Ej27() {
  const [txt, setTxt] = useState(() => randInts(130, 20, 260, 27).join(' '));
  const { nums, bad } = parseNums(txt);
  const valid = nums.filter((n) => n >= 0);
  const rows = valid.map((c) => ({ c, d: c > 130 ? c * 0.15 : 0 }));
  const bruto = valid.reduce((a, b) => a + b, 0), desc = rows.reduce((a, r) => a + r.d, 0);
  const lines = [...trunc(valid.map((c, i) => ['in', `Ingrese ${i + 1}º consumo: ${c}`]), 5, 2), ['out', ''], ['ok', 'El total de los consumos es: ' + fmt(bruto - desc)], ['ok', 'FIN DEL PROCESO']];
  return (
    <Split con={<Console name="ej27" lines={lines} />}>
      <NumList id="e27l" label="Consumos en $ (separados por espacios)" text={txt} setText={setTxt} expected={130} gen={() => setTxt(randInts(130, 20, 260).join(' '))} />
      {(bad > 0 || valid.length !== nums.length) && <Msg tone="warn">Se ignoraron {bad + nums.length - valid.length} valores no válidos.</Msg>}
      <p className={'count ' + (valid.length === 130 ? 'good' : 'warn')}>{valid.length} de 130 consumos</p>
      <Readouts items={[['Con descuento (más de $130)', rows.filter((r) => r.d > 0).length], ['Suma sin descuento', '$' + money(bruto)], ['Descuentos aplicados', '$' + money(desc)], ['Total cobrado', '$' + money(bruto - desc), 'accent']]} />
    </Split>
  );
}
