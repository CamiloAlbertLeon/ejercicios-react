import { leerNumero, num, titulo, verde, rojo, amarillo, ejecutar } from './lib/io.js';

export const info = {
  id: '29', titulo: 'Caja de la compañía Barner', cat: 'Dinero', usa: ['do-while'], tags: 'egresos caja chica sobrante -1',
  enunciado: 'La caja empieza con 371. Se registran egresos hasta ingresar -1; luego se muestra el total y lo que sobra.',
};

const CAJA_INICIAL = 371;

export async function main() {
  titulo(info);
  console.log(`Caja inicial: ${CAJA_INICIAL}\n`);
  let totalEgresos = 0;
  let i = 1;
  let egreso;
  do {
    egreso = await leerNumero(`Ingrese ${i} egreso (-1 para terminar): `);
    if (egreso === -1) break;          // -1 solo cierra la caja, no se suma
    if (egreso < 0) {
      console.log(rojo('  un egreso no puede ser negativo'));
      continue;
    }
    totalEgresos += egreso;
    i++;
  } while (egreso !== -1);

  const sobrante = CAJA_INICIAL - totalEgresos;
  console.log();
  console.log(verde('El total de egresos es: ' + num(totalEgresos)));
  console.log((sobrante < 0 ? rojo : verde)('Lo sobrante en caja es: ' + num(sobrante)));
  if (sobrante < 0) console.log(amarillo('Los egresos superan lo que había en caja.'));
}

ejecutar(main, import.meta.url);
