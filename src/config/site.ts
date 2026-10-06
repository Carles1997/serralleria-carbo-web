// Dades de contacte confirmades: CONTEXT-serralleria-carbo.md §2.4, content/ca/ui.md,
// content/ca/contacte.md, el traspàs de Fase 4 i, per a la fitxa de Google, el Perfil d'Empresa
// verificat de l'empresa (fases/fase-6/FASE6-dades-google-business-profile.md). No afegir-hi dades
// que no tinguin aquestes fonts.
export const company = {
  legalName: 'Serralleria Carbó S.L.',
  phone: { display: '630 661 908', href: 'tel:+34630661908' },
  landline: { display: '93 890 27 94', href: 'tel:+34938902794' },
  email: 'carbo@serralleriacarbo.com',
  address: ["Carrer d'Eugeni d'Ors, 59", '08720 Vilafranca del Penedès, Barcelona'],
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Carrer%20d'Eugeni%20d'Ors%2059%2C%2008720%20Vilafranca%20del%20Pened%C3%A8s",
  // Mapa interactiu de Google Maps amb la mateixa adreça. Només es carrega si el visitant ho demana
  // (src/scripts/place-map.ts): fins aleshores no es fa cap petició a Google.
  mapEmbedUrl: "https://maps.google.com/maps?q=Carrer%20d'Eugeni%20d'Ors%2059%2C%2008720%20Vilafranca%20del%20Pened%C3%A8s&z=16&hl=ca&output=embed",
  // Mateixa adreça, per camps (dades estructurades). Fundació i plantilla: content/ca/home.md.
  postalAddress: { street: "Carrer d'Eugeni d'Ors, 59", postalCode: '08720', locality: 'Vilafranca del Penedès', region: 'Barcelona', country: 'ES' },
  foundingDate: '1989-12',
  employees: 12,
  // Horari d'atenció: traspàs de Fase 4 (25/09/2026) i director (30/09/2026); coincideix amb el
  // Perfil d'Empresa (comprovat el 02/10/2026). Dissabte i diumenge, tancat.
  openingHours: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], slots: [['08:00', '13:00'], ['15:00', '18:00']] },
  // Fitxa verificada del Perfil d'Empresa de Google (Fase 6, 02/10/2026): enllaç estable per CID i
  // coordenades del punt de la fitxa.
  googleBusinessProfile: {
    mapsUrl: 'https://maps.google.com/?cid=17022313983401974151',
    geo: { latitude: 41.3424819, longitude: 1.6916747 },
  },
} as const;

/** WhatsApp amb el missatge inicial de content/ca/ui.md; el visitant l'edita abans d'enviar-lo. */
export function whatsappUrl(message: string) {
  return `https://wa.me/34630661908?text=${encodeURIComponent(message)}`;
}
