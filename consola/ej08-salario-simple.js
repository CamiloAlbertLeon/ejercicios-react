import { leerNumero, num, titulo, verde, ejecutar } from './lib/io.js';

export const info = {
  id: '08', titulo: 'Salario por horas', cat: 'Dinero', usa: ['Secuencial'], tags: 'sueldo tarifa',
  enunciado: 'Multiplica las horas trabajadas por la tarifa.',
};

export async function main() {
  titulo(info);
  const horas = await leerNumero('ingrese horas trabajadas: ');
  const tarifa = await leerNumero('ingrese tarifa: ');
  const salario = horas * tarifa;
  console.log(verde('El salario del trabajador es: ' + num(salario)));
}

ejecutar(main, import.meta.url);
