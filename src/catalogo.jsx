import React from 'react';
import { norm } from './utils';
import { Ej01 } from './ejercicios/Ej01';
import { Ej02 } from './ejercicios/Ej02';
import { Ej03 } from './ejercicios/Ej03';
import { Ej04 } from './ejercicios/Ej04';
import { Ej05 } from './ejercicios/Ej05';
import { Ej06 } from './ejercicios/Ej06';
import { Ej07 } from './ejercicios/Ej07';
import { Ej08 } from './ejercicios/Ej08';
import { Ej09 } from './ejercicios/Ej09';
import { Ej10 } from './ejercicios/Ej10';
import { Ej11 } from './ejercicios/Ej11';
import { Ej12 } from './ejercicios/Ej12';
import { Ej13 } from './ejercicios/Ej13';
import { Ej14 } from './ejercicios/Ej14';
import { Ej15 } from './ejercicios/Ej15';
import { Ej18 } from './ejercicios/Ej18';
import { Ej19 } from './ejercicios/Ej19';
import { Ej20 } from './ejercicios/Ej20';
import { Ej21, Ej23 } from './ejercicios/Calculadora';
import { Ej22 } from './ejercicios/Ej22';
import { Ej24 } from './ejercicios/Ej24';
import { Ej25 } from './ejercicios/Ej25';
import { Ej26 } from './ejercicios/Ej26';
import { Ej27 } from './ejercicios/Ej27';
import { Ej28 } from './ejercicios/Ej28';
import { Ej29 } from './ejercicios/Ej29';
import { Ej30 } from './ejercicios/Ej30';
import { Ej31 } from './ejercicios/Ej31';
import { Ej32 } from './ejercicios/Ej32';

/* ---------- catálogo ---------- */
export const APPS = [
  { id: '01', title: 'Salario con horas extra', cat: 'Dinero', uses: ['if/else'], C: Ej01, tags: 'sueldo pago tarifa 40 horas 50%',
    desc: 'Calcula el salario a partir de las horas y la tarifa. Pasadas las 40 horas, cada hora extra se paga un 50 % más.' },
  { id: '02', title: 'Descuento escalonado del sueldo', cat: 'Dinero', uses: ['if/else'], C: Ej02, tags: 'tramos neto 10% 5% 3%',
    desc: 'Descuenta 10 % hasta 1,000; 5 % de lo que pase de 1,000 hasta 2,000, y 3 % de lo que pase de 2,000. Muestra el descuento y el sueldo neto.' },
  { id: '03', title: 'Descuento según el monto', cat: 'Dinero', uses: ['if/else'], C: Ej03, tags: 'compra 10% 2% 100',
    desc: 'Si el monto pasa de 100 el descuento es 10 %; si no, 2 %.', },
  { id: '04', title: 'Segundos para completar minutos', cat: 'Tiempo', uses: ['if/else'], C: Ej04, tags: 'segundos minutos residuo modulo %',
    desc: 'A partir de un tiempo en segundos, indica los minutos completos y cuántos segundos faltan para el siguiente minuto exacto.', },
  { id: '05', title: 'Minutos a días, horas y minutos', cat: 'Tiempo', uses: ['if/else'], C: Ej05, tags: 'conversion 1440 60 dias horas',
    desc: 'Convierte una cantidad de minutos en días, horas y minutos.' },
  { id: '06', title: 'Suma de los N primeros naturales', cat: 'Series y conteos', uses: ['for'], C: Ej06, tags: 'serie acumulador gauss',
    desc: 'Suma 1 + 2 + … + N con un bucle y lo compara con la fórmula N(N+1)/2.' },
  { id: '07', title: 'Suma de salarios de varios trabajadores', cat: 'Dinero', uses: ['for'], C: Ej07, tags: 'nomina planilla trabajadores lista',
    desc: 'Versión del ejercicio 01 para varios trabajadores: agrega filas y obtiene la suma de todos los salarios.', },
  { id: '08', title: 'Salario por horas', cat: 'Dinero', uses: ['Secuencial'], C: Ej08, tags: 'sueldo tarifa',
    desc: 'Multiplica las horas trabajadas por la tarifa y muestra el salario.' },
  { id: '09', title: 'Notas aprobadas y desaprobadas', cat: 'Notas', uses: ['do-while', 'if/else'], C: Ej09, tags: 'promedio estudiante vigesimal 20 10.5 calificaciones',
    desc: 'Con N notas (escala 0–20) cuenta aprobadas y desaprobadas y calcula el promedio de cada grupo y el general. Se aprueba con más de 10.5.', },
  { id: '10', title: 'Suma de los dígitos', cat: 'Series y conteos', uses: ['do-while'], C: Ej10, tags: 'digitos residuo modulo 10',
    desc: 'Suma los dígitos de un número tomando el último con % 10 en cada vuelta.', },
  { id: '11', title: 'Factura con IVA', cat: 'Dinero', uses: ['if/else'], C: Ej11, tags: 'iva 15% descuento 5% pesetas compra articulos',
    desc: 'Emite la factura de una compra: IVA de 15 % y, si el precio bruto pasa de 50 pesetas, descuento de 5 %.', },
  { id: '12', title: 'Pares, impares, positivos y negativos', cat: 'Series y conteos', uses: ['for', 'if/else'], C: Ej12, tags: '50 numeros contar paridad signo',
    desc: 'Lee 50 números enteros y cuenta cuántos son pares, impares, positivos y negativos.', },
  { id: '13', title: 'Factorial de un número', cat: 'Series y conteos', uses: ['for'], C: Ej13, tags: 'factorial bigint desbordamiento overflow',
    desc: 'Calcula n! multiplicando de 1 hasta n.', },
  { id: '14', title: 'Media de 100 números', cat: 'Series y conteos', uses: ['for'], C: Ej14, tags: 'promedio media 100',
    desc: 'Lee 100 números y calcula su media.', },
  { id: '15', title: 'Suma y producto de pares del 20 al 400', cat: 'Series y conteos', uses: ['for'], C: Ej15, tags: 'pares producto bigint rango',
    desc: 'Suma y multiplica los números pares entre 20 y 400, ambos incluidos.', },
  { id: '18', title: 'Primera vocal leída', cat: 'Texto y juegos', uses: ['do-while'], C: Ej18, tags: 'caracteres vocal teclado letras',
    desc: 'Lee caracteres uno a uno y muestra la primera vocal que aparece.', },
  { id: '19', title: '¿Tiene parte fraccionaria?', cat: 'Geometría y álgebra', uses: ['if/else'], C: Ej19, tags: 'decimal entero truncate',
    desc: 'Determina si un número tiene parte fraccionaria comparándolo con su parte entera.' },
  { id: '20', title: 'Ecuación cuadrática', cat: 'Geometría y álgebra', uses: ['if/else'], C: Ej20, tags: 'discriminante raices imaginarias complejas parabola',
    desc: 'Resuelve ax² + bx + c = 0, incluidas las soluciones imaginarias, y dibuja la parábola.', },
  { id: '21', title: 'Calculadora de 10 procesos', cat: 'Calculadoras', uses: ['do-while'], C: Ej21, tags: 'suma resta multiplicacion division contador',
    desc: 'Con dos números calcula suma, resta, multiplicación y división. Termina después de 10 procesos.', },
  { id: '22', title: 'Cubo y raíz cuadrada', cat: 'Calculadoras', uses: ['do-while'], C: Ej22, tags: 'potencia raiz repetitivo cero',
    desc: 'Muestra el cubo y la raíz cuadrada de cada número. El proceso se repite hasta que se ingresa 0.', },
  { id: '23', title: 'Calculadora hasta ingresar 0', cat: 'Calculadoras', uses: ['do-while'], C: Ej23, tags: 'suma diferencia producto division',
    desc: 'Calcula suma, diferencia, producto y división de dos números. Termina cuando el primer número es 0.', },
  { id: '24', title: 'Área de un triángulo', cat: 'Geometría y álgebra', uses: ['Secuencial'], C: Ej24, tags: 'heron lados semiperimetro',
    desc: 'Calcula el área de cualquier triángulo a partir de sus tres lados (fórmula de Herón).', },
  { id: '25', title: 'Hipotenusa (Pitágoras)', cat: 'Geometría y álgebra', uses: ['Secuencial'], C: Ej25, tags: 'catetos pitagoras triangulo rectangulo',
    desc: 'Calcula la hipotenusa de un triángulo rectángulo a partir de sus catetos.' },
  { id: '26', title: 'Circunferencia, círculo y esfera', cat: 'Geometría y álgebra', uses: ['Secuencial'], C: Ej26, tags: 'radio pi longitud area volumen',
    desc: 'Para un radio dado, calcula la longitud de la circunferencia, el área del círculo y el volumen de la esfera.', },
  { id: '27', title: 'Consumos del restaurante', cat: 'Dinero', uses: ['do-while', 'if/else'], C: Ej27, tags: '130 consumos descuento 15% restaurant pagos',
    desc: 'Suma 130 consumos. A cada consumo que pase de $130 se le descuenta un 15 %.', },
  { id: '28', title: 'Suma desde 8 hasta N', cat: 'Series y conteos', uses: ['for', 'if/else'], C: Ej28, tags: 'serie enesimo',
    desc: 'Calcula S = 8 + 9 + 10 + … + N.' },
  { id: '29', title: 'Caja de la compañía Barner', cat: 'Dinero', uses: ['do-while'], C: Ej29, tags: 'egresos caja chica sobrante -1',
    desc: 'La caja empieza el día con un monto fijo y se registran egresos. Al ingresar -1 se muestra el total de egresos y lo que queda en caja.', },
  { id: '30', title: 'Promedio de dos notas', cat: 'Notas', uses: ['if/else'], C: Ej30, tags: 'aprobado desaprobado vigesimal',
    desc: 'Promedia dos notas de 0 a 20 e indica si el estudiante aprueba (10.5 o más).' },
  { id: '31', title: 'Clasificación por deporte', cat: 'Texto y juegos', uses: ['do-while', 'if/else'], C: Ej31, tags: 'futbol basquet voley ajedrez 400 personas encuesta',
    desc: 'Clasifica a 400 personas según el deporte que practican: ajedrez, fútbol, vóley o básquet.', },
  { id: '32', title: 'Fiesta con cinco claves', cat: 'Texto y juegos', uses: ['if/else'], C: Ej32, tags: 'claves contraseña braulio invitado anidado',
    desc: 'La puerta pide 5 claves en orden. Con una sola incorrecta muestra "TE EQUIVOCASTE DE FIESTA"; con las 5 correctas, "BIENVENIDO A LA FIESTA".', },
];
export const CATS = ['Dinero', 'Tiempo', 'Series y conteos', 'Calculadoras', 'Notas', 'Geometría y álgebra', 'Texto y juegos'];
export const USES = ['Todas', 'Secuencial', 'if/else', 'for', 'do-while'];
APPS.forEach((a) => { a.hay = norm([a.id, 'ej' + a.id, 'ejercicio ' + a.id, a.title, a.desc, a.cat, a.uses.join(' '), a.tags].join(' ')); });
export const byId = (id) => APPS.find((a) => a.id === id);

export function Hl({ text, q }) {
  const nq = norm(q.trim());
  if (!nq) return text;
  const chars = [...text];
  const nt = chars.map((c) => norm(c)).join('');
  if (nt.length !== chars.length) return text;
  const words = nq.split(/\s+/).filter(Boolean);
  const idx = nt.indexOf(words[0]);
  if (idx < 0) return text;
  const L = words[0].length;
  return <>{chars.slice(0, idx).join('')}<mark>{chars.slice(idx, idx + L).join('')}</mark>{chars.slice(idx + L).join('')}</>;
}

export const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } },
};
export const fromHash = () => { const m = /^#ej-(\d\d)$/.exec(location.hash); return m && byId(m[1]) ? m[1] : null; };
