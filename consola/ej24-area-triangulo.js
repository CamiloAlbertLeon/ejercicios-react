import { leerNumero, num, titulo, verde, rojo, ejecutar } from './lib/io.js';

export const info = {
  id: '24', titulo: 'Área de un triángulo', cat: 'Geometría y álgebra', usa: ['Secuencial'], tags: 'heron lados semiperimetro',
  enunciado: 'Área a partir de los tres lados con la fórmula de Herón: √(s(s−a)(s−b)(s−c)).',
};

export async function main() {
  titulo(info);
  const a = await leerNumero('ingrese lado A: ');
  const b = await leerNumero('ingrese lado B: ');
  const c = await leerNumero('ingrese lado C: ');

  if (a <= 0 || b <= 0 || c <= 0) {
    console.log(rojo('los lados deben ser mayores que 0'));
    return;
  }
  if (a + b <= c || a + c <= b || b + c <= a) {
    console.log(rojo('esos lados no forman un triangulo'));
    return;
  }

  const s = (a + b + c) / 2;
  // Corrección: el original multiplicaba s tres veces.
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  console.log(verde('El area del triangulo es: ' + num(area)));
}

ejecutar(main, import.meta.url);
