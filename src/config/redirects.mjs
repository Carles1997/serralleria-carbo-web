// Mapa de redireccions de la web antiga, independent de l'allotjament (decisió del director,
// 28/09/2026: l'allotjament encara no està triat). Són dades: quan es triï el proveïdor, un
// generador en traduirà les regles llestes al seu format. Fonts: full «Redireccions» de
// fases/fase-3/Mapa-redireccions-serralleriacarbo.xlsx (inventari de la web antiga) i SEO-F3.md
// («Punts concrets del mapa de redireccions antic»), que és posterior i preval quan es contradiuen.
// Explicació i discrepàncies: fases/fase-5/FASE5-redireccions.md. Validació: npm run check:redirects.
//
// Els destins s'indiquen per pàgina de contingut (pageId + idioma), no per URL: la ruta surt del
// frontmatter de content/{idioma}/, així el mapa no fixa slugs de traducció encara per validar.
// - requires: comprovacions humanes pendents abans d'activar la regla.
// - decision: tria pendent del director; la regla no s'activa fins que es resolgui.
// - launchChecks: comprovacions que s'han de fer abans del llançament però que no impedeixen
//   activar la regla (es llisten a npm run check:redirects).
//
// Decisions del director del 08/10/2026 (fases/fase-6/FASE6-bloc4-redireccions.md): el web es publica
// en català i castellà des del primer dia (l'anglès queda ajornat). R1–R6 tancades.

/**
 * @typedef {{ pageId: string, lang: 'ca' | 'es' | 'en' }} Target
 * @typedef {{ from: string, status: 301, to: Target, note: string, requires?: string[], decision?: string, launchChecks?: string[] }} MovedRule
 * @typedef {{ from: string, status: 410, note: string, requires?: string[], decision?: string, launchChecks?: string[] }} GoneRule
 * @typedef {MovedRule | GoneRule} RedirectRule
 */

const CAMPAIGNS = "Comprovar amb el client si hi ha campanyes de Google Ads o Meta actives que hi apuntin i actualitzar-ne la URL de destinació abans del tall.";

/** @type {RedirectRule[]} */
export const redirects = [
  // Contingut real amb equivalent nou (301 URL a URL).
  {
    from: '/projectes/',
    status: 301,
    to: { pageId: 'particulars-projectes', lang: 'ca' },
    note: 'Portafoli antic. Els cinc casos de Particulars; el cas Gàbia queda a Industrial.',
  },
  {
    from: '/pressupost/',
    status: 301,
    to: { pageId: 'contacte', lang: 'ca' },
    note: 'El pressupost es fusiona amb el formulari unificat de contacte (Fase 1).',
  },
  {
    from: '/estructuras/',
    status: 301,
    to: { pageId: 'particulars-estructures', lang: 'es' },
    note: "Landing antiga en castellà (probable campanya d'Ads). Destí: versió ES d'Estructures (SEO-F3; R6, 08/10/2026).",
    launchChecks: [CAMPAIGNS],
  },
  {
    from: '/motores/',
    status: 301,
    to: { pageId: 'particulars-automatismes', lang: 'es' },
    note: "Landing antiga en castellà (probable campanya d'Ads). Destí: versió ES d'Automatismes (SEO-F3; R6, 08/10/2026).",
    launchChecks: [CAMPAIGNS],
  },
  {
    from: '/cat/estructuras/',
    status: 301,
    to: { pageId: 'particulars-estructures', lang: 'ca' },
    note: 'Variant catalana de TranslatePress de /estructuras/ (SEO-F3: cap a la versió CA equivalent).',
  },
  {
    from: '/cat/motores/',
    status: 301,
    to: { pageId: 'particulars-automatismes', lang: 'ca' },
    note: 'Variant catalana de TranslatePress de /motores/ (SEO-F3: cap a la versió CA equivalent).',
  },
  {
    from: '/legal/',
    status: 301,
    to: { pageId: 'legal-cookies', lang: 'ca' },
    note: "La pàgina antiga només conté la política de cookies. /legal/ no existeix al sitemap nou (SEO-F3). La política de cookies de l'advocat queda aprovada el 06/10/2026.",
  },
  // Pàgina d'empresa retirada pel director (06/10/2026): el seu contingut ja és a la Home i a Industrial.
  {
    from: '/empresa/',
    status: 301,
    to: { pageId: 'home', lang: 'ca' },
    note: "Pàgina retirada pel director (06/10/2026): xifres, taller i zones de treball són a la Home.",
  },
  // Adreces citades als textos legals de l'advocat del client (06/10/2026), que el lloc nou publica a /legal/.
  {
    from: '/politica-de-privacitat/',
    status: 301,
    to: { pageId: 'legal-privacitat', lang: 'ca' },
    note: "Adreça de la política de privacitat que citen els textos de l'advocat.",
  },
  {
    from: '/politica-de-cookies/',
    status: 301,
    to: { pageId: 'legal-cookies', lang: 'ca' },
    note: "Adreça de la política de cookies que citen els textos de l'advocat.",
  },

  // R1 (08/10/2026): no és una plantilla buida, sinó la pàgina de manteniment «Disculpeu les molèsties»
  // amb les dades de contacte, que surt com a enllaç de lloc a la cerca de marca.
  {
    from: '/sample-page/',
    status: 301,
    to: { pageId: 'contacte', lang: 'ca' },
    note: 'Pàgina de manteniment amb dades de contacte (línia base del 08/10/2026).',
  },
  // R4 (08/10/2026): prefix català de TranslatePress; el català del web nou no porta prefix.
  { from: '/cat/', status: 301, to: { pageId: 'home', lang: 'ca' }, note: 'Portada catalana (WordPress ja hi feia un 301 a /).' },

  // Plantilles de WordPress i Elementor sense contingut real (R2, 08/10/2026: 410 confirmat).
  { from: '/hello-world/', status: 410, note: "Entrada d'exemple de WordPress (2016)." },
  { from: '/category/uncategorized/', status: 410, note: 'Categoria per defecte, només amb l\'entrada d\'exemple.' },
  // R3 (08/10/2026): feeds de WordPress; el web nou no en té.
  { from: '/feed/', status: 410, note: "Feed RSS amb l'entrada d'exemple." },
  { from: '/comments/feed/', status: 410, note: 'Feed de comentaris buit.' },
  { from: '/author/iraibal_gy8unz9r/', status: 410, note: "Pàgina d'autor de WordPress." },
  { from: '/elementor-hf/header/', status: 410, note: "Plantilla de capçalera d'Elementor." },
  { from: '/elementor-hf/footer-landing/', status: 410, note: "Plantilla de peu d'Elementor." },
  { from: '/elementor-hf/594/', status: 410, note: "Plantilla d'Elementor sense slug descriptiu." },
  { from: '/elementor-hf/147/', status: 410, note: "Plantilla d'Elementor sense slug descriptiu." },
];

/**
 * URL antigues que es mantenen: no porten regla. /es/ (R5, 08/10/2026) passa a ser la portada real en
 * castellà, amb resposta 200; a WordPress era un prefix de TranslatePress que redirigia a /.
 */
export const unchanged = ['/', '/contacte/', '/es/'];

/**
 * URL antigues detectades a la línia base del 08/10/2026 sense tractament decidit. Les quatre
 * d'aquell dia (/feed/, /comments/feed/, /cat/ i /es/) es van decidir el mateix 08/10/2026 (R3–R5).
 * @type {{ from: string, note: string }[]}
 */
export const undecided = [];
