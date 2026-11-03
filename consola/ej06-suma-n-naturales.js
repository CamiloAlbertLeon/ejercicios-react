import { leerNumero, titulo, verde, rojo, gris, ejecutar } from './lib/io.js';

export const info = {
  id: '06', titulo: 'Suma de los N primeros naturales', cat: 'Series y conteos', usa: ['for'], tags: 'serie acumulador gauss',
  enunciado: 'Suma 1 + 2 + … + N con un bucle for.',
};

export async function main() {
  titulo(info);
  const n = await leerNumero('ingrese el numero N : ', { entero: true });

  if (n < 0) {
    console.log(rojo('N debe ser un entero positivo'));
    return;
  }

  let suma = 0;
  for (let x = 1; x <= n; x++) {
    suma += x;
    if (x <= 30) console.log(`n${x}: ${x}`);
    else if (x === 31) console.log(gris(`… (se omiten ${n - 30} líneas)`));
  }
  console.log();
  console.log(verde('La suma de la serie es: ' + suma));
  console.log(gris(`Comprobación con N(N+1)/2 = ${(n * (n + 1)) / 2}`));
}

ejecutar(main, import.meta.url);
