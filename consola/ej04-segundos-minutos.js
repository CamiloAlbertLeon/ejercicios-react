import { leerNumero, titulo, verde, rojo, ejecutar } from './lib/io.js';

export const info = {
  id: '04', titulo: 'Segundos para completar minutos', cat: 'Tiempo', usa: ['if/else'], tags: 'segundos minutos residuo modulo %',
  enunciado: 'Indica los minutos completos y cuántos segundos faltan para el siguiente minuto exacto.',
};

export async function main() {
  titulo(info);
  const segundos = await leerNumero('ingrese el tiempo en segundos: ', { entero: true });

  if (segundos <= 0) {
    console.log(rojo('la cantidad de segundos debe ser un numero positivo'));
    return;
  }

  const minutos = Math.floor(segundos / 60);
  const sobrantes = segundos % 60;
  const faltan = sobrantes === 0 ? 0 : 60 - sobrantes;

  if (segundos < 60) {
    console.log(verde(`Le faltan ${faltan} segundos para convertirse en minuto`));
  } else {
    console.log(verde(`equivale a ${minutos} minutos y ${sobrantes} segundos`));
    console.log(verde(`le faltan ${faltan} segundos para el siguiente minuto`));
  }
}

ejecutar(main, import.meta.url);
