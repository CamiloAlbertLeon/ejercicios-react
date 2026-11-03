import { leerNumero, num, titulo, verde, rojo, ejecutar } from './lib/io.js';

export const info = {
  id: '11', titulo: 'Factura con IVA', cat: 'Dinero', usa: ['if/else'], tags: 'iva 15% descuento 5% pesetas articulos',
  enunciado: 'IVA de 15 %. Si el precio bruto pasa de 50 pesetas se aplica un descuento de 5 %.',
};

export async function main() {
  titulo(info);
  const precio = await leerNumero('ingrese el precio: ');
  const articulos = await leerNumero('ingrese numero de articulos: ', { entero: true });

  if (precio < 0 || articulos < 0) {
    console.log(rojo('precio y cantidad deben ser positivos'));
    return;
  }

  const venta = precio * articulos;
  const iva = venta * 0.15;
  const bruto = venta + iva;
  const descuento = bruto > 50 ? bruto * 0.05 : 0;
  const total = bruto - descuento;

  console.log('\n Datos de la factura \n');
  console.log(verde(' Precio de venta : ' + num(venta)));
  console.log(verde(' Impuesto sobre el valor añadido (IVA) es: ' + num(iva)));
  console.log(verde(' Precio bruto es : ' + num(bruto)));
  console.log(verde(' Descuento es : ' + num(descuento)));
  console.log(verde(' Total a pagar: ' + num(total)));
}

ejecutar(main, import.meta.url);
