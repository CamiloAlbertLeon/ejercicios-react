import { leerNumero, num, titulo, verde, rojo, ejecutar } from './lib/io.js';

export const info = {
  id: '25', titulo: 'Hipotenusa (Pitágoras)', cat: 'Geometría y álgebra', usa: ['Secuencial'], tags: 'catetos pitagoras triangulo rectangulo',
  enunciado: 'Calcula la hipotenusa a partir de los dos catetos.',
};

export async function main() {
  titulo(info);
  const a = await leerNumero('Ingrese primer cateto: ');
  const b = await leerNumero('Ingrese segundo cateto: ');
  if (a <= 0 || b <= 0) {
    console.log(rojo('los catetos deben ser mayores que 0'));
    return;
  }
  const hipotenusa = Math.sqrt(a * a + b * b);
  console.log();
  console.log(verde('La hipotenusa es: ' + num(hipotenusa)));
}

ejecutar(main, import.meta.url);
