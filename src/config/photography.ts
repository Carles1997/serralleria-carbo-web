// Direcció fotogràfica de Fase 5. Les fotos de projectes són documentals;
// les conceptuals ambienten serveis i portades i mai no documenten un cas.
// La procedència de cada original real és a assets/fotografies-recuperades/cataleg.csv.
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
import industrialHero from '../../assets/imatges-conceptuals/industrial-series-hero-v1.png';
import industrialMaterials from '../../assets/imatges-conceptuals/industrial-materials-v1.png';
import industrialWelding from '../../assets/imatges-conceptuals/industrial-soldadura-conceptual-v1.png';
import cartPhoto from '../../assets/imatges-conceptuals/particulars-carros-servei-v1.png';
import sectorFood from '../../assets/imatges-conceptuals/sector-alimentacio-v1.png';
import sectorHealth from '../../assets/imatges-conceptuals/sector-sanitari-v1.png';
import sectorPackaging from '../../assets/imatges-conceptuals/sector-packaging-v1.png';
import sectorWine from '../../assets/imatges-conceptuals/sector-cellers-v2.png';
import sectorDual from '../../assets/imatges-conceptuals/sector-tecnologies-duals-v2.png';
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
import gavia03 from '../../assets/fotografies-recuperades/projectes/gavia-industrial/gavia-industrial-transport-03.jpg';

export const projectPhotography = {
  'baranes-interior-casa': {
    stage: baranes02,
    primary: baranes01,
    alt: "Barana metàl·lica d'una escala interior durant una reforma",
  },
  'estructura-ascensor': {
    stage: ascensor03,
    primary: ascensor04,
    alt: "Estructura metàl·lica per a un ascensor vista des del pati interior",
  },
  'passarella-interior': {
    stage: passarella01,
    primary: passarella02,
    alt: 'Passarel·la interior amb baranes de ferro',
  },
  'persianes-negoci': {
    stage: persianes02,
    primary: persianes01,
    alt: 'Persianes metàl·liques instal·lades a la façana d’un negoci',
  },
  'porta-parquing': {
    stage: parquing03,
    primary: parquing03,
    alt: 'Porta metàl·lica de pàrquing vista des de l’interior',
  },
  'gavia-industrial': {
    stage: gavia01,
    primary: gavia02,
    alt: 'Gàbia metàl·lica fabricada per a un client industrial al taller',
  },
} as const;

export type ProjectPhotoId = keyof typeof projectPhotography;

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
    duals: sectorDual,
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
  // Empresa: fotografies originals del taller, la logística i les dues branques.
  company: {
    hero: gavia01,
    logistics: gavia03,
    particulars: passarella02,
    industrial: gavia02,
  },
  shared: { metalDetail, ascensor01 },
} as const;
