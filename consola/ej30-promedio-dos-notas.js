import { leerNumero, num, titulo, verde, rojo, ejecutar } from './lib/io.js';

export const info = {
  id: '30', titulo: 'Promedio de dos notas', cat: 'Notas', usa: ['if/else'], tags: 'aprobado desaprobado vigesimal',
  enunciado: 'Promedia dos notas de 0 a 20. Aprueba con 10.5 o más.',
};

export async function main() {
  titulo(info);
  const n1 = await leerNumero('ingrese primera nota: ');
  const n2 = await leerNumero('ingrese segunda nota: ');
  console.log();
  if (n1 < 0 || n1 > 20 || n2 < 0 || n2 > 20) {
    console.log(rojo('ERROR... Las notas ingresadas no se encuentran en la escala vigesimal (0-20)'));
    return;
  }
  const promedio = (n1 + n2) / 2;
  console.log(verde('Promedio: ' + num(promedio)));
  if (promedio >= 10.5) console.log(verde('aprobado'));
  else console.log(rojo('desaprobado'));
}

ejecutar(main, import.meta.url);
