import { leerLinea, leerSiNo, quitarTildes, titulo, verde, rojo, gris, ejecutar } from './lib/io.js';

export const info = {
  id: '31', titulo: 'Clasificación por deporte', cat: 'Texto y juegos', usa: ['do-while', 'if/else'], tags: 'futbol basquet voley ajedrez 400 personas encuesta',
  enunciado: 'Clasifica a 400 personas según su deporte: futbol, basquet, voley o ajedrez.',
};

const PERSONAS = 400;
const DEPORTES = ['futbol', 'basquet', 'voley', 'ajedrez'];
const SINONIMOS = { basket: 'basquet', baloncesto: 'basquet', volley: 'voley', voleibol: 'voley', 'futbol soccer': 'futbol' };

export async function main() {
  titulo(info);
  console.log('LOS DEPORTES A INGRESAR PUEDEN SER FUTBOL, BASQUET, VOLEY Y AJEDREZ\n');
  const conteo = { futbol: 0, basquet: 0, voley: 0, ajedrez: 0 };

  if (await leerSiNo(`¿Generar los deportes de las ${PERSONAS} personas al azar? (si/no): `)) {
    for (let i = 0; i < PERSONAS; i++) conteo[DEPORTES[Math.floor(Math.random() * 4)]]++;
    console.log(gris('Deportes generados al azar.'));
  } else {
    let persona = 1;
    do {
      let d = quitarTildes(await leerLinea(`Ingrese deporte del ${persona}º alumno : `)).toLowerCase();
      d = SINONIMOS[d] || d;
      if (DEPORTES.includes(d)) {
        conteo[d]++;
        persona++;
      } else {
        console.log(rojo('error deporte no valido'));
      }
    } while (persona <= PERSONAS);
  }

  console.log();
  for (const d of DEPORTES) console.log(verde(`cantidad de ${d}: ${conteo[d]}`));
}

ejecutar(main, import.meta.url);
