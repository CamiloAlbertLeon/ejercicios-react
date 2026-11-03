import { leerNumero, num, titulo, verde, rojo, ejecutar } from './lib/io.js';

export const info = {
  id: '07', titulo: 'Suma de salarios de varios trabajadores', cat: 'Dinero', usa: ['for'], tags: 'nomina planilla trabajadores',
  enunciado: 'Pide horas y tarifa de cada trabajador (con la regla de horas extra del ejercicio 01) y suma los salarios.',
};

function salario(horas, tarifa) {
  if (horas <= 40) return horas * tarifa;
  return 40 * tarifa + (horas - 40) * tarifa * 1.5;
}

export async function main() {
  titulo(info);
  const cantidad = await leerNumero('ingrese la cantidad de trabajadores: ', { entero: true });
  if (cantidad <= 0) {
    console.log(rojo('la cantidad de trabajadores debe ser mayor que 0'));
    return;
  }

  let suma = 0;
  for (let i = 1; i <= cantidad; i++) {
    console.log(`\n trabajador ${i}: `);
    let horas = await leerNumero(' horas trabajadas : ');
    while (horas < 0) {
      console.log(rojo(' las horas no pueden ser negativas'));
      horas = await leerNumero(' horas trabajadas : ');
    }
    const tarifa = await leerNumero(' tarifa : ');
    const s = salario(horas, tarifa);
    console.log(` salario: ${num(s)}`);
    suma += s;
  }
  console.log();
  console.log(verde('la suma de los salarios es : ' + num(suma)));
}

ejecutar(main, import.meta.url);
