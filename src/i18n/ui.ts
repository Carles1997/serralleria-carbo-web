import type { Locale } from './config';
import { resolveRoute } from '../config/routes';

// Textos d'interfície. Origen: content/ca/ui.md i les etiquetes de les maquetes
// validades de Fase 4 (fases/fase-4/FASE4-mockups/). El contingut de pàgina no
// va aquí, sinó a content/{idioma}/. ES i EN s'afegiran amb traduccions validades.
const ca = {
  skipLink: 'Vés al contingut',
  brandHome: "Serralleria Carbó, torna a l'inici",
  brand: { small: 'Serralleria', main: 'Carbó', tagline: 'Vilafranca del Penedès · Des de 1989' },
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
    nav: [
      { label: 'Particulars', href: '/particulars/' },
      { label: 'Industrial', href: '/industrial/' },
      { label: 'Serveis', href: '/#serveis' },
      // El portafoli és de Particulars (brief de millores UX, Fase 7): l'etiqueta ho diu.
      { label: 'Projectes particulars', href: '/particulars/projectes/' },
    ],
    mobileExtra: [{ label: 'Contacte', href: '/contacte/' }],
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
        { detail: 'Ferro i inoxidable' },
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
      { label: 'Urgències', href: '/particulars/urgencies/' },
      { label: 'Estructures', href: '/particulars/estructures/' },
      { label: 'Automatismes', href: '/particulars/automatismes/' },
      // Ruta ajornada (config/routes.ts): porta al formulari amb Mobiliari preseleccionat.
      // L'etiqueta diu l'acció real: la ruta de detall està ajornada i obre la consulta.
      { label: 'Consulta mobiliari', href: resolveRoute('/particulars/mobiliari/') },
      { label: 'Projectes', href: '/particulars/projectes/' },
      { label: 'Contacte', href: '/contacte/?tipus=particular' },
    ],
    mobileExtra: [{ label: 'Industrial ↗', href: '/industrial/' }],
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
    nav: [
      { label: 'Capacitats', href: '/industrial/capacitats/' },
      // Rutes ajornades (config/routes.ts): porten a la secció de la portada.
      // Nom comercial «Fabricació en sèrie» (refinament del director, 06/10/2026); la ruta ajornada
      // /industrial/series-curtes/ conserva el seu destí resolt a la producció.
      { label: 'Fabricació en sèrie', href: resolveRoute('/industrial/series-curtes/') },
      { label: 'Sectors', href: resolveRoute('/industrial/sectors/') },
      { label: 'Procés', href: resolveRoute('/industrial/proces/') },
      { label: 'Projectes', href: resolveRoute('/industrial/projectes/') },
      { label: 'Contacte', href: '/contacte/?tipus=empresa' },
    ],
    mobileExtra: [{ label: 'Serralleria per a particulars ↗', href: '/particulars/' }],
    phoneLabel: 'Consulta industrial',
    // Pàgines interiors (plantilla II): la maqueta afegeix «Inici» (portada d'Industrial) davant del menú.
    home: { label: 'Inici', href: '/industrial/' },
    hero: {
      overline: ['Industrial', 'Fabricació metàl·lica per a tercers'],
      // Missatge aprovat (H1 d'industrial.md) en tres línies sense punt final, com a la maqueta;
      // l'última porta el reflex metàl·lic.
      title: ['Fabricació en sèrie', 'Peces exigents', 'Resposta industrial'],
      primary: 'Veure les capacitats del taller',
      secondary: 'Envia una consulta',
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
      action: "Explica'ns el teu projecte",
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
      action: 'Consultar una sèrie',
    },
    sectors: {
      heading: ['Experiència', 'en cinc sectors'],
      label: 'Sectors amb experiència',
      // Han de constar al paràgraf de sectors d'industrial.md (es comprova al build).
      items: [
        { name: 'Alimentació', art: 'alimentacio' },
        { name: 'Sanitari', art: 'sanitari' },
        { name: 'Packaging', art: 'packaging' },
        { name: 'Cellers', art: 'cellers' },
        { name: 'Tecnologies duals', art: 'duals' },
      ],
    },
    project: {
      heading: ['Un encàrrec real', 'Deu gàbies'],
    },
    contact: {
      heading: ['Parlem de', 'la peça'],
      guideLabel: 'Per valorar la consulta',
      guide: ['Plànol o documentació', 'Material i aplicació', 'Unitats previstes', 'Termini que necessites'],
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
      back: 'Torna a Industrial',
      fieldsLabel: 'Què ens ajuda a començar',
      fields: ['Plànol o documentació', 'Material i tipus de peça', 'Unitats previstes', 'Termini necessari'],
      person: 'Contacte industrial',
    },
  },
  // Plantilla C (contacte compartit). Redisseny del director (06/10/2026,
  // fases/fase-7/FASE7-brief-refinament-global-i-contacte.md): informació a l'esquerra i formulari a la
  // dreta, sense introducció ni columna repetida. Etiquetes del formulari de content/ca/ui.md.
  // El formulari encara no envia: no hi ha cap estat d'èxit.
  contactPage: {
    nav: [
      { label: 'Inici', href: '/' },
      { label: 'Particulars', href: '/particulars/' },
      { label: 'Industrial', href: '/industrial/' },
      { label: 'Contacte', href: '/contacte/' },
    ],
    info: {
      label: 'Dades de contacte',
      phone: 'Telèfon',
      whatsapp: 'WhatsApp',
      email: 'Correu',
      address: 'Adreça',
      map: 'Veure el mapa',
      landline: 'Telèfon fix',
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
          { value: 'urgencies', label: 'Urgències i reparacions' },
          { value: 'estructures', label: 'Estructures' },
          { value: 'automatismes', label: 'Automatismes, portes i motors' },
          { value: 'mobiliari', label: 'Mobiliari a mida' },
        ],
        // Formulari d'Industrial: producte (opcional; el preselecciona l'enllaç d'origen).
        produccio: 'Què cal fabricar?',
        produccioPlaceholder: 'Selecciona un producte',
        productionServices: [
          { value: 'estructures', label: 'Estructures, baranes i escales' },
          { value: 'portes', label: 'Portes i tancaments, amb instal·lació' },
          { value: 'mobiliari', label: 'Mobiliari' },
          { value: 'carros', label: 'Carros industrials' },
          { value: 'peces', label: 'Peces i conjunts a mida' },
        ],
        sector: 'Sector',
        material: 'Material',
        unitats: 'Unitats previstes',
        termini: 'Termini desitjat',
        descripcio: 'Descripció',
        descripcioPlaceholder: {
          particular: 'Descriu la feina o la incidència amb les teves paraules.',
          empresa: "Descriu la peça, l'aplicació i els requisits que ja coneixes.",
        },
      },
      // Dades opcionals agrupades en un desplegable: ubicació i, a Industrial, dades tècniques.
      extra: { particular: 'Afegir més dades (opcional)', empresa: 'Afegir dades tècniques (opcional)' },
      upload: {
        particular: { label: 'Fotografia, esbós o document', help: 'Opcional.' },
        empresa: { label: 'Plànol o documentació tècnica', help: 'Opcional.' },
        choose: 'Tria un fitxer',
        none: 'Cap fitxer seleccionat',
      },
      submit: 'Enviar consulta',
      pending: 'Formulari en preparació: encara no envia consultes. Mentrestant, truca o escriu-nos per WhatsApp.',
      // S'afegeix a l'avís mentre content/ca/legal-formulari.md no estigui aprovat (Fase 8, tasca 8.4).
      pendingPrivacy: "El text de privacitat i el consentiment s'incorporaran abans d'activar-lo.",
      errors: {
        required: 'Falta informació en aquest camp.',
        email: 'Revisa el format del correu electrònic.',
        phone: 'Revisa el format del telèfon.',
        summary: 'Revisa els camps marcats per continuar.',
        consent: 'Marca aquesta casella per continuar.',
      },
      // Sense backend no hi ha enviament ni confirmació: s'ofereix el contacte directe.
      notSent: "La consulta no s'ha enviat: el formulari encara no està actiu. Escriu-nos per WhatsApp o truca al 630 661 908.",
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

const strings: Partial<Record<Locale, UiStrings>> = { ca };

export function useUi(locale: Locale): UiStrings {
  const dictionary = strings[locale];
  if (!dictionary) throw new Error(`Falten els textos d'interfície validats per a «${locale}».`);
  return dictionary;
}
