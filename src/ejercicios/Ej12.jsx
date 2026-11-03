import React, { useState } from 'react';
import { ok, randInts, parseNums, trunc } from '../utils';
import { Console, Readouts, Split, Msg, NumList } from '../components/ui';

/* ---------- 12 Pares, impares, positivos y negativos ---------- */
export function Ej12() {
  const [txt, setTxt] = useState(() => randInts(50, -99, 99, 12).join(' '));
  const { nums, bad } = parseNums(txt);
  const ints = nums.filter(Number.isInteger);
  const c = {
    par: ints.filter((n) => n % 2 === 0).length, imp: ints.filter((n) => n % 2 !== 0).length,
    pos: ints.filter((n) => n > 0).length, neg: ints.filter((n) => n < 0).length, cero: ints.filter((n) => n === 0).length,
  };
  const head = ints.map((n, i) => ['in', `ingrese ${i + 1}º numero:   ${n}`]);
  const lines = [...trunc(head, 5, 2), ['out', ''], ['ok', 'la cantidad de numeros pares es: ' + c.par], ['ok', 'la cantidad de numeros impares es: ' + c.imp],
    ['ok', 'la cantidad de numeros negativos es: ' + c.neg], ['ok', 'la cantidad de numeros positivos es: ' + c.pos], ['ok', 'la cantidad de ceros es: ' + c.cero]];
  return (
    <Split con={<Console name="ej12" lines={lines} />}>
      <NumList id="e12l" label="Números enteros (separados por espacios)" text={txt} setText={setTxt} expected={50} gen={() => setTxt(randInts(50, -99, 99).join(' '))} />
      {(bad > 0 || ints.length !== nums.length) && <Msg tone="warn">Se ignoraron {bad + nums.length - ints.length} valores que no son enteros.</Msg>}
      <p className={'count ' + (ints.length === 50 ? 'good' : 'warn')}>{ints.length} de 50 números</p>
      <div className="numgrid" aria-hidden="true">{ints.slice(0, 120).map((n, i) => <span key={i} className={(n % 2 === 0 ? 'par' : 'imp') + (n < 0 ? ' neg' : '')}>{n}</span>)}</div>
      <Readouts items={[['Pares', c.par, 'accent'], ['Impares', c.imp], ['Positivos', c.pos], ['Negativos', c.neg], ['Ceros', c.cero]]} />
    </Split>
  );
}
