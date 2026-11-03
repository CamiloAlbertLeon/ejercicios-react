# Ejercicios C# en React y Node.js

Los 30 ejercicios de consola en C# del documento *30 ejercicios C#*, en dos versiones:

- **React** (carpeta `src/`): aplicaciones interactivas en el navegador, con menú dinámico, buscador y filtros por estructura de control (Secuencial, if/else, for, do-while).
- **Consola Node.js** (carpeta `consola/`): los mismos programas en la terminal, que piden y muestran los datos como los de C#, con un menú de consola que también tiene buscador.

## Versión de consola (Node.js)

No necesita `npm install`: solo usa módulos que vienen con Node.js.

```bash
npm run consola          # abre el menú
npm run ej -- 24         # abre directamente el ejercicio 24
node consola/ej24-area-triangulo.js   # o ejecuta un archivo suelto
```

En el menú puedes escribir:

| Escribes | Pasa esto |
|---|---|
| `24` | Abre el ejercicio 24 |
| `iva`, `factorial`, `for`… | Busca por título, tema o estructura. Si hay un solo resultado, lo abre |
| `lista` | Muestra todos los ejercicios |
| `azar` | Abre uno al azar |
| `salir` | Termina |

Los ejercicios que piden 50, 100, 130 o 400 datos preguntan primero si quieres generarlos al azar.

También puedes pasarle los datos desde un archivo:

```bash
printf '2\n4\n5\n' > datos.txt
node consola/ej24-area-triangulo.js < datos.txt
```

### Equivalencias C# → Node.js

| C# | Node.js (en `consola/lib/io.js`) |
|---|---|
| `Console.WriteLine(x)` | `console.log(x)` |
| `double.Parse(Console.ReadLine())` | `await leerNumero('mensaje: ')` |
| `int.Parse(Console.ReadLine())` | `await leerNumero('mensaje: ', { entero: true })` |
| `Console.ReadLine()` | `await leerLinea('mensaje: ')` |
| `Math.Round(x, 2)` | `num(x)` |
| `Math.Sqrt`, `Math.Pow`, `Math.Truncate` | `Math.sqrt`, `x ** n`, `Math.trunc` |
| `long` / `int` que se desborda | `BigInt` (`10n`, `BigInt(x)`) |

Como leer del teclado en Node.js es asíncrono, cada `main()` es `async` y cada lectura lleva `await`.

## Versión React: cómo ejecutarla

Necesitas Node.js 18 o más reciente. En Linux Mint:

```bash
sudo apt install nodejs npm      # o instala la versión LTS desde nodejs.org
```

Luego, dentro de esta carpeta:

```bash
npm install       # descarga React y Vite (solo la primera vez)
npm run dev       # abre http://localhost:5173
```

Para generar la versión final en la carpeta `dist/`:

```bash
npm run build
npm run preview
```

## Estructura

```
consola/
  menu.js                  Menú de consola: carga los ejercicios de la carpeta y los busca
  lib/io.js                Lectura de teclado, colores y formato de números
  ej01-….js … ej32-….js    Un programa de consola por ejercicio
index.html                 Página base (carga las fuentes y src/main.jsx)
src/
  main.jsx                 Punto de entrada: monta <App /> en #root
  App.jsx                  Menú lateral, buscador, filtros y navegación
  catalogo.jsx             Lista de ejercicios (título, categoría, descripción, notas)
  utils.js                 Funciones de apoyo: lectura de números, formato, aleatorios
  styles.css               Estilos y tema claro/oscuro
  components/ui.jsx        Piezas reutilizables: Field, Console, Readouts, Meter…
  ejercicios/
    Ej01.jsx … Ej32.jsx    Un componente por ejercicio
    Calculadora.jsx        Ejercicios 21 y 23 (comparten el componente Calc)
```

## Cómo agregar un ejercicio nuevo

1. Crea `src/ejercicios/Ej33.jsx` y exporta un componente `Ej33`.
2. Impórtalo en `src/catalogo.jsx` y agrega un objeto al arreglo `APPS`:

```js
{ id: '33', title: 'Mi ejercicio', cat: 'Series y conteos', uses: ['for'], C: Ej33,
  tags: 'palabras extra para el buscador',
  desc: 'Qué hace el ejercicio.' },
```

El menú, el buscador y los filtros se actualizan solos porque se generan a partir de `APPS`.

En la consola es aún más simple: crea `consola/ej33-mi-ejercicio.js` con un `export const info = {…}` y un `export async function main()` (copia cualquier ejercicio como plantilla). El menú lee la carpeta y lo agrega solo.

## Versión de un solo archivo

`ejercicios-react-un-archivo.html` (fuera de esta carpeta, en el zip) es la misma app compilada en un solo HTML. Se abre con doble clic en el navegador; necesita internet para cargar React desde el CDN.

## Correcciones respecto al código C# original

Cada ejercicio muestra sus cambios en la nota "Cambios respecto al C# original". Los principales:

- **Ej. 03:** el original usaba 0.2 (20 %) aunque el enunciado pide 2 %.
- **Ej. 13 y 15:** `int` se desborda; aquí se usa `BigInt`.
- **Ej. 24:** la fórmula de Herón multiplicaba `s` tres veces.
- **Ej. 26:** `4 / 3` en C# es división entera (vale 1).
- **Ej. 31:** el bucle paraba en 10 personas en vez de 400.
