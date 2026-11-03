import { leerNumero, num, titulo, verde, rojo, ejecutar } from './lib/io.js';

export const info = {
  id: '02', titulo: 'Descuento escalonado del sueldo', cat: 'Dinero', usa: ['if/else'], tags: 'tramos neto 10% 5% 3%',
  enunciado: '10 % hasta 1,000; 5 % de lo que pase de 1,000 hasta 2,000; 3 % de lo que pase de 2,000.',
};

export async function main() {
  titulo(info);
  const sueldo = await leerNumero('ingrese el sueldo: ');

  if (sueldo < 0) {
    console.log(rojo('error el sueldo no puede ser negativo'));
    return;
  }

  let descuento;
  if (sueldo <= 1000) {
    descuento = sueldo * 0.10;
  } else if (sueldo <= 2000) {
    descuento = 1000 * 0.10 + (sueldo - 1000) * 0.05;
  } else {
    descuento = 1000 * 0.10 + 1000 * 0.05 + (sueldo - 2000) * 0.03;
  }
  console.log(verde(`el descuento es: ${num(descuento)} y el sueldo neto es: ${num(sueldo - descuento)}`));
}

ejecutar(main, import.meta.url);
