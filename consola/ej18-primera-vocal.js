import { leerLinea, titulo, verde, ejecutar } from './lib/io.js';

export const info = {
  id: '18', titulo: 'Primera vocal leída', cat: 'Texto y juegos', usa: ['do-while'], tags: 'caracteres vocal letras',
  enunciado: 'Lee caracteres uno a uno y muestra la primera vocal que aparece.',
};

const esVocal = (c) => 'aeiouáéíóúü'.includes(c.toLowerCase());

export async function main() {
  titulo(info);
  let caracter;
  do {
    const linea = await leerLinea('ingrese caracter: ');
    caracter = linea.charAt(0); // si escribe varios, se toma el primero
  } while (!caracter || !esVocal(caracter));

  console.log();
  console.log(verde('La primera vocal ingresada fue: ' + caracter));
}

ejecutar(main, import.meta.url);
