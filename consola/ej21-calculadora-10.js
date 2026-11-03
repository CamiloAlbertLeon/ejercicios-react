import { leerNumero, num, titulo, verde, rojo, ejecutar } from './lib/io.js';

export const info = {
  id: '21', titulo: 'Calculadora de 10 procesos', cat: 'Calculadoras', usa: ['do-while'], tags: 'suma resta multiplicacion division contador',
  enunciado: 'Suma, resta, multiplicación y división de dos números. Termina después de 10 procesos.',
};

export async function main() {
  titulo(info);
  let proceso = 1;
  do {
    console.log(`PROCESO Nº${proceso}:`);
    const a = await leerNumero('ingrese primer numero: ');
    const b = await leerNumero('ingrese segundo numero: ');
    console.log(verde('La suma es: ' + num(a + b)));
    console.log(verde('La resta es : ' + num(a - b)));
    console.log(verde('La multiplicacion es: ' + num(a * b)));
    if (b === 0) console.log(rojo('La division es: no definida (division entre 0)'));
    else console.log(verde('La division es: ' + num(a / b)));
    console.log();
    proceso++;
  } while (proceso <= 10);
  console.log(verde('final del proceso'));
}

ejecutar(main, import.meta.url);
