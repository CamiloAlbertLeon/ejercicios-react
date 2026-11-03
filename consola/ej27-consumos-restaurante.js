import { leerLista, num, titulo, verde, ejecutar } from './lib/io.js';

export const info = {
  id: '27', titulo: 'Consumos del restaurante', cat: 'Dinero', usa: ['do-while', 'if/else'], tags: '130 consumos descuento 15% restaurant',
  enunciado: 'Suma 130 consumos. A cada consumo que pase de $130 se le descuenta un 15 %.',
};

export async function main() {
  titulo(info);
  const consumos = await leerLista(130, (i) => `Ingrese ${i}º consumo: `, { min: 20, max: 260, enteros: false });

  let total = 0;
  let i = 0;
  do {
    let consumo = consumos[i];
    if (consumo > 130) consumo = consumo - consumo * 0.15;
    total += consumo;
    i++;
  } while (i < consumos.length);

  console.log();
  console.log(verde('El total de los consumos es: ' + num(total)));
  console.log(verde('FIN DEL PROCESO'));
}

ejecutar(main, import.meta.url);
