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

/**
 * @typedef {{ pageId: string, lang: 'ca' | 'es' | 'en' }} Target
 * @typedef {{ from: string, status: 301, to: Target, note: string, requires?: string[], decision?: string }} MovedRule
 * @typedef {{ from: string, status: 410, note: string, requires?: string[], decision?: string }} GoneRule
 * @typedef {MovedRule | GoneRule} RedirectRule
 */

const CAMPAIGNS = "Comprovar amb el client si hi ha campanyes de Google Ads o Meta actives que hi apuntin i actualitzar-ne la URL de destinació abans del tall.";
const TEMPLATE_DECISION =
  "El full de càlcul proposa 301 a la Home; SEO-F3 (posterior) demana no enviar les URL de plantilla automàticament a la Home. Proposta: 410. Confirmar.";

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
    note: "Landing antiga en castellà (probable campanya d'Ads). Destí: versió ES d'Estructures (SEO-F3).",
    requires: [CAMPAIGNS],
  },
  {
    from: '/motores/',
    status: 301,
    to: { pageId: 'particulars-automatismes', lang: 'es' },
    note: "Landing antiga en castellà (probable campanya d'Ads). Destí: versió ES d'Automatismes (SEO-F3).",
    requires: [CAMPAIGNS],
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
    note: "La pàgina antiga només conté la política de cookies. /legal/ no existeix al sitemap nou (SEO-F3).",
    requires: ['La política de cookies ha de quedar aprovada després de la revisió jurídica (FASE5-redireccions.md: «En espera»).'],
  },

  // Plantilles de WordPress i Elementor sense contingut real.
  { from: '/sample-page/', status: 410, note: "Pàgina d'exemple de WordPress.", decision: TEMPLATE_DECISION },
  { from: '/hello-world/', status: 410, note: "Entrada d'exemple de WordPress (2016).", decision: TEMPLATE_DECISION },
  {
    from: '/category/uncategorized/',
    status: 410,
    note: 'Categoria per defecte, sense articles. El full ja admetia 410.',
    decision: TEMPLATE_DECISION,
  },
  { from: '/author/iraibal_gy8unz9r/', status: 410, note: "Pàgina d'autor de WordPress." },
  { from: '/elementor-hf/header/', status: 410, note: "Plantilla de capçalera d'Elementor." },
  { from: '/elementor-hf/footer-landing/', status: 410, note: "Plantilla de peu d'Elementor." },
  { from: '/elementor-hf/594/', status: 410, note: "Plantilla d'Elementor sense slug descriptiu." },
  { from: '/elementor-hf/147/', status: 410, note: "Plantilla d'Elementor sense slug descriptiu." },
];

/** URL antigues que es mantenen iguals: no porten regla. */
export const unchanged = ['/', '/contacte/'];
