// Utilidades de entrada/salida para los programas de consola.
// Hacen el papel de Console.ReadLine / Console.WriteLine de C#.
import readline from 'node:readline';
import { pathToFileURL } from 'node:url';

/* ---------- colores ANSI (se desactivan con NO_COLOR o si no es una terminal) ---------- */
const usarColor = process.stdout.isTTY && !process.env.NO_COLOR;
const pintar = (codigo) => (texto) => (usarColor ? `\x1b[${codigo}m${texto}\x1b[0m` : String(texto));
export const verde = pintar('32');
export const rojo = pintar('31');
export const amarillo = pintar('33');
export const cian = pintar('36');
export const gris = pintar('90');
export const negrita = pintar('1');

/* ---------- lectura de líneas ----------
   Se guardan las líneas en una cola para que también funcione
   cuando la entrada viene de un archivo:  node ej01.js < datos.txt */
let rl = null;
let cerrado = false;
const cola = [];
const esperando = [];

function abrir() {
  if (rl) return;
  cerrado = false;
  rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: !!process.stdin.isTTY });
  rl.on('line', (linea) => {
    const resolver = esperando.shift();
    if (resolver) resolver(linea);
    else cola.push(linea);
  });
  rl.on('close', () => {
    cerrado = true;
    while (esperando.length) esperando.shift()(null);
  });
}

/** Se lanza cuando ya no hay más entrada (Ctrl+D o fin del archivo). */
export class FinDeEntrada extends Error {}

/** Equivale a Console.Write(prompt) + Console.ReadLine(). */
export async function leerLinea(prompt = '') {
  abrir();
  rl.setPrompt(prompt);
  rl.prompt();
  let linea;
  if (cola.length) linea = cola.shift();
  else if (cerrado) linea = null;
  else linea = await new Promise((r) => esperando.push(r));
  if (linea === null) throw new FinDeEntrada();
  if (!process.stdin.isTTY) process.stdout.write(linea + '\n'); // eco cuando la entrada viene de un archivo
  return linea.trim();
}

/** Lee un número y lo vuelve a pedir si no es válido. Acepta coma o punto decimal. */
export async function leerNumero(prompt, { entero = false } = {}) {
  for (;;) {
    const texto = await leerLinea(prompt);
    const n = Number(texto.replace(',', '.'));
    if (texto !== '' && Number.isFinite(n) && (!entero || Number.isInteger(n))) return n;
    console.log(rojo(entero ? '  Escribe un número entero.' : '  Escribe un número válido.'));
  }
}

/** Pregunta sí/no. Acepta s, si, sí, n, no. */
export async function leerSiNo(prompt) {
  for (;;) {
    const r = quitarTildes(await leerLinea(prompt)).toLowerCase();
    if (['s', 'si', 'y', 'yes'].includes(r)) return true;
    if (['n', 'no'].includes(r)) return false;
    console.log(rojo('  Responde si o no.'));
  }
}

/**
 * Para los ejercicios que piden muchos números (50, 100, 130…):
 * ofrece generarlos al azar en lugar de escribirlos uno por uno.
 */
export async function leerLista(cantidad, prompt, { min = 0, max = 100, enteros = true } = {}) {
  if (await leerSiNo(`¿Generar los ${cantidad} valores al azar? (si/no): `)) {
    const lista = Array.from({ length: cantidad }, () => aleatorio(min, max));
    console.log(gris('Valores generados:'));
    console.log(gris(columnas(lista)));
    return lista;
  }
  const lista = [];
  for (let i = 1; i <= cantidad; i++) lista.push(await leerNumero(prompt(i), { entero: enteros }));
  return lista;
}

/* ---------- formato ---------- */
export const quitarTildes = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '');
export const aleatorio = (min, max) => Math.floor(min + Math.random() * (max - min + 1));

/** Redondea como Math.Round(x, 2) de C# y quita los ceros sobrantes. */
export function num(x, decimales = 2) {
  if (typeof x === 'bigint') return x.toString();
  if (!Number.isFinite(x)) return Number.isNaN(x) ? 'NaN' : x > 0 ? '∞' : '-∞';
  const r = Math.round(x * 10 ** decimales) / 10 ** decimales;
  return Object.is(r, -0) ? '0' : String(r);
}

/** Muestra una lista de números en columnas de 10. */
export function columnas(lista, ancho = 6, porFila = 10) {
  const filas = [];
  for (let i = 0; i < lista.length; i += porFila) filas.push(lista.slice(i, i + porFila).map((n) => String(n).padStart(ancho)).join(''));
  return filas.join('\n');
}

export function titulo(info) {
  console.log(negrita(cian(`\n=== Ejercicio ${info.id}: ${info.titulo} ===`)));
  if (info.enunciado) console.log(gris(info.enunciado));
  console.log();
}

export async function pausa() {
  try {
    await leerLinea(gris('\nPresione Enter para continuar . . . '));
  } catch (e) {
    if (!(e instanceof FinDeEntrada)) throw e;
  }
}

export function cerrar() {
  if (rl) {
    rl.close();
    rl = null;
  }
}

/**
 * Ejecuta main() solo si el archivo se abrió directamente (node ej01-....js).
 * Si lo importa el menú, no hace nada.
 */
export async function ejecutar(main, url) {
  if (!process.argv[1] || url !== pathToFileURL(process.argv[1]).href) return;
  try {
    await main();
  } catch (e) {
    if (e instanceof FinDeEntrada) console.log(gris('\n(fin de la entrada)'));
    else throw e;
  } finally {
    cerrar();
  }
}
