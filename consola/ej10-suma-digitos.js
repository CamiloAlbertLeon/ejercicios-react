import { leerLinea, titulo, verde, rojo, ejecutar } from './lib/io.js';

export const info = {
  id: '10', titulo: 'Suma de los dígitos', cat: 'Series y conteos', usa: ['do-while'], tags: 'digitos residuo modulo 10',
  enunciado: 'Suma los dígitos de un número tomando el último con % 10 en cada vuelta.',
};

export async function main() {
  titulo(info);
  let texto = await leerLinea('ingresar un numero: ');
  while (!/^-?\d+$/.test(texto)) {
    console.log(rojo('  Escribe un número entero.'));
    texto = await leerLinea('ingresar un numero: ');
  }

  // BigInt permite números de cualquier tamaño (el int de C# llega a 10 dígitos).
  let numero = BigInt(texto.replace('-', ''));
  let suma = 0n;
  do {
    suma += numero % 10n;
    numero = numero / 10n;
  } while (numero !== 0n);

  console.log();
  console.log(verde('la suma de los digitos es: ' + suma));
}

ejecutar(main, import.meta.url);
