import { titulo, verde, ejecutar } from './lib/io.js';

export const info = {
  id: '15', titulo: 'Suma y producto de pares del 20 al 400', cat: 'Series y conteos', usa: ['for'], tags: 'pares producto bigint rango',
  enunciado: 'Suma y multiplica los números pares entre 20 y 400.',
};

export async function main() {
  titulo(info);
  let suma = 0;
  let producto = 1n; // el producto tiene cientos de dígitos: se usa BigInt
  for (let x = 20; x <= 400; x += 2) {
    suma += x;
    producto *= BigInt(x);
  }
  const p = producto.toString();
  console.log('Rango : numeros pares del 20 al 400\n');
  console.log(verde('La suma es: ' + suma));
  console.log(verde(`El producto es (${p.length} dígitos):`));
  console.log(p.match(/.{1,70}/g).join('\n'));
}

ejecutar(main, import.meta.url);
