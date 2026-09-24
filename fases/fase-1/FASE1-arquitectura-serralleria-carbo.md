# FASE 1 — ARQUITECTURA
## Serralleria Carbó — redisseny web (SC-2026-01)

> Fase 1 validada i tancada. Aquest document conserva el sitemap i els user journeys aprovats. La distribució confirmada dels projectes és de cinc casos a Particulars i “Gàbia” a Industrial.

> **Actualització factual de Fase 3 (23/09/2026):** el client confirma un taller de 950 m², en lloc dels 900 m² indicats inicialment. L'arquitectura i els user journeys continuen intactes.

---

## 1. Sitemap definitiu

Basat en l'arbre proposat al document de context i afinat amb les dades reals trobades a l'auditoria de la Fase 0 (les 4 categories de servei del formulari de pressupost, els 6 projectes recuperats, i la manca de contingut industrial existent).

```
/                                    Home (fork + contingut SEO propi)
/empresa/                            Qui som, taller, equip, trajectòria

/particulars/
    /particulars/urgencies/              (Urgències — reparacions, incidències)
    /particulars/estructures/            (Estructures — baranes, escales, passarel·les)
    /particulars/automatismes/           (Automatismes — motors, portes)
    /particulars/mobiliari/              (Mobiliari — a mida, ferro/inox)
    /particulars/projectes/              (Portafoli: 5 casos reals ja recuperats)

/industrial/
    /industrial/capacitats/              (Taller 950 m², maquinària, materials, soldadura)
    /industrial/sectors/                 (Alimentació, sanitari, packaging, cellers, seguretat/defensa)
    /industrial/series-curtes/           (Proposta de valor: sèries curtes)
    /industrial/proces/                  (Definim → Preparem → Fabriquem → Comprovem)
    /industrial/projectes/               (Primer cas real: "Gàbia" — 10 gàbies industrials, confirmat pel client)

/contacte/                            Formulari unificat (particular/empresa) + dades + mapa
/legal/
    /legal/avis-legal/                    (pendent client)
    /legal/privacitat/                    (pendent client)
    /legal/cookies/                       (ja existeix, es pot adaptar del text actual)

404 personalitzada (respecta l'idioma actual, a diferència de l'actual)
```

**Canvis respecte al document de context original:**
- S'afegeix `/particulars/mobiliari/` (categoria confirmada pel desplegable del formulari de pressupost i pel projecte "Gàbia").
- `/particulars/urgencies/` incorporada com a categoria pròpia (era implícita a la home antiga, ara es fa explícita).
- El pressupost antic (`/pressupost/`) es fusiona dins `/contacte/` amb el formulari unificat.
- Els tres textos legals se separen en pàgines pròpies enlloc d'una de sola.

---

## 2. Jerarquia de navegació per branca

**Capçalera general (visible sempre):** logotip → home · selector d'idioma · enllaç discret a l'altra branca

**Particulars:**
```
Inici (particulars) | Urgències | Estructures | Automatismes | Mobiliari | Projectes | Contacte
```

**Carbó Industrial:**
```
Inici (industrial) | Capacitats | Sectors | Sèries curtes | Procés | Projectes* | Contacte
```
*Projectes hi apareix igualment des del principi (encara que buit o amb 0-1 cas), per mantenir la mateixa estructura de navegació que particulars i no haver de canviar-la quan arribin els primers casos.

**Peu comú (totes les pàgines):**
```
Contacte · Avís legal · Privacitat · Cookies · © Serralleria Carbó S.L.
```

---

## 3. User journeys

### 3.1 Particular amb urgència
*"Se m'ha espatllat el motor de la porta del garatge i necessito algú avui."*

1. Arriba a la home (cerca genèrica "serralleria Vilafranca" o clica un anunci).
2. Veu el fork: tria "Particulars".
3. A `/particulars/` veu clarament l'enllaç a "Urgències" al capdamunt (prioritat visual sobre la resta).
4. Entra a `/particulars/urgencies/`: text curt, telèfon molt visible (clic-a-trucar en mòbil), formulari mínim.
5. **Conversió: trucada directa o formulari curt.** No necessita veure projectes ni capacitats — necessita un telèfon.

*Implicació de disseny: el número de telèfon ha d'aparèixer a la capçalera de totes les pàgines de particulars, no només a contacte.*

### 3.2 Particular amb projecte (no urgent)
*"Vull posar unes baranes noves a l'escala de casa, encara no tinc pressa."*

1. Arriba per cerca ("baranes ferro Vilafranca") o recomanació.
2. Home → fork → Particulars.
3. Navega a `/particulars/estructures/`: vol veure exemples abans de decidir-se.
4. Clica a `/particulars/projectes/` i veu casos similars (les baranes reals que ja tenim recuperades).
5. Torna a `/particulars/estructures/` convençut, o va directe a `/contacte/`.
6. Omple el formulari (branca "Particular"), adjunta una foto de l'espai.
7. **Conversió: formulari amb adjunt.** Espera resposta, no necessita immediatesa.

*Implicació de disseny: cal enllaçar `/particulars/projectes/` des de cada pàgina de servei, filtrat per categoria si és possible.*

### 3.3 Industrial (enginyeria / integrador / fabricant)
*"Necessitem subcontractar la fabricació d'unes peces d'inox en sèrie curta."*

1. Arriba per cerca tècnica ("fabricació sèries curtes inox 316", "subcontractació soldadura Catalunya") o per recomanació d'un contacte del sector.
2. Home → fork → Carbó Industrial (o directament a `/industrial/` si arriba per cerca ja indexada).
3. Llegeix `/industrial/capacitats/` primer: necessita saber si el taller pot amb el gruix, el material i el volum abans de perdre temps.
4. Consulta `/industrial/sectors/` per veure si el seu sector hi és representat.
5. Revisa `/industrial/proces/` per entendre com funcionaria la relació (terminis, comunicació).
6. Va a `/contacte/`, branca "Empresa": omple sector, material, tipus de peça, unitats, termini, i **adjunta un plànol**.
7. **Conversió: formulari tècnic amb adjunt obligatori de facto.** Espera resposta d'un tècnic (Jordi Mas), no d'un comercial genèric.

*Implicació de disseny: el formulari industrial ha de sortir preseleccionat en "Empresa" si l'origen és `/industrial/`, i el camp d'adjunt ha de ser prominent, no opcional amagat.*

---

## 4. Notes de validació de la Fase 1

- ~~Confirmar si el projecte "Gàbia" s'exposa a `/industrial/projectes/`~~ → **Confirmat (22/09/2026): sí.**
- L'àmbit geogràfic d'actuació es va confirmar el 23/09/2026 i s'ha incorporat als continguts de la Fase 3; no altera el sitemap validat.
- **Mobiliari es manté** com a categoria pròpia de Particulars al sitemap validat.

---

*Lliurable congelat — Fase 1, projecte SC-2026-01. Estat actualitzat el 23/09/2026 sense canviar l'arquitectura aprovada.*
