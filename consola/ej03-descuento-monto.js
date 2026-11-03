import { leerNumero, num, titulo, verde, rojo, ejecutar } from './lib/io.js';

export const info = {
  id: '03', titulo: 'Descuento según el monto', cat: 'Dinero', usa: ['if/else'], tags: 'compra 10% 2% 100',
  enunciado: 'Si el monto pasa de 100 el descuento es 10 %; si no, 2 %.',
};

export async function main() {
  titulo(info);
  const monto = await leerNumero('ingrese monto: ');

  if (monto < 0) {
    console.log(rojo('error el monto no puede ser negativo'));
    return;
  }

  // Corrección: el original multiplicaba por 0.2 (20 %) en vez de 0.02 (2 %).
  const descuento = monto > 100 ? monto * 0.10 : monto * 0.02;
  console.log(verde(`el monto ${num(monto)} tiene un descuento de ${num(descuento)}`));
  console.log(verde(`total a pagar: ${num(monto - descuento)}`));
}

ejecutar(main, import.meta.url);
