import { leerNumero, num, titulo, verde, rojo, ejecutar } from './lib/io.js';

export const info = {
  id: '26', titulo: 'Circunferencia, círculo y esfera', cat: 'Geometría y álgebra', usa: ['Secuencial'], tags: 'radio pi longitud area volumen',
  enunciado: 'Longitud de la circunferencia, área del círculo y volumen de la esfera para un radio dado.',
};

export async function main() {
  titulo(info);
  const r = await leerNumero('Ingrese el radio de la circunferencia: ');
  if (r < 0) {
    console.log(rojo('el radio no puede ser negativo'));
    return;
  }
  const longitud = 2 * Math.PI * r;
  const area = Math.PI * r * r;
  // Corrección: en C#, 4 / 3 es división entera (vale 1). Aquí es 1.333…
  const volumen = (4 / 3) * Math.PI * r ** 3;
  console.log();
  console.log(verde('Longitud de la circunferencia: ' + num(longitud)));
  console.log(verde('Area del circulo: ' + num(area)));
  console.log(verde('Volumen de la esfera: ' + num(volumen)));
}

ejecutar(main, import.meta.url);
