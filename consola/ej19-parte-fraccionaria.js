import { leerNumero, titulo, verde, ejecutar } from './lib/io.js';

export const info = {
  id: '19', titulo: '¿Tiene parte fraccionaria?', cat: 'Geometría y álgebra', usa: ['if/else'], tags: 'decimal entero truncate',
  enunciado: 'Compara el número con su parte entera (Math.Truncate en C#, Math.trunc en JavaScript).',
};

export async function main() {
  titulo(info);
  const n = await leerNumero('ingrese un numero: ');
  if (n !== Math.trunc(n)) console.log(verde('tiene parte fraccionaria'));
  else console.log(verde('no tiene parte fraccionaria'));
}

ejecutar(main, import.meta.url);
