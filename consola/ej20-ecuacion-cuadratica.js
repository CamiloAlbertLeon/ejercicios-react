import { leerNumero, num, titulo, verde, rojo, amarillo, ejecutar } from './lib/io.js';

export const info = {
  id: '20', titulo: 'Ecuación cuadrática', cat: 'Geometría y álgebra', usa: ['if/else'], tags: 'discriminante raices imaginarias complejas',
  enunciado: 'Resuelve ax² + bx + c = 0, incluidas las soluciones imaginarias.',
};

export async function main() {
  titulo(info);
  console.log('dada la ecuacion aX2 + bx + c = 0 ingresar los coeficientes a,b,c\n');
  const a = await leerNumero('ingrese el coeficiente a: ');
  const b = await leerNumero('ingrese el coeficiente b: ');
  const c = await leerNumero('ingrese el coeficiente c: ');

  if (a === 0) {
    console.log(rojo("esta no es una ecuacion cuadratica coeficiente 'a' debe ser diferente de 0"));
    if (b !== 0) console.log(amarillo(`como ecuacion lineal: x = ${num(-c / b, 4)}`));
    return;
  }

  const d = b * b - 4 * a * c;
  if (d > 0) {
    const x1 = (-b + Math.sqrt(d)) / (2 * a);
    const x2 = (-b - Math.sqrt(d)) / (2 * a);
    console.log(verde(` el discriminante es positivo: x1 = ${num(x1)} y x2 = ${num(x2)}`));
  } else if (d === 0) {
    console.log(verde(` el discriminante es 0, solucion unica: x = ${num(-b / (2 * a))}`));
  } else {
    const real = -b / (2 * a);
    const imag = Math.sqrt(-d) / (2 * Math.abs(a));
    console.log(verde(` discriminante es ${num(d)}: x1 = ${num(real, 3)} + ${num(imag, 4)}i , x2 = ${num(real, 3)} - ${num(imag, 4)}i`));
  }
}

ejecutar(main, import.meta.url);
