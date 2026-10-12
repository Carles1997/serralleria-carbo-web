// Direcció fotogràfica de Fase 5. Les fotos de projectes són documentals;
// les conceptuals ambienten serveis i portades i mai no documenten un cas.
// La procedència de cada original real és a assets/fotografies-recuperades/cataleg.csv.
import type { Locale } from '../i18n/config';
import homeParticulars from '../../assets/imatges-conceptuals/home-particulars-acces-v2.png';
import homeIndustrial from '../../assets/imatges-conceptuals/home-industrial-acces-v2.png';
import metalDetail from '../../fases/fase-4/FASE4-mockups/home/metal-detail-concept.png';
import industrialSeries from '../../fases/fase-4/FASE4-mockups/industrial/industrial-series-v2.png';
import industrialSeriesMethod from '../../assets/imatges-conceptuals/industrial-series-metode-v2.png';

import particularsHero from '../../assets/imatges-conceptuals/particulars-barana-conceptual-v1.png';
import structuresHero from '../../assets/imatges-conceptuals/particulars-estructures-hero-v1.png';
import automationsHero from '../../assets/imatges-conceptuals/particulars-automatismes-hero-v1.png';
import furnitureHero from '../../assets/imatges-conceptuals/particulars-mobiliari-hero-v1.png';
import furnitureTile from '../../assets/imatges-conceptuals/home-mobiliari-targeta-v2.png';
import homeIndustrialCapabilities from '../../assets/imatges-conceptuals/home-capacitats-industrials-targeta-v1.png';
import repairsHero from '../../assets/imatges-conceptuals/particulars-urgencies-hero-v1.png';
// Exportació derivada amb les ombres obertes (refinament del director, 06/10/2026); el màster
// industrial-series-hero-v1.png es conserva sense canvis.
import industrialHero from '../../assets/imatges-conceptuals/industrial-series-hero-v1-llum.jpg';
import industrialMaterials from '../../assets/imatges-conceptuals/industrial-materials-v1.png';
import industrialWelding from '../../assets/imatges-conceptuals/industrial-soldadura-conceptual-v1.png';
import cartPhoto from '../../assets/imatges-conceptuals/particulars-carros-servei-v1.png';
import sectorFood from '../../assets/imatges-conceptuals/sector-alimentacio-v1.png';
import sectorHealth from '../../assets/imatges-conceptuals/sector-sanitari-v1.png';
import sectorPackaging from '../../assets/imatges-conceptuals/sector-packaging-v1.png';
import sectorWine from '../../assets/imatges-conceptuals/sector-cellers-v2.png';
import capSteel from '../../assets/imatges-conceptuals/capacitats-acer-taller-v1.png';
import capStainless from '../../assets/imatges-conceptuals/capacitats-inox-taller-v1.png';
import capPressBrake from '../../assets/imatges-conceptuals/capacitats-plegadora-taller-v1.png';
import capShear from '../../assets/imatges-conceptuals/capacitats-cisalla-taller-v1.png';
import capPunch from '../../assets/imatges-conceptuals/capacitats-punxonadora-taller-v1.png';
import capWelding from '../../assets/imatges-conceptuals/capacitats-soldadura-taller-v2.png';
import workshopMachine from '../../assets/imatges-conceptuals/industrial-taller-maquinaria-v1.png';
import workshopMounting from '../../assets/fotografies-recuperades/recursos/equip/equip-furgoneta-intervencio.png';
import homeDoorRepair from '../../assets/fotografies-recuperades/recursos/servei/reparacio-persiana-comercial.jpg';
import otherAccess from '../../assets/imatges-conceptuals/particulars-automatismes-altres-accessos-v1.png';

import baranes01 from '../../assets/fotografies-recuperades/projectes/baranes-interior-casa/baranes-interior-escala-01.jpg';
import baranes02 from '../../assets/fotografies-recuperades/projectes/baranes-interior-casa/baranes-interior-escala-02.jpg';
import ascensor01 from '../../assets/fotografies-recuperades/projectes/estructura-ascensor/estructura-ascensor-pati-01.jpg';
import ascensor03 from '../../assets/fotografies-recuperades/projectes/estructura-ascensor/estructura-ascensor-pati-03.jpg';
import ascensor04 from '../../assets/fotografies-recuperades/projectes/estructura-ascensor/estructura-ascensor-pati-04.jpg';
import passarella01 from '../../assets/fotografies-recuperades/projectes/passarella-interior/passarella-interior-vista-frontal-01.jpg';
import passarella02 from '../../assets/fotografies-recuperades/projectes/passarella-interior/passarella-interior-vista-lateral-02.jpg';
import persianes01 from '../../assets/fotografies-recuperades/projectes/persianes-negoci/persianes-negoci-facana-01.jpg';
import persianes02 from '../../assets/fotografies-recuperades/projectes/persianes-negoci/persianes-negoci-facana-02.jpg';
import parquing03 from '../../assets/fotografies-recuperades/projectes/porta-parquing/porta-parquing-interior-03.jpg';
import gavia01 from '../../assets/fotografies-recuperades/projectes/gavia-industrial/gavia-industrial-fabricacio-01.jpg';
import gavia02 from '../../assets/fotografies-recuperades/projectes/gavia-industrial/gavia-industrial-taller-02.jpg';

export const projectPhotography = {
  'baranes-interior-casa': {
    stage: baranes02,
    primary: baranes01,
    alt: { ca: "Barana metàl·lica d'una escala interior durant una reforma", es: 'Barandilla metálica de una escalera interior durante una reforma' },
  },
  'estructura-ascensor': {
    stage: ascensor03,
    primary: ascensor04,
    alt: { ca: 'Estructura metàl·lica per a un ascensor vista des del pati interior', es: 'Estructura metálica para un ascensor vista desde el patio interior' },
  },
  'passarella-interior': {
    stage: passarella01,
    primary: passarella02,
    alt: { ca: 'Passarel·la interior amb baranes de ferro', es: 'Pasarela interior con barandillas de hierro' },
  },
  'persianes-negoci': {
    stage: persianes02,
    primary: persianes01,
    alt: { ca: 'Persianes metàl·liques instal·lades a la façana d’un negoci', es: 'Persianas metálicas instaladas en la fachada de un negocio' },
  },
  'porta-parquing': {
    stage: parquing03,
    primary: parquing03,
    alt: { ca: 'Porta metàl·lica de pàrquing vista des de l’interior', es: 'Puerta metálica de parking vista desde el interior' },
  },
  'gavia-industrial': {
    stage: gavia01,
    primary: gavia02,
    alt: { ca: 'Gàbia metàl·lica fabricada per a un client industrial al taller', es: 'Jaula metálica fabricada para un cliente industrial en el taller' },
  },
} as const;

export type ProjectPhotoId = keyof typeof projectPhotography;

/** Text alternatiu de la fotografia informativa d'un cas, en l'idioma de la pàgina (castellà afegit el 09/10/2026). */
export const projectPhotoAlt = (id: ProjectPhotoId, locale: Locale) => projectPhotography[id].alt[locale === 'es' ? 'es' : 'ca'];

export const sitePhotography = {
  home: {
    particulars: homeParticulars,
    industrial: homeIndustrial,
    company: gavia01,
    structuresTile: passarella01,
    furnitureTile,
    // Portes i motors: porta de pàrquing real; Reparacions: reparació real d'una persiana (03/10/2026).
    doorsTile: parquing03,
    repairsTile: homeDoorRepair,
    industrialTile: homeIndustrialCapabilities,
  },
  particulars: {
    hero: particularsHero,
    portfolioHero: passarella02,
    // Graella de serveis (03/10/2026): els carros passen a Industrial i entren les reparacions.
    serviceCards: {
      doors: automationsHero,
      structures: structuresHero,
      furniture: furnitureHero,
      repairs: repairsHero,
    },
  },
  services: {
    'particulars-estructures': structuresHero,
    'particulars-automatismes': automationsHero,
    'particulars-mobiliari': furnitureHero,
    'particulars-urgencies': repairsHero,
  },
  industrial: {
    hero: industrialHero,
    cart: cartPhoto,
    materials: industrialMaterials,
    machines: workshopMachine,
    mounting: workshopMounting,
    welding: industrialWelding,
    series: industrialSeriesMethod,
    project: gavia02,
  },
  sectors: {
    alimentacio: sectorFood,
    sanitari: sectorHealth,
    packaging: sectorPackaging,
    cellers: sectorWine,
  },
  serviceScope: {
    barana: baranes01,
    escala: particularsHero,
    passarella: passarella01,
    garatge: parquing03,
    persiana: persianes01,
    acces: otherAccess,
  },
  capacities: {
    hero: industrialSeries,
    workshop: gavia01,
    materials: { carbon: capSteel, inox: capStainless },
    machines: { plegadora: capPressBrake, cisalla: capShear, punxonadora: capPunch },
    production: capWelding,
  },
  shared: { metalDetail, ascensor01 },
} as const;
