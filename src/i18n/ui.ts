import type { Locale } from './config';
import { resolveRoute } from '../config/routes';
import { contactMessages } from '../lib/contact/messages';

// Textos d'interfície. Origen: content/ca/ui.md i les etiquetes de les maquetes
// validades de Fase 4 (fases/fase-4/FASE4-mockups/). El contingut de pàgina no
// va aquí, sinó a content/{idioma}/. ES i EN s'afegiran amb traduccions validades.
const ca = {
  skipLink: 'Vés al contingut',
  brandHome: "Serralleria Carbó, torna a l'inici",
  // Logotip d'Industrial: el nom accessible inclou «Industrial», que es veu al costat del logotip (WCAG 2.5.3).
  brandHomeIndustrial: "Serralleria Carbó Industrial, torna a l'inici",
  brand: { small: 'Serralleria', main: 'Carbó', tagline: 'Vilafranca del Penedès · Des de 1989' },
  // Selector d'idioma: cada diccionari descriu el seu idioma, i l'enllaç cap a aquest idioma es mostra
  // amb aquests textos (en el mateix idioma de destí).
  language: { code: 'CA', name: 'Català', switchLabel: 'Veure aquesta pàgina en català', selector: 'Idioma' },
  // Rutes de les pàgines d'aquest idioma que les plantilles enllacen directament. BaseLayout comprova al
  // build que coincideixin amb les rutes de content/{idioma}/.
  routes: {
    home: '/',
    particulars: '/particulars/',
    industrial: '/industrial/',
    capacities: '/industrial/capacitats/',
    projects: '/particulars/projectes/',
    contact: '/contacte/',
    services: {
      estructures: '/particulars/estructures/',
      automatismes: '/particulars/automatismes/',
      // Clau interna «urgencies» (categoria i paràmetre antic del formulari); ruta pública des del
      // 12/10/2026: Reparacions (fases/fase-7/CANVIS-CLIENT-2026-10-12.md).
      urgencies: '/particulars/reparacions/',
    } as Record<string, string>,
  },
  menu: { main: 'Navegació principal', mobile: 'Navegació mòbil', open: 'Obre el menú', close: 'Tanca el menú' },
  headerPhoneLabel: 'Parlem?',
  contact: {
    whatsappMessage: 'Hola, us escric des de la web de Serralleria Carbó. Voldria fer una consulta.',
    whatsapp: 'Escriu-nos per WhatsApp',
    call: (phone: string) => `Truca al ${phone}`,
  },
  footer: {
    contact: 'Contacte',
    legal: { 'legal-avis-legal': 'Avís legal', 'legal-privacitat': 'Privacitat', 'legal-cookies': 'Cookies' },
    pending: 'pendent',
    backTop: "Torna a l'inici",
  },
  home: {
    // Industrial primer (director, 19/10/2026), com a la Home.
    nav: [
      { label: 'Industrial', href: '/industrial/' },
      { label: 'Particulars', href: '/particulars/' },
      { label: 'Serveis', href: '/#serveis' },
      // «Projectes» (director, 12/10/2026): la barra de dalt és la mateixa a totes les pàgines.
      { label: 'Projectes', href: '/particulars/projectes/' },
      // Contacte a la barra de dalt, al costat de Projectes (director, 13/10/2026).
      { label: 'Contacte', href: '/contacte/' },
    ],
    // Doble accés i xifres: textos de la maqueta Home validada, per indicació del
    // director de projecte (27/09/2026). home.md en conserva la versió llarga.
    paths: {
      label: 'Tria el teu àmbit',
      heading: 'Tria el teu camí',
      // Criteri entre camins (brief de millores UX, Fase 7): per tipus d'encàrrec, no només per
      // nombre d'unitats; Industrial també rep encàrrecs unitaris, com un carro o una peça a plànol.
      // Públic explícit a cada targeta (director, 06/10/2026); el tipus de feina del text de la
      // targeta acaba de fer la diferència entre «negocis» i «empreses».
      particulars: {
        kicker: 'Habitatges · comunitats · negocis',
      },
      // L'acció d'Industrial usa l'etiqueta de l'enllaç de home.md («Coneix Industrial»), que descriu el destí.
      industrial: { kicker: 'Constructores · promotores · empreses' },
    },
    numbers: {
      heading: ['Fets que', 'ens defineixen'],
      // «source»: xifra en negreta de home.md, d'on surt també l'etiqueta (es comprova al build).
      items: [
        { source: '1989', value: 1989, unit: '' },
        { source: '950 m²', value: 950, unit: 'm²' },
        { source: '12 persones', value: 12, unit: '' },
        { source: '6 furgonetes · 1 camió ploma', value: 6, unit: '+1' },
      ],
    },
    services: {
      particulars: { eyebrow: 'Espais i reparacions', title: 'Particulars', overview: 'Explora els serveis per a particulars' },
      industrial: {
        eyebrow: 'Sèries, peces a plànol i obra',
        title: 'Industrial',
        overview: 'Coneix Industrial',
        // Productes en sèrie confirmats pel client (03/10/2026); les portes inclouen la instal·lació.
        products: ['Estructures i baranes', 'Portes amb instal·lació', 'Mobiliari', 'Carros industrials', 'Peces i conjunts a mida'],
      },
      // Mateix ordre que els enllaços de la secció de serveis de home.md.
      tiles: [
        { detail: 'Fabricació, instal·lació i motorització' },
        { detail: 'Escales i passarel·les' },
        // Públic del mobiliari (client, 12/10/2026): particulars i decoradors. Els materials són al text de Particulars.
        { detail: 'Per a particulars i decoradors' },
        { detail: 'Portes, persianes i motors' },
        { detail: 'Acer al carboni i inoxidable' },
      ],
    },
  },
  // Pàgines legals (Fase 8): etiquetes de la plantilla; el text legal és del client o l'assessor.
  legal: {
    crumb: 'Textos legals',
    toc: 'En aquesta pàgina',
    others: 'Altres textos legals',
    updated: 'Darrera actualització',
    empty: 'Text pendent: el redactarà o validarà el client o el seu assessor.',
    review: {
      title: 'Text pendent de revisió jurídica',
      text: "Aquest text és un esborrany preparat per a la revisió del client i del seu assessor jurídic. Les dades marcades «[PENDENT]» encara s'han de completar.",
    },
    draft: {
      title: 'Esborrany no publicable',
      text: 'Aquesta vista només existeix en desenvolupament per revisar la plantilla. La pàgina no es genera al build fins que el text estigui aprovat.',
    },
  },
  // Pàgina 404: nom de la navegació amb els camins per continuar (el text és de content/ca/404.md).
  notFound: { waysLabel: 'Camins per continuar' },
  // Plantilla P. Etiquetes i titulars de la maqueta fases/fase-4/FASE4-mockups/particulars/;
  // el cos de text surt de content/ca/particulars.md.
  particulars: {
    nav: [
      { label: 'Reparacions', href: '/particulars/reparacions/' },
      { label: 'Estructures', href: '/particulars/estructures/' },
      { label: 'Automatismes', href: '/particulars/automatismes/' },
      // Ruta ajornada (config/routes.ts): porta al formulari amb Mobiliari preseleccionat.
      // L'etiqueta diu l'acció real: la ruta de detall està ajornada i obre la consulta.
      { label: 'Consulta mobiliari', href: resolveRoute('/particulars/mobiliari/') },
      { label: 'Projectes', href: '/particulars/projectes/' },
      { label: 'Contacte', href: '/contacte/?tipus=particular' },
    ],
    hero: {
      // Accés a l'altra branca amb el criteri (03/10/2026): diverses unitats → Industrial.
      otherBranch: { label: 'Constructora, promotora, sèrie o peça a plànol? Industrial', href: '/industrial/#produccio' },
      // Mateix text que la H1 de particulars.md, repartit per a la composició (es comprova al build).
      title: ['Serralleria per a', 'particulars', 'a Vilafranca i rodalia'],
    },
    urgent: {
      heading: 'Tens una avaria?',
      // Horari confirmat al traspàs de Fase 4 (25/09/2026).
      text: 'Si falla una porta o un automatisme, truca’ns i explica’ns què ha passat. Atenció de dilluns a divendres, de 8 a 13 h i de 15 a 18 h.',
      form: { label: 'Formulari de contacte', href: '/contacte/?tipus=particular' },
    },
    services: {
      heading: ['Feines a mida', 'Respostes clares'],
    },
    projects: {
      heading: ['Fets, no només', 'paraules'],
      // Casos destacats del paràgraf «Treballs reals» de particulars.md.
      featured: ['baranes-interior-casa', 'estructura-ascensor', 'persianes-negoci'],
      talk: 'Parlem del teu projecte',
    },
    contactHeading: ["Explica'ns", 'la feina'],
  },
  // Context de cada cas (maquetes P i PP), derivat de la descripció del cas a content/ca/projects/.
  projectContexts: {
    'passarella-interior': 'Habitatge',
    'estructura-ascensor': 'Comunitat',
    'porta-parquing': 'Comunitat',
    'persianes-negoci': 'Negoci',
    'baranes-interior-casa': 'Habitatge',
  } as Record<string, string>,
  // Plantilla PP (portafoli de Particulars). Maqueta: fases/fase-4/FASE4-mockups/particulars/projectes/.
  portfolio: {
    hero: {
      // Mateix text que la H1 de particulars-projectes.md (es comprova al build).
      title: ['Projectes de', 'serralleria'],
      cta: 'Explora els projectes',
    },
    work: {
      heading: ['Cinc feines', 'Cinc contextos'],
    },
    filters: { label: 'Filtra els projectes per servei', title: 'Filtra per servei', all: 'Tots', status: '{n} projectes visibles' },
    caseLink: { estructures: "Veure el servei d'estructures", automatismes: 'Veure automatismes' } as Record<string, string>,
    more: { heading: ['De la feina', 'al teu projecte'] },
    contactHeading: ["Explica'ns", 'la idea'],
  },
  // Plantilla I (portada d'Industrial). Maqueta: fases/fase-4/FASE4-mockups/industrial/ amb identitat.css.
  // Etiquetes i titulars de la maqueta; cos de text de content/ca/industrial.md.
  industrial: {
    phoneLabel: 'Consulta industrial',
    // Pàgines interiors (plantilla II): la maqueta afegeix «Inici» (portada d'Industrial) davant del menú.
    home: { label: 'Inici', href: '/industrial/' },
    hero: {
      overline: ['Industrial', 'Fabricació metàl·lica per a tercers'],
      // Missatge aprovat (H1 d'industrial.md) en tres línies sense punt final, com a la maqueta;
      // l'última porta el reflex metàl·lic.
      title: ['Sèries curtes i mitjanes', 'Peces exigents', 'Resposta industrial'],
      primary: 'Veure les capacitats del taller',
      bottom: 'Vilafranca del Penedès · Catalunya',
    },
    proof: {
      label: "Dades confirmades de l'empresa",
      lead: 'Un taller per passar del plànol a la peça.',
      // Xifres confirmades pel client (content/ca/industrial-capacitats.md).
      items: [
        { value: 950, unit: 'm²', label: 'de taller' },
        { value: 12, unit: '', label: "persones a l'empresa" },
      ],
    },
    // Què fabriquem en sèrie (03/10/2026): productes de Particulars i qualsevol peça a mida, en
    // diverses unitats. Text d'industrial.md; aquí, el titular en línies i el servei del formulari.
    production: {
      // «Què fabriquem» (brief de millores UX, Fase 7): no només en sèrie; també peces a plànol i
      // encàrrecs unitaris. Cada cel·la és l'enllaç a la consulta amb el producte preseleccionat.
      heading: ['Què', 'fabriquem'],
      label: 'Productes que fabriquem',
      // Mateix ordre que la llista d'industrial.md; «servei» és el valor del formulari d'empresa.
      services: ['estructures', 'portes', 'mobiliari', 'carros', 'peces'],
      // Nom accessible de cada cel·la: producte + acció real.
      productAction: 'obre una consulta tècnica',
      action: 'Envia una consulta tècnica',
    },
    // Manteniment industrial (client, 12/10/2026): primera secció de la portada (director, 12/10/2026).
    // Frase, fitxa de tres línies i acció principal d'industrial.md; aquí l'etiqueta i el titular en línies.
    maintenance: {
      label: 'Servei per a empreses',
      heading: ['Manteniment', 'industrial'],
    },
    workshop: {
      heading: ['El taller', 'en primer pla'],
      materials: { head: ['Materials'], title: ['Acer i', 'inoxidable'] },
      machines: { head: ['Maquinària', 'Equip del taller'], title: ['Transformació', 'del metall'], foot: 'Plegadora' },
      welding: { head: ['Soldadura', 'Processos disponibles'], title: ['Processos', 'de soldadura'] },
      mounting: { head: ['Muntatge', 'Equip propi'], title: ['Del taller', 'al muntatge'], text: 'Equip propi per als desplaçaments i el muntatge.' },
      progress: {
        label: 'En procés, no certificacions vigents',
        items: [
          { title: 'ISO 9001', state: 'En implantació' },
          { title: 'ISO 3834', state: 'En estudi' },
          // Indicació del director (01/10/2026): automatització i robotització de processos en general,
          // com a industrial-capacitats.md.
          { title: 'Automatització', state: 'I robotització de processos, en curs' },
        ],
      },
    },
    series: {
      heading: ['La sèrie comença', 'amb una', 'peça'],
      method: { label: 'Del requisit a la peça' },
    },
    sectors: {
      heading: ['Experiència', 'en quatre sectors'],
      label: 'Sectors amb experiència',
      // Han de constar al paràgraf de sectors d'industrial.md (es comprova al build).
      items: [
        { name: 'Alimentació', art: 'alimentacio' },
        { name: 'Sanitari', art: 'sanitari' },
        { name: 'Packaging', art: 'packaging' },
        { name: 'Cellers', art: 'cellers' },
        // Tecnologies duals retirat de l'oferta (client, 12/10/2026).
      ],
    },
    project: {
      heading: ['Un encàrrec real', 'Deu gàbies'],
    },
    contact: {
      // Inclou el manteniment (client, 12/10/2026): cap dada de fabricació no és obligatòria.
      heading: ['Parlem del', 'teu encàrrec'],
      guideLabel: 'Per valorar la consulta',
      guide: ['Què necessites', 'Ubicació de la intervenció, si escau', 'Documentació o fotografies, si en tens', 'Material, unitats i termini, si escau'],
      methodLabel: 'Contacte directe',
    },
  },
  // Plantilla II (Capacitats d'Industrial). Maqueta: fases/fase-4/FASE4-mockups/industrial/capacitats/.
  // Etiquetes i titulars de la maqueta; cos de text i dades de content/ca/industrial-capacitats.md.
  industrialCapacities: {
    hero: {
      // H1 d'industrial-capacitats.md en dues línies; la segona porta el reflex metàl·lic.
      title: ['Capacitats', 'del taller'],
      action: 'Consulta materials i maquinària',
    },
    local: {
      label: 'En aquesta pàgina',
      items: [
        { label: 'Materials i maquinària', href: '#taller' },
        { label: 'Soldadura i muntatge', href: '#produccio' },
        { label: 'Requisits tècnics', href: '#requisits' },
        { label: 'Consulta', href: '#consulta' },
      ],
    },
    overview: {
      heading: ['Del material', 'a la peça'],
      materials: { label: ['Materials'] },
      // Cada placa agrupa elements de la llista «Materials» (es comprova al build).
      plates: [
        { tag: 'Acer', name: 'Carboni', art: 'carbon', items: ['Acer al carboni'] },
        { tag: 'Inoxidable', name: '304 / 316', art: 'inox', items: ['Acer inoxidable 304', 'Acer inoxidable 316'] },
      ],
      machinery: { label: ['Maquinària', 'Equip del taller'] },
      // Han de constar a la secció «Maquinària» (es comprova al build).
      machines: [
        { name: 'Plegadora', operation: 'Plegat', art: 'plegadora' },
        { name: 'Cisalla', operation: 'Tall', art: 'cisalla' },
        { name: 'Punxonadora', operation: 'Punxonat', art: 'punxonadora' },
      ],
      note: {
        label: 'Valoració segons el plànol',
        text: 'Les mides, els gruixos i les toleràncies de cada peça es revisen amb la documentació tècnica.',
      },
    },
    production: {
      heading: ['Soldem', 'Muntem'],
      lead: "Els processos i els recursos es concreten segons la peça i l'abast acordat.",
      welding: { label: 'Soldadura', processes: ['MIG/MAG', 'TIG'] },
      logistics: {
        label: 'Desplaçaments i muntatge',
        // Xifra, forma escrita al contingut i nom (es comprova a «Muntatge i logística»).
        items: [
          { value: 6, word: 'sis', label: 'furgonetes' },
          { value: 1, word: 'un', label: 'camió ploma' },
        ],
      },
    },
    requirements: {
      heading: 'Quan el projecte demana suport tècnic',
      progress: {
        label: 'Millores en curs · no són certificacions vigents',
        items: [
          { title: 'ISO 9001', state: 'En implantació' },
          { title: 'ISO 3834', state: 'En estudi' },
        ],
      },
    },
    contact: {
      heading: ['Parlem', 'de la peça'],
      // Enllaç secundari del bloc: l'encàrrec real d'Industrial (Fase 6, bloc 3, E5; validat pel director
      // el 08/10/2026). Substitueix «Torna a Industrial»; el retorn es manté a les molles de pa.
      caseLink: { label: 'Veure un encàrrec real: deu gàbies', anchor: '#projectes' },
      fieldsLabel: 'Què ens ajuda a començar',
      fields: ['Plànol o documentació', 'Material i tipus de peça', 'Unitats previstes', 'Termini necessari'],
      person: 'Contacte industrial',
    },
  },
  // Plantilla C (contacte compartit). Redisseny del director (06/10/2026,
  // fases/fase-7/FASE7-brief-refinament-global-i-contacte.md): informació a l'esquerra i formulari a la
  // dreta, sense introducció ni columna repetida. Etiquetes del formulari de content/ca/ui.md.
  // El formulari envia a la funció /api/contacte (Fase 8, 8.5); en mode de demostració no envia res.
  contactPage: {
    info: {
      label: 'Dades de contacte',
      phone: 'Telèfon',
      whatsapp: 'WhatsApp',
      email: 'Correu',
      address: 'Adreça',
      map: 'Veure el mapa',
      mobile: 'Mòbil',
    },
    form: {
      label: 'Formulari de consulta',
      demo: 'Formulari de demostració',
      branch: {
        legend: 'Tipus de consulta',
        // Per tipus d'encàrrec, no només per nombre d'unitats (reunió amb el client, 03/10/2026).
        particular: { label: 'Particulars', detail: 'Espais i reparacions' },
        empresa: { label: 'Industrial', detail: 'Sèries, peces a plànol i obra' },
      },
      fields: {
        nom: 'Nom i cognoms',
        empresa: 'Empresa',
        correu: 'Correu electrònic',
        telefon: 'Telèfon',
        ubicacio: 'Població',
        servei: 'Quin servei necessites?',
        serveiPlaceholder: 'Selecciona un servei',
        services: [
          // Valor intern «urgencies» conservat pels enllaços antics; etiqueta pública: Reparacions.
          { value: 'urgencies', label: 'Reparacions' },
          { value: 'estructures', label: 'Estructures' },
          { value: 'automatismes', label: 'Automatismes, portes i motors' },
          { value: 'mobiliari', label: 'Mobiliari a mida' },
        ],
        // Formulari d'Industrial: tipus d'encàrrec (opcional; el preselecciona l'enllaç d'origen). Inclou
        // el manteniment (12/10/2026); el camp enviat és «producte».
        produccio: "Tipus d'encàrrec",
        produccioPlaceholder: 'Selecciona una opció',
        productionServices: [
          { value: 'estructures', label: 'Estructures, baranes i escales' },
          { value: 'portes', label: 'Portes i tancaments, amb instal·lació' },
          { value: 'mobiliari', label: 'Mobiliari' },
          { value: 'carros', label: 'Carros industrials' },
          { value: 'peces', label: 'Peces i conjunts a mida' },
          { value: 'manteniment', label: 'Manteniment industrial' },
        ],
        sector: 'Sector',
        material: 'Material',
        unitats: 'Unitats previstes',
        termini: 'Termini desitjat',
        descripcio: 'Descripció',
        descripcioPlaceholder: {
          particular: 'Descriu la feina o la incidència amb les teves paraules.',
          empresa: 'Descriu la peça o el manteniment que necessites i els requisits que ja coneixes.',
        },
      },
      // Dades opcionals agrupades en un desplegable: ubicació i, a Industrial, dades tècniques.
      extra: { particular: 'Afegir més dades (opcional)', empresa: 'Afegir dades tècniques (opcional)' },
      upload: {
        particular: { label: 'Fotografia, esbós o document', help: 'Opcional.' },
        empresa: { label: 'Plànol, documentació o fotografies', help: 'Opcional.' },
        choose: 'Tria un fitxer',
        none: 'Cap fitxer seleccionat',
      },
      submit: 'Enviar consulta',
      pending: 'Formulari en preparació: encara no envia consultes. Mentrestant, truca o escriu-nos per WhatsApp.',
      // S'afegeix a l'avís mentre content/ca/legal-formulari.md no estigui aprovat (Fase 8, tasca 8.4).
      pendingPrivacy: "El text de privacitat i el consentiment s'incorporaran abans d'activar-lo.",
      // Missatges compartits amb la funció del formulari (src/lib/contact/messages.ts, Fase 8, 8.5).
      errors: contactMessages.ca.errors,
      // Mode de demostració (dry-run): les dades són correctes, però no s'envia res.
      notSent: contactMessages.ca.notSent,
    },
    place: {
      // Títol funcional petit (refinament del director, 06/10/2026). Mateix text que el H2 de contacte.md.
      heading: 'On som',
      map: 'Obrir a Google Maps',
      // Mapa interactiu a petició (indicació del director, 01/10/2026): fins que no es carrega no
      // es connecta amb Google.
      mapLoad: 'Mostra el mapa interactiu',
      mapNote: 'El mapa és de Google Maps. En mostrar-lo, Google pot desar galetes al teu navegador.',
      mapTitle: 'Mapa amb la ubicació del taller de Serralleria Carbó a Vilafranca del Penedès',
    },
  },
  // Plantilla PS (serveis de Particulars). Patró: fases/fase-4/FASE4-mockups/particulars/estructures/.
  // Cada servei declara els seus titulars i esquemes; el cos de text surt del seu fitxer de contingut.
  service: {
    breadcrumb: { label: "Fil d'Ariadna", home: 'Inici', branch: { label: 'Particulars', href: '/particulars/' } },
    // Fitxa de preparació de cada servei.
    brief: { action: 'Anar al formulari', optional: 'Opcional' },
    repair: { index: 'Necessites una reparació?', text: "Si tens una avaria en una porta o un automatisme, explica'ns què ha passat." },
    // Pont cap a Industrial a les pàgines de producte (reunió amb el client, 03/10/2026).
    pages: {
      'particulars-estructures': {
        series: true,
        // Rol de cada secció H2 de particulars-estructures.md, en ordre.
        sections: ['process', 'works', 'series', 'contact'],
        hero: {
          // Mateix text que la H1 del contingut; la paraula central va destacada (es comprova al build).
          title: ['Estructures', 'metàl·liques', 'a mida'],
          cta: "Explica'ns el teu projecte",
        },
        scope: {
          heading: ['Estructures per', 'a cada espai'],
          label: "Tipus d'estructures",
          panels: [
            { title: 'Baranes', diagram: 'barana' },
            { title: 'Escales', diagram: 'escala' },
            { title: 'Passarel·les', diagram: 'passarella' },
          ],
        },
        process: {
          heading: ['Comencem per', "entendre l'espai"],
          label: 'Informació per començar la valoració',
        },
        contactHeading: ['Comencem', 'pel teu espai'],
      },
      // Patró PS aplicat als altres serveis: titulars de la plantilla; passos, dades i casos
      // derivats del contingut de cada pàgina (README de la maqueta d'Estructures).
      'particulars-automatismes': {
        series: true,
        sections: ['process', 'works', 'urgent', 'series'],
        hero: {
          title: ['Automatismes', 'per a', 'portes'],
          cta: "Explica'ns quina porta tens",
        },
        scope: {
          heading: ['Automatismes per', 'a cada accés'],
          label: "Tipus d'accessos",
          panels: [
            { meta: 'Motorització i reparació', title: 'Portes de garatge', diagram: 'garatge' },
            { meta: 'Enrotllables', title: 'Persianes', diagram: 'persiana' },
            { meta: 'Revisió de sistemes instal·lats', title: 'Altres accessos', diagram: 'acces' },
          ],
        },
        process: {
          heading: ['Comencem per', 'conèixer la porta'],
          label: 'Informació per valorar la feina',
        },
        contactHeading: ["Explica'ns", 'el teu cas'],
      },
      'particulars-mobiliari': {
        sections: ['process', 'related'],
        hero: {
          title: ['Mobiliari', 'metàl·lic', 'a mida'],
          cta: "Explica'ns el teu projecte",
        },
        process: {
          heading: ['Comencem per', "l'ús de la peça"],
          label: 'Informació per començar la valoració',
        },
        contactHeading: ["Explica'ns", 'el projecte'],
      },
      'particulars-urgencies': {
        sections: ['direct', 'related'],
        hero: {
          title: ['Reparació de portes', 'i automatismes', 'a Vilafranca'],
          // Horari confirmat al traspàs de Fase 4 (25/09/2026) i pel director (30/09/2026); és el de
          // contacte.md. Sense promeses de temps de resposta.
          hours: 'Atenció de dilluns a divendres, de 8 a 13 h i de 15 a 18 h.',
        },
        process: {
          heading: ["Explica'ns", 'la incidència'],
          label: 'Informació sobre la incidència',
        },
        repair: false,
        contactHeading: ["Truca'ns", 'o escriu-nos'],
      },
    },
  },
};

export type UiStrings = typeof ca;

// Castellà (decisió del director, 08/10/2026: el web es publica en català i castellà des del primer
// dia). Traducció dels textos catalans aprovats, amb el mateix significat i les mateixes dades; els
// titulars han de coincidir amb content/es/ (es comprova al build). Rutes: fases/fase-5/FASE5-idiomes.md.
// Els valors dels paràmetres del formulari (tipus, servei) són claus internes i no es tradueixen.
const es: UiStrings = {
  skipLink: 'Ir al contenido',
  brandHome: 'Serralleria Carbó, volver al inicio',
  brandHomeIndustrial: 'Serralleria Carbó Industrial, volver al inicio',
  brand: { small: 'Serralleria', main: 'Carbó', tagline: 'Vilafranca del Penedès · Desde 1989' },
  language: { code: 'ES', name: 'Castellano', switchLabel: 'Ver esta página en castellano', selector: 'Idioma' },
  routes: {
    home: '/es/',
    particulars: '/es/particulares/',
    industrial: '/es/industrial/',
    capacities: '/es/industrial/capacidades/',
    projects: '/es/particulares/proyectos/',
    contact: '/es/contacto/',
    services: {
      estructures: '/es/particulares/estructuras/',
      automatismes: '/es/particulares/automatismos/',
      urgencies: '/es/particulares/reparaciones/',
    },
  },
  menu: { main: 'Navegación principal', mobile: 'Navegación móvil', open: 'Abrir el menú', close: 'Cerrar el menú' },
  headerPhoneLabel: '¿Hablamos?',
  contact: {
    whatsappMessage: 'Hola, os escribo desde la web de Serralleria Carbó. Quería hacer una consulta.',
    whatsapp: 'Escríbenos por WhatsApp',
    call: (phone: string) => `Llama al ${phone}`,
  },
  footer: {
    contact: 'Contacto',
    legal: { 'legal-avis-legal': 'Aviso legal', 'legal-privacitat': 'Privacidad', 'legal-cookies': 'Cookies' },
    pending: 'pendiente',
    backTop: 'Volver arriba',
  },
  home: {
    nav: [
      { label: 'Industrial', href: '/es/industrial/' },
      { label: 'Particulares', href: '/es/particulares/' },
      { label: 'Servicios', href: '/es/#serveis' },
      { label: 'Proyectos', href: '/es/particulares/proyectos/' },
      { label: 'Contacto', href: '/es/contacto/' },
    ],
    paths: {
      label: 'Elige tu ámbito',
      heading: 'Elige tu camino',
      particulars: { kicker: 'Viviendas · comunidades · negocios' },
      industrial: { kicker: 'Constructoras · promotoras · empresas' },
    },
    numbers: {
      heading: ['Hechos que', 'nos definen'],
      items: [
        { source: '1989', value: 1989, unit: '' },
        { source: '950 m²', value: 950, unit: 'm²' },
        { source: '12 personas', value: 12, unit: '' },
        { source: '6 furgonetas · 1 camión pluma', value: 6, unit: '+1' },
      ],
    },
    services: {
      particulars: { eyebrow: 'Espacios y reparaciones', title: 'Particulares', overview: 'Explora los servicios para particulares' },
      industrial: {
        eyebrow: 'Series, piezas según plano y obra',
        title: 'Industrial',
        overview: 'Conoce Industrial',
        products: ['Estructuras y barandillas', 'Puertas con instalación', 'Mobiliario', 'Carros industriales', 'Piezas y conjuntos a medida'],
      },
      tiles: [
        { detail: 'Fabricación, instalación y motorización' },
        { detail: 'Escaleras y pasarelas' },
        { detail: 'Para particulares y decoradores' },
        { detail: 'Puertas, persianas y motores' },
        { detail: 'Acero al carbono e inoxidable' },
      ],
    },
  },
  legal: {
    crumb: 'Textos legales',
    toc: 'En esta página',
    others: 'Otros textos legales',
    updated: 'Última actualización',
    empty: 'Texto pendiente: lo redactará o validará el cliente o su asesor.',
    // Les traduccions castellanes dels textos de l'advocat estan pendents de validació jurídica
    // (08/10/2026): es mostren amb aquest avís i noindex fins que s'aprovin.
    review: {
      title: 'Traducción pendiente de revisión jurídica',
      text: 'Esta versión en castellano es una traducción del texto legal aprobado en catalán y está pendiente de la validación del cliente y de su asesor jurídico.',
    },
    draft: {
      title: 'Borrador no publicable',
      text: 'Esta vista solo existe en desarrollo para revisar la plantilla. La página no se genera en el build hasta que el texto esté aprobado.',
    },
  },
  notFound: { waysLabel: 'Caminos para continuar' },
  particulars: {
    nav: [
      { label: 'Reparaciones', href: '/es/particulares/reparaciones/' },
      { label: 'Estructuras', href: '/es/particulares/estructuras/' },
      { label: 'Automatismos', href: '/es/particulares/automatismos/' },
      // Mobiliari és una ruta ajornada: porta al formulari amb el servei preseleccionat, com en català.
      { label: 'Consulta mobiliario', href: '/es/contacto/?tipus=particular&servei=mobiliari' },
      { label: 'Proyectos', href: '/es/particulares/proyectos/' },
      { label: 'Contacto', href: '/es/contacto/?tipus=particular' },
    ],
    hero: {
      otherBranch: { label: '¿Constructora, promotora, serie o pieza según plano? Industrial', href: '/es/industrial/#produccio' },
      title: ['Cerrajería para', 'particulares', 'en Vilafranca y alrededores'],
    },
    urgent: {
      heading: '¿Tienes una avería?',
      text: 'Si falla una puerta o un automatismo, llámanos y cuéntanos qué ha pasado. Atención de lunes a viernes, de 8 a 13 h y de 15 a 18 h.',
      form: { label: 'Formulario de contacto', href: '/es/contacto/?tipus=particular' },
    },
    services: {
      heading: ['Trabajos a medida', 'Respuestas claras'],
    },
    projects: {
      heading: ['Hechos, no solo', 'palabras'],
      featured: ['baranes-interior-casa', 'estructura-ascensor', 'persianes-negoci'],
      talk: 'Hablemos de tu proyecto',
    },
    contactHeading: ['Cuéntanos', 'el trabajo'],
  },
  projectContexts: {
    'passarella-interior': 'Vivienda',
    'estructura-ascensor': 'Comunidad',
    'porta-parquing': 'Comunidad',
    'persianes-negoci': 'Negocio',
    'baranes-interior-casa': 'Vivienda',
  },
  portfolio: {
    hero: {
      title: ['Proyectos de', 'cerrajería'],
      cta: 'Explora los proyectos',
    },
    work: {
      heading: ['Cinco trabajos', 'Cinco contextos'],
    },
    filters: { label: 'Filtra los proyectos por servicio', title: 'Filtra por servicio', all: 'Todos', status: '{n} proyectos visibles' },
    caseLink: { estructures: 'Ver el servicio de estructuras', automatismes: 'Ver automatismos' },
    more: { heading: ['Del trabajo', 'a tu proyecto'] },
    contactHeading: ['Cuéntanos', 'la idea'],
  },
  industrial: {
    phoneLabel: 'Consulta industrial',
    home: { label: 'Inicio', href: '/es/industrial/' },
    hero: {
      overline: ['Industrial', 'Fabricación metálica para terceros'],
      title: ['Series cortas y medianas', 'Piezas exigentes', 'Respuesta industrial'],
      primary: 'Ver las capacidades del taller',
      bottom: 'Vilafranca del Penedès · Cataluña',
    },
    proof: {
      label: 'Datos confirmados de la empresa',
      lead: 'Un taller para pasar del plano a la pieza.',
      items: [
        { value: 950, unit: 'm²', label: 'de taller' },
        { value: 12, unit: '', label: 'personas en la empresa' },
      ],
    },
    production: {
      heading: ['Qué', 'fabricamos'],
      label: 'Productos que fabricamos',
      services: ['estructures', 'portes', 'mobiliari', 'carros', 'peces'],
      productAction: 'abre una consulta técnica',
      action: 'Envía una consulta técnica',
    },
    maintenance: {
      label: 'Servicio para empresas',
      heading: ['Mantenimiento', 'industrial'],
    },
    workshop: {
      heading: ['El taller', 'en primer plano'],
      materials: { head: ['Materiales'], title: ['Acero e', 'inoxidable'] },
      machines: { head: ['Maquinaria', 'Equipo del taller'], title: ['Transformación', 'del metal'], foot: 'Plegadora' },
      welding: { head: ['Soldadura', 'Procesos disponibles'], title: ['Procesos', 'de soldadura'] },
      mounting: { head: ['Montaje', 'Equipo propio'], title: ['Del taller', 'al montaje'], text: 'Equipo propio para los desplazamientos y el montaje.' },
      progress: {
        label: 'En proceso, no certificaciones vigentes',
        items: [
          { title: 'ISO 9001', state: 'En implantación' },
          { title: 'ISO 3834', state: 'En estudio' },
          { title: 'Automatización', state: 'Y robotización de procesos, en curso' },
        ],
      },
    },
    series: {
      heading: ['La serie empieza', 'con una', 'pieza'],
      method: { label: 'Del requisito a la pieza' },
    },
    sectors: {
      heading: ['Experiencia', 'en cuatro sectores'],
      label: 'Sectores con experiencia',
      items: [
        { name: 'Alimentación', art: 'alimentacio' },
        { name: 'Sanitario', art: 'sanitari' },
        { name: 'Packaging', art: 'packaging' },
        { name: 'Bodegas', art: 'cellers' },
      ],
    },
    project: {
      heading: ['Un encargo real', 'Diez jaulas'],
    },
    contact: {
      heading: ['Hablemos de', 'tu encargo'],
      guideLabel: 'Para valorar la consulta',
      guide: ['Qué necesitas', 'Ubicación de la intervención, si procede', 'Documentación o fotografías, si las tienes', 'Material, unidades y plazo, si procede'],
      methodLabel: 'Contacto directo',
    },
  },
  industrialCapacities: {
    hero: {
      title: ['Capacidades', 'del taller'],
      action: 'Consulta materiales y maquinaria',
    },
    local: {
      label: 'En esta página',
      items: [
        { label: 'Materiales y maquinaria', href: '#taller' },
        { label: 'Soldadura y montaje', href: '#produccio' },
        { label: 'Requisitos técnicos', href: '#requisits' },
        { label: 'Consulta', href: '#consulta' },
      ],
    },
    overview: {
      heading: ['Del material', 'a la pieza'],
      materials: { label: ['Materiales'] },
      plates: [
        { tag: 'Acero', name: 'Carbono', art: 'carbon', items: ['Acero al carbono'] },
        { tag: 'Inoxidable', name: '304 / 316', art: 'inox', items: ['Acero inoxidable 304', 'Acero inoxidable 316'] },
      ],
      machinery: { label: ['Maquinaria', 'Equipo del taller'] },
      machines: [
        { name: 'Plegadora', operation: 'Plegado', art: 'plegadora' },
        { name: 'Cizalla', operation: 'Corte', art: 'cisalla' },
        { name: 'Punzonadora', operation: 'Punzonado', art: 'punxonadora' },
      ],
      note: {
        label: 'Valoración según el plano',
        text: 'Las medidas, los espesores y las tolerancias de cada pieza se revisan con la documentación técnica.',
      },
    },
    production: {
      heading: ['Soldamos', 'Montamos'],
      lead: 'Los procesos y los recursos se concretan según la pieza y el alcance acordado.',
      welding: { label: 'Soldadura', processes: ['MIG/MAG', 'TIG'] },
      logistics: {
        label: 'Desplazamientos y montaje',
        items: [
          { value: 6, word: 'seis', label: 'furgonetas' },
          { value: 1, word: 'un', label: 'camión pluma' },
        ],
      },
    },
    requirements: {
      heading: 'Cuando el proyecto requiere apoyo técnico',
      progress: {
        label: 'Mejoras en curso · no son certificaciones vigentes',
        items: [
          { title: 'ISO 9001', state: 'En implantación' },
          { title: 'ISO 3834', state: 'En estudio' },
        ],
      },
    },
    contact: {
      heading: ['Hablemos', 'de la pieza'],
      caseLink: { label: 'Ver un encargo real: diez jaulas', anchor: '#projectes' },
      fieldsLabel: 'Qué nos ayuda a empezar',
      fields: ['Plano o documentación', 'Material y tipo de pieza', 'Unidades previstas', 'Plazo necesario'],
      person: 'Contacto industrial',
    },
  },
  contactPage: {
    info: {
      label: 'Datos de contacto',
      phone: 'Teléfono',
      whatsapp: 'WhatsApp',
      email: 'Correo',
      address: 'Dirección',
      map: 'Ver el mapa',
      mobile: 'Móvil',
    },
    form: {
      label: 'Formulario de consulta',
      demo: 'Formulario de demostración',
      branch: {
        legend: 'Tipo de consulta',
        particular: { label: 'Particulares', detail: 'Espacios y reparaciones' },
        empresa: { label: 'Industrial', detail: 'Series, piezas según plano y obra' },
      },
      fields: {
        nom: 'Nombre y apellidos',
        empresa: 'Empresa',
        correu: 'Correo electrónico',
        telefon: 'Teléfono',
        ubicacio: 'Población',
        servei: '¿Qué servicio necesitas?',
        serveiPlaceholder: 'Selecciona un servicio',
        services: [
          { value: 'urgencies', label: 'Reparaciones' },
          { value: 'estructures', label: 'Estructuras' },
          { value: 'automatismes', label: 'Automatismos, puertas y motores' },
          { value: 'mobiliari', label: 'Mobiliario a medida' },
        ],
        produccio: 'Tipo de encargo',
        produccioPlaceholder: 'Selecciona una opción',
        productionServices: [
          { value: 'estructures', label: 'Estructuras, barandillas y escaleras' },
          { value: 'portes', label: 'Puertas y cerramientos, con instalación' },
          { value: 'mobiliari', label: 'Mobiliario' },
          { value: 'carros', label: 'Carros industriales' },
          { value: 'peces', label: 'Piezas y conjuntos a medida' },
          { value: 'manteniment', label: 'Mantenimiento industrial' },
        ],
        sector: 'Sector',
        material: 'Material',
        unitats: 'Unidades previstas',
        termini: 'Plazo deseado',
        descripcio: 'Descripción',
        descripcioPlaceholder: {
          particular: 'Describe el trabajo o la incidencia con tus propias palabras.',
          empresa: 'Describe la pieza o el mantenimiento que necesitas y los requisitos que ya conoces.',
        },
      },
      extra: { particular: 'Añadir más datos (opcional)', empresa: 'Añadir datos técnicos (opcional)' },
      upload: {
        particular: { label: 'Fotografía, boceto o documento', help: 'Opcional.' },
        empresa: { label: 'Plano, documentación o fotografías', help: 'Opcional.' },
        choose: 'Elige un archivo',
        none: 'Ningún archivo seleccionado',
      },
      submit: 'Enviar consulta',
      pending: 'Formulario en preparación: todavía no envía consultas. Mientras tanto, llámanos o escríbenos por WhatsApp.',
      pendingPrivacy: 'El texto de privacidad y el consentimiento se incorporarán antes de activarlo.',
      errors: contactMessages.es.errors,
      notSent: contactMessages.es.notSent,
    },
    place: {
      heading: 'Dónde estamos',
      map: 'Abrir en Google Maps',
      mapLoad: 'Mostrar el mapa interactivo',
      mapNote: 'El mapa es de Google Maps. Al mostrarlo, Google puede guardar cookies en tu navegador.',
      mapTitle: 'Mapa con la ubicación del taller de Serralleria Carbó en Vilafranca del Penedès',
    },
  },
  service: {
    breadcrumb: { label: 'Ruta de navegación', home: 'Inicio', branch: { label: 'Particulares', href: '/es/particulares/' } },
    brief: { action: 'Ir al formulario', optional: 'Opcional' },
    repair: { index: '¿Necesitas una reparación?', text: 'Si tienes una avería en una puerta o un automatismo, cuéntanos qué ha pasado.' },
    pages: {
      'particulars-estructures': {
        series: true,
        sections: ['process', 'works', 'series', 'contact'],
        hero: {
          title: ['Estructuras', 'metálicas', 'a medida'],
          cta: 'Cuéntanos tu proyecto',
        },
        scope: {
          heading: ['Estructuras para', 'cada espacio'],
          label: 'Tipos de estructuras',
          panels: [
            { title: 'Barandillas', diagram: 'barana' },
            { title: 'Escaleras', diagram: 'escala' },
            { title: 'Pasarelas', diagram: 'passarella' },
          ],
        },
        process: {
          heading: ['Empecemos por', 'entender el espacio'],
          label: 'Información para empezar la valoración',
        },
        contactHeading: ['Empecemos', 'por tu espacio'],
      },
      'particulars-automatismes': {
        series: true,
        sections: ['process', 'works', 'urgent', 'series'],
        hero: {
          title: ['Automatismos', 'para', 'puertas'],
          cta: 'Cuéntanos qué puerta tienes',
        },
        scope: {
          heading: ['Automatismos para', 'cada acceso'],
          label: 'Tipos de accesos',
          panels: [
            { meta: 'Motorización y reparación', title: 'Puertas de garaje', diagram: 'garatge' },
            { meta: 'Enrollables', title: 'Persianas', diagram: 'persiana' },
            { meta: 'Revisión de sistemas instalados', title: 'Otros accesos', diagram: 'acces' },
          ],
        },
        process: {
          heading: ['Empecemos por', 'conocer la puerta'],
          label: 'Información para valorar el trabajo',
        },
        contactHeading: ['Cuéntanos', 'tu caso'],
      },
      // Ruta ajornada també en castellà: no es genera. Es manté l'estructura del diccionari.
      'particulars-mobiliari': {
        sections: ['process', 'related'],
        hero: {
          title: ['Mobiliario', 'metálico', 'a medida'],
          cta: 'Cuéntanos tu proyecto',
        },
        process: {
          heading: ['Empecemos por', 'el uso de la pieza'],
          label: 'Información para empezar la valoración',
        },
        contactHeading: ['Cuéntanos', 'el proyecto'],
      },
      'particulars-urgencies': {
        sections: ['direct', 'related'],
        hero: {
          title: ['Reparación de puertas', 'y automatismos', 'en Vilafranca'],
          hours: 'Atención de lunes a viernes, de 8 a 13 h y de 15 a 18 h.',
        },
        process: {
          heading: ['Cuéntanos', 'la incidencia'],
          label: 'Información sobre la incidencia',
        },
        repair: false,
        contactHeading: ['Llámanos', 'o escríbenos'],
      },
    },
  },
};

// Anglès (director, 12/10/2026). Traducció dels textos catalans aprovats, amb el mateix significat i
// les mateixes dades, pendent d'aprovació; els titulars han de coincidir amb content/en/ (es comprova al
// build). Rutes: fases/fase-5/FASE5-idiomes.md. Particulars es diu «Residential» (slug residential).
const en: UiStrings = {
  skipLink: 'Skip to content',
  brandHome: 'Serralleria Carbó, back to home',
  brandHomeIndustrial: 'Serralleria Carbó Industrial, back to home',
  brand: { small: 'Serralleria', main: 'Carbó', tagline: 'Vilafranca del Penedès · Since 1989' },
  language: { code: 'EN', name: 'English', switchLabel: 'View this page in English', selector: 'Language' },
  routes: {
    home: '/en/',
    particulars: '/en/residential/',
    industrial: '/en/industrial/',
    capacities: '/en/industrial/capabilities/',
    projects: '/en/residential/projects/',
    contact: '/en/contact/',
    services: {
      estructures: '/en/residential/structures/',
      automatismes: '/en/residential/door-automation/',
      urgencies: '/en/residential/repairs/',
    },
  },
  menu: { main: 'Main navigation', mobile: 'Mobile navigation', open: 'Open the menu', close: 'Close the menu' },
  headerPhoneLabel: 'Shall we talk?',
  contact: {
    whatsappMessage: 'Hello, I am writing from the Serralleria Carbó website. I would like to make an enquiry.',
    whatsapp: 'Message us on WhatsApp',
    call: (phone: string) => `Call ${phone}`,
  },
  footer: {
    contact: 'Contact',
    legal: { 'legal-avis-legal': 'Legal notice', 'legal-privacitat': 'Privacy', 'legal-cookies': 'Cookies' },
    pending: 'pending',
    backTop: 'Back to top',
  },
  home: {
    nav: [
      { label: 'Industrial', href: '/en/industrial/' },
      { label: 'Residential', href: '/en/residential/' },
      { label: 'Services', href: '/en/#serveis' },
      { label: 'Projects', href: '/en/residential/projects/' },
      { label: 'Contact', href: '/en/contact/' },
    ],
    paths: {
      label: 'Choose your area',
      heading: 'Choose your path',
      particulars: { kicker: 'Homes · communities · businesses' },
      industrial: { kicker: 'Builders · developers · companies' },
    },
    numbers: {
      heading: ['Facts that', 'define us'],
      items: [
        { source: '1989', value: 1989, unit: '' },
        { source: '950 m²', value: 950, unit: 'm²' },
        { source: '12 people', value: 12, unit: '' },
        { source: '6 vans · 1 crane truck', value: 6, unit: '+1' },
      ],
    },
    services: {
      particulars: { eyebrow: 'Spaces and repairs', title: 'Residential', overview: 'Explore our residential services' },
      industrial: {
        eyebrow: 'Series, parts to drawing and construction',
        title: 'Industrial',
        overview: 'Discover Industrial',
        products: ['Structures and railings', 'Doors with installation', 'Furniture', 'Industrial trolleys', 'Made-to-measure parts and assemblies'],
      },
      tiles: [
        { detail: 'Fabrication, installation and motorisation' },
        { detail: 'Staircases and walkways' },
        { detail: 'For private clients and decorators' },
        { detail: 'Doors, roller shutters and motors' },
        { detail: 'Carbon and stainless steel' },
      ],
    },
  },
  legal: {
    crumb: 'Legal texts',
    toc: 'On this page',
    others: 'Other legal texts',
    updated: 'Last updated',
    empty: 'Text pending: it will be written or validated by the client or their adviser.',
    // Les traduccions angleses dels textos de l'advocat estan pendents de validació jurídica
    // (12/10/2026): es mostren amb aquest avís i noindex fins que s'aprovin.
    review: {
      title: 'Translation pending legal review',
      text: 'This English version is a translation of the legal text approved in Catalan and is pending validation by the client and their legal adviser.',
    },
    draft: {
      title: 'Unpublishable draft',
      text: 'This view only exists in development to review the template. The page is not generated in the build until the text is approved.',
    },
  },
  notFound: { waysLabel: 'Ways to continue' },
  particulars: {
    nav: [
      { label: 'Repairs', href: '/en/residential/repairs/' },
      { label: 'Structures', href: '/en/residential/structures/' },
      { label: 'Automation', href: '/en/residential/door-automation/' },
      // Mobiliari és una ruta ajornada: porta al formulari amb el servei preseleccionat, com en català.
      { label: 'Ask about furniture', href: '/en/contact/?tipus=particular&servei=mobiliari' },
      { label: 'Projects', href: '/en/residential/projects/' },
      { label: 'Contact', href: '/en/contact/?tipus=particular' },
    ],
    hero: {
      otherBranch: { label: 'Builder, developer, series or part to drawing? Industrial', href: '/en/industrial/#produccio' },
      title: ['Residential', 'metalwork', 'in Vilafranca and the surrounding area'],
    },
    urgent: {
      heading: 'Got a breakdown?',
      text: 'If a door or an automation system fails, call us and tell us what has happened. Open Monday to Friday, 8 am to 1 pm and 3 pm to 6 pm.',
      form: { label: 'Contact form', href: '/en/contact/?tipus=particular' },
    },
    services: {
      heading: ['Made-to-measure work', 'Clear answers'],
    },
    projects: {
      heading: ['Facts, not just', 'words'],
      featured: ['baranes-interior-casa', 'estructura-ascensor', 'persianes-negoci'],
      talk: "Let's talk about your project",
    },
    contactHeading: ['Tell us', 'about the job'],
  },
  projectContexts: {
    'passarella-interior': 'Home',
    'estructura-ascensor': 'Community',
    'porta-parquing': 'Community',
    'persianes-negoci': 'Business',
    'baranes-interior-casa': 'Home',
  },
  portfolio: {
    hero: {
      title: ['Metalwork', 'projects'],
      cta: 'Explore the projects',
    },
    work: {
      heading: ['Five jobs', 'Five settings'],
    },
    filters: { label: 'Filter the projects by service', title: 'Filter by service', all: 'All', status: '{n} projects shown' },
    caseLink: { estructures: 'See the structures service', automatismes: 'See automation' },
    more: { heading: ['From our work', 'to your project'] },
    contactHeading: ['Tell us', 'your idea'],
  },
  industrial: {
    phoneLabel: 'Industrial enquiries',
    home: { label: 'Home', href: '/en/industrial/' },
    hero: {
      overline: ['Industrial', 'Contract metal fabrication'],
      title: ['Short and medium runs', 'Demanding parts', 'Industrial response'],
      primary: 'See the workshop capabilities',
      bottom: 'Vilafranca del Penedès · Catalonia',
    },
    proof: {
      label: 'Confirmed company data',
      lead: 'A workshop to go from drawing to part.',
      items: [
        { value: 950, unit: 'm²', label: 'workshop' },
        { value: 12, unit: '', label: 'people in the company' },
      ],
    },
    production: {
      heading: ['What', 'we fabricate'],
      label: 'Products we fabricate',
      services: ['estructures', 'portes', 'mobiliari', 'carros', 'peces'],
      productAction: 'opens a technical enquiry',
      action: 'Send a technical enquiry',
    },
    maintenance: {
      label: 'Service for companies',
      heading: ['Industrial', 'maintenance'],
    },
    workshop: {
      heading: ['The workshop', 'up close'],
      materials: { head: ['Materials'], title: ['Steel and', 'stainless steel'] },
      machines: { head: ['Machinery', 'Workshop equipment'], title: ['Metal', 'forming'], foot: 'Press brake' },
      welding: { head: ['Welding', 'Available processes'], title: ['Welding', 'processes'] },
      mounting: { head: ['Installation', 'Our own team'], title: ['From the workshop', 'to installation'], text: 'Our own team for travel and installation.' },
      progress: {
        label: 'In progress, not current certifications',
        items: [
          { title: 'ISO 9001', state: 'Being implemented' },
          { title: 'ISO 3834', state: 'Under study' },
          { title: 'Automation', state: 'And process robotisation, in progress' },
        ],
      },
    },
    series: {
      heading: ['A series starts', 'with one', 'part'],
      method: { label: 'From requirement to part' },
    },
    sectors: {
      heading: ['Experience', 'in four sectors'],
      label: 'Sectors with experience',
      items: [
        { name: 'Food', art: 'alimentacio' },
        { name: 'Healthcare', art: 'sanitari' },
        { name: 'Packaging', art: 'packaging' },
        { name: 'Wineries', art: 'cellers' },
      ],
    },
    project: {
      heading: ['A real job', 'Ten cages'],
    },
    contact: {
      heading: ["Let's talk about", 'your job'],
      guideLabel: 'To assess your enquiry',
      guide: ['What you need', 'Location of the job, if applicable', 'Documentation or photos, if you have them', 'Material, units and lead time, if applicable'],
      methodLabel: 'Direct contact',
    },
  },
  industrialCapacities: {
    hero: {
      title: ['Workshop', 'capabilities'],
      action: 'See materials and machinery',
    },
    local: {
      label: 'On this page',
      items: [
        { label: 'Materials and machinery', href: '#taller' },
        { label: 'Welding and installation', href: '#produccio' },
        { label: 'Technical requirements', href: '#requisits' },
        { label: 'Enquiry', href: '#consulta' },
      ],
    },
    overview: {
      heading: ['From material', 'to part'],
      materials: { label: ['Materials'] },
      plates: [
        { tag: 'Steel', name: 'Carbon', art: 'carbon', items: ['Carbon steel'] },
        { tag: 'Stainless', name: '304 / 316', art: 'inox', items: ['304 stainless steel', '316 stainless steel'] },
      ],
      machinery: { label: ['Machinery', 'Workshop equipment'] },
      machines: [
        { name: 'Press brake', operation: 'Bending', art: 'plegadora' },
        { name: 'Shear', operation: 'Cutting', art: 'cisalla' },
        { name: 'Punching machine', operation: 'Punching', art: 'punxonadora' },
      ],
      note: {
        label: 'Assessment based on the drawing',
        text: 'The dimensions, thicknesses and tolerances of each part are reviewed with the technical documentation.',
      },
    },
    production: {
      heading: ['We weld', 'We install'],
      lead: 'Processes and resources are defined according to the part and the agreed scope.',
      welding: { label: 'Welding', processes: ['MIG/MAG', 'TIG'] },
      logistics: {
        label: 'Travel and installation',
        items: [
          { value: 6, word: 'six', label: 'vans' },
          { value: 1, word: 'a', label: 'crane truck' },
        ],
      },
    },
    requirements: {
      heading: 'When the project requires technical support',
      progress: {
        label: 'Improvements in progress · not current certifications',
        items: [
          { title: 'ISO 9001', state: 'Being implemented' },
          { title: 'ISO 3834', state: 'Under study' },
        ],
      },
    },
    contact: {
      heading: ["Let's talk", 'about the part'],
      caseLink: { label: 'See a real job: ten cages', anchor: '#projectes' },
      fieldsLabel: 'What helps us get started',
      fields: ['Drawing or documentation', 'Material and type of part', 'Expected units', 'Required lead time'],
      person: 'Industrial contact',
    },
  },
  contactPage: {
    info: {
      label: 'Contact details',
      phone: 'Phone',
      whatsapp: 'WhatsApp',
      email: 'Email',
      address: 'Address',
      map: 'See the map',
      mobile: 'Mobile',
    },
    form: {
      label: 'Enquiry form',
      demo: 'Demonstration form',
      branch: {
        legend: 'Type of enquiry',
        particular: { label: 'Residential', detail: 'Spaces and repairs' },
        empresa: { label: 'Industrial', detail: 'Series, parts to drawing and construction' },
      },
      fields: {
        nom: 'Full name',
        empresa: 'Company',
        correu: 'Email',
        telefon: 'Phone',
        ubicacio: 'Town',
        servei: 'Which service do you need?',
        serveiPlaceholder: 'Select a service',
        services: [
          { value: 'urgencies', label: 'Repairs' },
          { value: 'estructures', label: 'Structures' },
          { value: 'automatismes', label: 'Automation, doors and motors' },
          { value: 'mobiliari', label: 'Made-to-measure furniture' },
        ],
        produccio: 'Type of job',
        produccioPlaceholder: 'Select an option',
        productionServices: [
          { value: 'estructures', label: 'Structures, railings and staircases' },
          { value: 'portes', label: 'Doors and enclosures, with installation' },
          { value: 'mobiliari', label: 'Furniture' },
          { value: 'carros', label: 'Industrial trolleys' },
          { value: 'peces', label: 'Made-to-measure parts and assemblies' },
          { value: 'manteniment', label: 'Industrial maintenance' },
        ],
        sector: 'Sector',
        material: 'Material',
        unitats: 'Expected units',
        termini: 'Desired lead time',
        descripcio: 'Description',
        descripcioPlaceholder: {
          particular: 'Describe the job or the fault in your own words.',
          empresa: 'Describe the part or the maintenance you need and the requirements you already know.',
        },
      },
      extra: { particular: 'Add more details (optional)', empresa: 'Add technical details (optional)' },
      upload: {
        particular: { label: 'Photo, sketch or document', help: 'Optional.' },
        empresa: { label: 'Drawing, documentation or photos', help: 'Optional.' },
        choose: 'Choose a file',
        none: 'No file selected',
      },
      submit: 'Send enquiry',
      pending: 'Form in preparation: it does not send enquiries yet. In the meantime, call us or message us on WhatsApp.',
      pendingPrivacy: 'The privacy text and consent will be added before it is activated.',
      errors: contactMessages.en.errors,
      notSent: contactMessages.en.notSent,
    },
    place: {
      heading: 'Where we are',
      map: 'Open in Google Maps',
      mapLoad: 'Show the interactive map',
      mapNote: 'The map is from Google Maps. When you show it, Google may store cookies in your browser.',
      mapTitle: 'Map showing the location of the Serralleria Carbó workshop in Vilafranca del Penedès',
    },
  },
  service: {
    breadcrumb: { label: 'Breadcrumb', home: 'Home', branch: { label: 'Residential', href: '/en/residential/' } },
    brief: { action: 'Go to the form', optional: 'Optional' },
    repair: { index: 'Need a repair?', text: 'If a door or an automation system has broken down, tell us what has happened.' },
    pages: {
      'particulars-estructures': {
        series: true,
        sections: ['process', 'works', 'series', 'contact'],
        hero: {
          title: ['Made-to-measure', 'metal', 'structures'],
          cta: 'Tell us about your project',
        },
        scope: {
          heading: ['Structures for', 'every space'],
          label: 'Types of structures',
          panels: [
            { title: 'Railings', diagram: 'barana' },
            { title: 'Staircases', diagram: 'escala' },
            { title: 'Walkways', diagram: 'passarella' },
          ],
        },
        process: {
          heading: ["Let's start by", 'understanding the space'],
          label: 'Information to start the assessment',
        },
        contactHeading: ["Let's start", 'with your space'],
      },
      'particulars-automatismes': {
        series: true,
        sections: ['process', 'works', 'urgent', 'series'],
        hero: {
          title: ['Automation', 'for', 'doors'],
          cta: 'Tell us which door you have',
        },
        scope: {
          heading: ['Automation for', 'every entrance'],
          label: 'Types of entrances',
          panels: [
            { meta: 'Motorisation and repair', title: 'Garage doors', diagram: 'garatge' },
            { meta: 'Roll-up', title: 'Roller shutters', diagram: 'persiana' },
            { meta: 'Servicing of installed systems', title: 'Other entrances', diagram: 'acces' },
          ],
        },
        process: {
          heading: ["Let's start by", 'getting to know the door'],
          label: 'Information to assess the job',
        },
        contactHeading: ['Tell us', 'about your case'],
      },
      // Ruta ajornada també en anglès: no es genera. Es manté l'estructura del diccionari.
      'particulars-mobiliari': {
        sections: ['process', 'related'],
        hero: {
          title: ['Made-to-measure', 'metal', 'furniture'],
          cta: 'Tell us about your project',
        },
        process: {
          heading: ["Let's start with", 'how the piece will be used'],
          label: 'Information to start the assessment',
        },
        contactHeading: ['Tell us', 'about the project'],
      },
      'particulars-urgencies': {
        sections: ['direct', 'related'],
        hero: {
          title: ['Door and automation', 'repairs', 'in Vilafranca'],
          hours: 'Open Monday to Friday, 8 am to 1 pm and 3 pm to 6 pm.',
        },
        process: {
          heading: ['Tell us', 'about the fault'],
          label: 'Information about the fault',
        },
        repair: false,
        contactHeading: ['Call us', 'or write to us'],
      },
    },
  },
};

const strings: Partial<Record<Locale, UiStrings>> = { ca, es, en };

export function useUi(locale: Locale): UiStrings {
  const dictionary = strings[locale];
  if (!dictionary) throw new Error(`Falten els textos d'interfície validats per a «${locale}».`);
  return dictionary;
}
