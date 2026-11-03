import React, { useState } from 'react';
import { ok, fmt, randInts, parseNums, trunc } from '../utils';
import { Console, Readouts, Split, Msg, NumList } from '../components/ui';

/* ---------- 14 Media de 100 números ---------- */
export function Ej14() {
  const [txt, setTxt] = useState(() => randInts(100, 0, 100, 7).join(' '));
  const { nums, bad } = parseNums(txt);
  const s = nums.reduce((a, b) => a + b, 0);
  const lines = [...trunc(nums.map((n, i) => ['in', `ingrese  ${i + 1}º numero:   ${n}`]), 5, 2), ['out', ''], ['ok', 'la media de los ' + nums.length + ' numero ingresados es: ' + (nums.length ? fmt(s / nums.length) : '—')]];
  return (
    <Split con={<Console name="ej14" lines={lines} />}>
      <NumList id="e14l" label="Números (separados por espacios)" text={txt} setText={setTxt} expected={100} gen={() => setTxt(randInts(100, 0, 100).join(' '))} />
      {bad > 0 && <Msg tone="warn">Se ignoraron {bad} valores que no son números.</Msg>}
      <p className={'count ' + (nums.length === 100 ? 'good' : 'warn')}>{nums.length} de 100 números</p>
      <Readouts items={[['Suma', fmt(s)], ['Menor', nums.length ? Math.min(...nums) : '—'], ['Mayor', nums.length ? Math.max(...nums) : '—'], ['Media', nums.length ? fmt(s / nums.length) : '—', 'accent']]} />
    </Split>
  );
}
