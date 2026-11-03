import { leerLinea, titulo, verde, rojo, ejecutar } from './lib/io.js';

export const info = {
  id: '32', titulo: 'Fiesta con cinco claves', cat: 'Texto y juegos', usa: ['if/else'], tags: 'claves contraseña invitado anidado',
  enunciado: 'Pide 5 claves en orden. Una sola incorrecta y no entras.',
};

const CLAVES = ['tienes', 'que ser', 'invitado', 'para', 'ingresar'];
const ORDINAL = ['primera', 'segunda', 'tercera', 'cuarta', 'quinta'];
const igual = (texto, clave) => texto.toLowerCase().replace(/\s+/g, ' ') === clave;

export async function main() {
  titulo(info);
  // if anidados, como en el programa original
  if (igual(await leerLinea(`ingrese ${ORDINAL[0]} clave: `), CLAVES[0])) {
    if (igual(await leerLinea(`ingrese ${ORDINAL[1]} clave: `), CLAVES[1])) {
      if (igual(await leerLinea(`ingrese ${ORDINAL[2]} clave: `), CLAVES[2])) {
        if (igual(await leerLinea(`ingrese ${ORDINAL[3]} clave: `), CLAVES[3])) {
          if (igual(await leerLinea(`ingrese ${ORDINAL[4]} clave: `), CLAVES[4])) {
            console.log();
            console.log(verde('BIENVENIDO A LA FIESTA'));
            return;
          }
        }
      }
    }
  }
  console.log(rojo('TE EQUIVOCASTE DE FIESTA'));
}

ejecutar(main, import.meta.url);
