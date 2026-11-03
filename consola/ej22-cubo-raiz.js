import { leerNumero, num, titulo, verde, ejecutar } from './lib/io.js';

export const info = {
  id: '22', titulo: 'Cubo y raíz cuadrada', cat: 'Calculadoras', usa: ['do-while'], tags: 'potencia raiz repetitivo cero',
  enunciado: 'Muestra el cubo y la raíz cuadrada de cada número hasta que se ingresa 0.',
};

export async function main() {
  titulo(info);
  let proceso = 1;
  let n;
  do {
    console.log(`PROCESO Nº${proceso}:`);
    n = await leerNumero('ingrese un numero: ');
    if (n !== 0) {
      console.log(verde('El cubo es: ' + num(n ** 3, 4)));
      // La raíz de un negativo es imaginaria (el original mostraba NaN).
      const raiz = n >= 0 ? num(Math.sqrt(n)) : num(Math.sqrt(-n)) + 'i';
      console.log(verde('La raiz cuadrada es: ' + raiz));
      console.log();
    }
    proceso++;
  } while (n !== 0);
  console.log();
  console.log(verde('FINAL DEL PROCESO'));
}

ejecutar(main, import.meta.url);
