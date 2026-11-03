import { leerLista, num, titulo, verde, ejecutar } from './lib/io.js';

export const info = {
  id: '14', titulo: 'Media de 100 números', cat: 'Series y conteos', usa: ['for'], tags: 'promedio media 100',
  enunciado: 'Lee 100 números y calcula su media.',
};

export async function main() {
  titulo(info);
  const numeros = await leerLista(100, (i) => `ingrese ${i}º numero: `, { min: 0, max: 100, enteros: false });

  let suma = 0;
  for (let i = 0; i < numeros.length; i++) suma += numeros[i];

  console.log();
  console.log(verde('la media de los 100 numeros ingresados es: ' + num(suma / numeros.length)));
}

ejecutar(main, import.meta.url);
