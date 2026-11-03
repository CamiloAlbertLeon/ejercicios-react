import { leerNumero, titulo, verde, rojo, ejecutar } from './lib/io.js';

export const info = {
  id: '05', titulo: 'Minutos a días, horas y minutos', cat: 'Tiempo', usa: ['if/else'], tags: 'conversion 1440 60 dias horas',
  enunciado: 'Convierte una cantidad de minutos en días, horas y minutos.',
};

export async function main() {
  titulo(info);
  const total = await leerNumero('ingrese un tiempo en minutos: ', { entero: true });

  if (total < 0) {
    console.log(rojo('el tiempo no puede ser negativo'));
    return;
  }

  const dias = Math.floor(total / 1440);       // 1 día = 1440 minutos
  const horas = Math.floor((total % 1440) / 60);
  const minutos = total % 60;
  console.log(verde(`equivale a ${dias} dias con ${horas} horas y ${minutos} minutos`));
}

ejecutar(main, import.meta.url);
