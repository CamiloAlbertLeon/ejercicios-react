import { leerLista, titulo, verde, ejecutar } from './lib/io.js';

export const info = {
  id: '12', titulo: 'Pares, impares, positivos y negativos', cat: 'Series y conteos', usa: ['for', 'if/else'], tags: '50 numeros contar paridad signo',
  enunciado: 'Lee 50 números enteros y cuenta pares, impares, positivos y negativos.',
};

export async function main() {
  titulo(info);
  const numeros = await leerLista(50, (i) => `ingrese ${i}º numero: `, { min: -99, max: 99 });

  let pares = 0, impares = 0, positivos = 0, negativos = 0, ceros = 0;
  for (const n of numeros) {
    if (n % 2 === 0) pares++;
    else impares++;

    if (n > 0) positivos++;
    else if (n < 0) negativos++;
    else ceros++; // el original contaba el 0 como negativo
  }

  console.log();
  console.log(verde('la cantidad de numeros pares es: ' + pares));
  console.log(verde('la cantidad de numeros impares es: ' + impares));
  console.log(verde('la cantidad de numeros negativos es: ' + negativos));
  console.log(verde('la cantidad de numeros positivos es: ' + positivos));
  console.log(verde('la cantidad de ceros es: ' + ceros));
}

ejecutar(main, import.meta.url);
