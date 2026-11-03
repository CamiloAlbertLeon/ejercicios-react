import { leerNumero, num, titulo, verde, rojo, ejecutar } from './lib/io.js';

export const info = {
  id: '23', titulo: 'Calculadora hasta ingresar 0', cat: 'Calculadoras', usa: ['do-while'], tags: 'suma diferencia producto division',
  enunciado: 'Suma, diferencia, producto y división. Termina cuando el primer número es 0.',
};

export async function main() {
  titulo(info);
  let proceso = 1;
  let a;
  do {
    console.log(`PROCESO Nº${proceso}:`);
    a = await leerNumero('ingrese primer numero: ');
    if (a !== 0) {
      const b = await leerNumero('ingrese segundo numero: ');
      console.log(verde('La suma es: ' + num(a + b)));
      console.log(verde('La diferencia es : ' + num(a - b)));
      console.log(verde('El producto es: ' + num(a * b)));
      if (b === 0) console.log(rojo('La division es: no definida (division entre 0)'));
      else console.log(verde('La division es: ' + num(a / b)));
      console.log();
    }
    proceso++;
  } while (a !== 0);
  console.log();
  console.log(verde('FINAL DEL PROCESO'));
}

ejecutar(main, import.meta.url);
