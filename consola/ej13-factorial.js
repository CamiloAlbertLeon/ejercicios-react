import { leerNumero, titulo, verde, rojo, amarillo, ejecutar } from './lib/io.js';

export const info = {
  id: '13', titulo: 'Factorial de un número', cat: 'Series y conteos', usa: ['for'], tags: 'factorial bigint desbordamiento',
  enunciado: 'Calcula n! multiplicando de 1 hasta n.',
};

export async function main() {
  titulo(info);
  const n = await leerNumero('ingresar numero: ', { entero: true });

  if (n < 0) {
    console.log(rojo('el factorial solo existe para enteros no negativos'));
    return;
  }

  let factorial = 1n;            // BigInt: no se desborda
  let comoInt = 1;               // lo que haría un int de 32 bits en C#
  for (let i = 1; i <= n; i++) {
    factorial *= BigInt(i);
    comoInt = Math.imul(comoInt, i);
  }

  console.log('\nFactorial: ');
  console.log(verde(` ${n}! = ${factorial}`));
  if (String(comoInt) !== factorial.toString()) {
    console.log(amarillo(` Con int de C# saldría ${comoInt} porque el resultado no cabe en 32 bits.`));
  }
}

ejecutar(main, import.meta.url);
