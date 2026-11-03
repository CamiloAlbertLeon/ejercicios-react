import { leerNumero, leerSiNo, num, titulo, verde, rojo, ejecutar } from './lib/io.js';

export const info = {
  id: '09', titulo: 'Notas aprobadas y desaprobadas', cat: 'Notas', usa: ['do-while', 'if/else'], tags: 'promedio estudiante vigesimal 20 10.5',
  enunciado: 'Cuenta notas aprobadas (más de 10.5) y desaprobadas y calcula sus promedios. Escala de 0 a 20.',
};

export async function main() {
  titulo(info);
  let aprobadas = 0, desaprobadas = 0;
  let sumaAprobadas = 0, sumaDesaprobadas = 0;
  let otra;

  do {
    let nota = await leerNumero(' Introduce la nota: ');
    while (nota < 0 || nota > 20) {
      console.log(rojo(' la nota debe estar entre 0 y 20'));
      nota = await leerNumero(' Introduce la nota: ');
    }
    if (nota > 10.5) {
      aprobadas++;
      sumaAprobadas += nota;
    } else {
      desaprobadas++;
      sumaDesaprobadas += nota;
    }
    otra = await leerSiNo(' ¿deseas ingresar otra nota? (si/no): ');
  } while (otra);

  // Si un grupo está vacío no se divide entre cero.
  const prom = (suma, n) => (n > 0 ? num(suma / n) : '—');
  console.log();
  console.log(verde('la cantidad de notas desaprobadas es: ' + desaprobadas));
  console.log(verde('la cantidad de notas aprobadas es: ' + aprobadas));
  console.log(verde('el promedio de las notas aprobadas es: ' + prom(sumaAprobadas, aprobadas)));
  console.log(verde('el promedio de las notas desaprobadas es: ' + prom(sumaDesaprobadas, desaprobadas)));
  console.log(verde('el promedio final es: ' + prom(sumaAprobadas + sumaDesaprobadas, aprobadas + desaprobadas)));
}

ejecutar(main, import.meta.url);
