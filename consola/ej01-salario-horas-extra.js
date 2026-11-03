import { leerNumero, num, titulo, verde, rojo, ejecutar } from './lib/io.js';

export const info = {
  id: '01', titulo: 'Salario con horas extra', cat: 'Dinero', usa: ['if/else'], tags: 'sueldo tarifa 40 horas 50%',
  enunciado: 'Calcula el salario. Pasadas las 40 horas, cada hora extra se paga un 50 % más.',
};

export async function main() {
  titulo(info);
  const horas = await leerNumero('ingrese horas trabajadas: ');
  const tarifa = await leerNumero('ingrese tarifa: ');

  if (horas < 0) {
    console.log(rojo('las horas trabajadas no pueden ser negativas'));
    return;
  }

  let salario;
  if (horas <= 40) {
    salario = horas * tarifa;
  } else {
    const horasExtra = horas - 40;
    const tarifaExtra = tarifa * 1.5;
    salario = 40 * tarifa + horasExtra * tarifaExtra;
  }
  console.log(verde('el salario es: ' + num(salario)));
}

ejecutar(main, import.meta.url);
