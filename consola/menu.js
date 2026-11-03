// Menú dinámico de consola: lee la carpeta, carga la información de cada
// ejercicio y permite abrirlo por número o buscarlo por palabras.
//
//   npm run consola          → abre el menú
//   npm run ej -- 24         → abre directamente el ejercicio 24
import { readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { leerLinea, pausa, cerrar, FinDeEntrada, quitarTildes, negrita, cian, gris, amarillo, rojo, verde } from './lib/io.js';

const carpeta = dirname(fileURLToPath(import.meta.url));
const CATEGORIAS = ['Dinero', 'Tiempo', 'Series y conteos', 'Calculadoras', 'Notas', 'Geometría y álgebra', 'Texto y juegos'];

async function cargarEjercicios() {
  const archivos = readdirSync(carpeta).filter((f) => /^ej\d\d-.*\.js$/.test(f)).sort();
  const lista = [];
  for (const archivo of archivos) {
    const mod = await import(pathToFileURL(join(carpeta, archivo)).href);
    const texto = [mod.info.id, mod.info.titulo, mod.info.cat, mod.info.usa.join(' '), mod.info.tags || ''].join(' ');
    lista.push({ ...mod.info, archivo, main: mod.main, buscar: quitarTildes(texto).toLowerCase() });
  }
  return lista;
}

function mostrar(lista) {
  for (const cat of CATEGORIAS) {
    const items = lista.filter((e) => e.cat === cat);
    if (!items.length) continue;
    console.log(amarillo(cat));
    for (const e of items) console.log(`  ${cian(e.id)}  ${e.titulo}  ${gris('[' + e.usa.join(', ') + ']')}`);
  }
}

function buscar(lista, consulta) {
  const palabras = quitarTildes(consulta).toLowerCase().split(/\s+/).filter(Boolean);
  return lista.filter((e) => palabras.every((p) => e.buscar.includes(p)));
}

async function abrir(ej) {
  try {
    await ej.main();
  } catch (e) {
    if (e instanceof FinDeEntrada) throw e;
    console.log(rojo('\nError inesperado: ' + e.message));
  }
}

async function principal() {
  const lista = await cargarEjercicios();
  const porId = (id) => lista.find((e) => e.id === id.padStart(2, '0'));

  // Modo directo: node consola/menu.js 24
  const directo = process.argv[2];
  if (directo) {
    const ej = porId(directo);
    if (!ej) {
      console.log(rojo(`No existe el ejercicio ${directo}.`));
      process.exitCode = 1;
      return;
    }
    await abrir(ej);
    return;
  }

  console.log(negrita(cian('\n╔══════════════════════════════════════════╗')));
  console.log(negrita(cian('║   30 EJERCICIOS DE C# EN NODE.JS         ║')));
  console.log(negrita(cian('╚══════════════════════════════════════════╝\n')));
  mostrar(lista);

  for (;;) {
    console.log(gris('\nEscribe el número del ejercicio, palabras para buscar (ej. "iva", "for"),'));
    console.log(gris('"lista" para ver todos, "azar" para uno sorpresa o "salir".'));
    const r = await leerLinea(negrita('> '));
    const q = quitarTildes(r).toLowerCase();
    if (!q) continue;
    if (['salir', 'exit', 'q'].includes(q)) break;
    if (q === 'lista') { mostrar(lista); continue; }

    let ej = null;
    if (/^\d{1,2}$/.test(q)) {
      ej = porId(q);
      if (!ej) { console.log(rojo(`No existe el ejercicio ${q}. Los números van del 01 al 32 (no hay 16 ni 17).`)); continue; }
    } else if (q === 'azar') {
      ej = lista[Math.floor(Math.random() * lista.length)];
    } else {
      const res = buscar(lista, r);
      if (!res.length) { console.log(rojo(`Ningún ejercicio coincide con "${r}".`)); continue; }
      if (res.length > 1) {
        console.log(verde(`${res.length} resultados:`));
        mostrar(res);
        continue;
      }
      ej = res[0];
    }
    await abrir(ej);
    await pausa();
    console.log();
    mostrar(lista);
  }
  console.log(gris('Hasta luego.'));
}

principal()
  .catch((e) => {
    if (e instanceof FinDeEntrada) console.log(gris('\n(fin de la entrada)'));
    else throw e;
  })
  .finally(cerrar);
