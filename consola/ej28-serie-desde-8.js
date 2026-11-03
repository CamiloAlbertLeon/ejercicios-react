import { leerNumero, titulo, verde, rojo, ejecutar } from './lib/io.js';

export const info = {
  id: '28', titulo: 'Suma desde 8 hasta N', cat: 'Series y conteos', usa: ['for', 'if/else'], tags: 'serie enesimo',
  enunciado: 'Calcula S = 8 + 9 + 10 + … + N.',
};

export async function main() {
  titulo(info);
  const n = await leerNumero('Ingrese el numero enesimo: ', { entero: true });
  if (n < 8) {
    console.log();
    console.log(rojo('Error el numero ingresado es menor a 8'));
    return;
  }
  let suma = 0;
  for (let x = 8; x <= n; x++) suma += x;
  console.log();
  console.log(verde(`La suma de la serie de rango 8 hasta ${n}, con un incremento de 1 es: ${suma}`));
}

ejecutar(main, import.meta.url);
