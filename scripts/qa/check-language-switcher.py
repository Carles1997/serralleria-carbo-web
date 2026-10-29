"""Proves de navegador del selector d'idioma (09/10/2026; desplegable amb tres idiomes des del
12/10/2026): cada enllaç reflecteix l'estat actual (filtre del portafoli, paràmetres del formulari,
àncora) quan es fa servir, amb navegació nativa.

Ús (amb un Python que tingui Playwright i una previsualització en marxa):
  python -I scripts/qa/check-language-switcher.py http://localhost:4322
"""
import json
import sys
from playwright.sync_api import sync_playwright

B = sys.argv[1].rstrip('/') if len(sys.argv) > 1 else 'http://localhost:4322'
results = []


def check(name, ok, detail):
    results.append({'cas': name, 'ok': bool(ok), 'detall': detail})


with sync_playwright() as pw:
    b = pw.chromium.launch()
    c = b.new_context(viewport={'width': 1280, 'height': 900})
    p = c.new_page()
    switch = 'a[data-lang-switch][hreflang=es]'
    to_ca = 'a[data-lang-switch][hreflang=ca]'

    def open_menu(page):
        # El selector és un desplegable (<details>): cal obrir-lo per fer servir els enllaços.
        if not page.evaluate('() => document.querySelector("[data-lang-menu]").open'):
            page.click('.header-lang summary')

    # 1. Entrar a Projectes, canviar de filtre i després d'idioma (clic real).
    p.goto(B + '/particulars/projectes/', wait_until='load')
    p.click('.folio-filters button[data-filter="automatismes"]')
    p.wait_for_timeout(300)
    before = p.get_attribute(switch, 'href')
    open_menu(p)
    with p.expect_navigation():
        p.click(switch)
    after = p.evaluate('() => [location.pathname + location.search, document.querySelector(".folio-filters button[aria-pressed=\\"true\\"]")?.dataset.filter]')
    check('1. filtre canviat i després idioma', after == ['/es/particulares/proyectos/?servei=automatismes', 'automatismes'], {'href abans del clic': before, 'destí': after})

    # 2. Entrar amb un filtre, triar «Tots» i canviar d'idioma.
    p.goto(B + '/es/particulares/proyectos/?servei=estructures', wait_until='load')
    p.click('.folio-filters button[data-filter="tots"]')
    p.wait_for_timeout(300)
    open_menu(p)
    with p.expect_navigation():
        p.click(to_ca)
    landed = p.evaluate('() => location.pathname + location.search')
    check('2. amb filtre, «Tots» i idioma', landed == '/particulars/projectes/', {'destí': landed})

    # 3a. Navegar a una àncora de plantilla després de carregar i canviar d'idioma.
    p.goto(B + '/industrial/', wait_until='load')
    p.click('a[href="#contacte"] >> nth=0')
    p.wait_for_timeout(300)
    open_menu(p)
    with p.expect_navigation():
        p.click(switch)
    landed = p.evaluate('() => [location.pathname + location.hash, !!document.getElementById(location.hash.slice(1))]')
    check('3a. àncora de plantilla (#contacte)', landed == ['/es/industrial/#contacte', True], {'destí': landed})

    # 3b. Àncora d'una pàgina legal (derivada del títol): equivalència per apartat.
    p.goto(B + '/legal/avis-legal/', wait_until='load')
    p.click('a[href="#comunicacions"] >> nth=0')
    p.wait_for_timeout(300)
    open_menu(p)
    with p.expect_navigation():
        p.click(switch)
    landed = p.evaluate('() => [location.pathname + decodeURIComponent(location.hash), !!document.getElementById(decodeURIComponent(location.hash.slice(1)))]')
    check('3b. àncora legal (#comunicacions → #comunicaciones)', landed == ['/es/legal/aviso-legal/#comunicaciones', True], {'destí': landed})

    # 3c. Àncora inexistent a la pàgina actual: no es copia cap àncora inventada.
    p.goto(B + '/legal/avis-legal/#no-existeix', wait_until='load')
    href = p.evaluate('() => { const a = document.querySelector("a[data-lang-switch]"); a.dispatchEvent(new Event("focus")); return a.getAttribute("href"); }')
    check('3c. àncora desconeguda a una pàgina legal', href.endswith('/es/legal/aviso-legal/'), {'href': href})

    # 3d. Àncora inexistent en una pàgina de plantilla: tampoc es copia.
    p.goto(B + '/industrial/#no-existeix', wait_until='load')
    href = p.evaluate('() => { const a = document.querySelector("a[data-lang-switch]"); a.dispatchEvent(new Event("focus")); return a.getAttribute("href"); }')
    check('3d. àncora desconeguda a una pàgina de plantilla', href.endswith('/es/industrial/'), {'href': href})

    # 4. Paràmetres funcionals del formulari.
    p.goto(B + '/contacte/?tipus=empresa&servei=peces', wait_until='load')
    open_menu(p)
    with p.expect_navigation():
        p.click(switch)
    landed = p.evaluate('() => [location.pathname + location.search, document.querySelector("input[name=tipus]:checked")?.value]')
    check('4. paràmetres del formulari', landed == ['/es/contacto/?tipus=empresa&servei=peces', 'empresa'], {'destí': landed})

    # 5. Obrir en una altra pestanya (Ctrl+clic) després de canviar el filtre.
    p.goto(B + '/es/particulares/proyectos/', wait_until='load')
    p.click('.folio-filters button[data-filter="estructures"]')
    p.wait_for_timeout(300)
    open_menu(p)
    with c.expect_page() as new_page:
        p.click(to_ca, modifiers=['Control'])
    tab = new_page.value
    tab.wait_for_load_state('load')
    check('5. Ctrl+clic: nova pestanya amb l\'estat actual', tab.url.endswith('/particulars/projectes/?servei=estructures'), {'pestanya': tab.url, 'original': p.url})
    tab.close()

    # 6. Menú contextual: l'href ja és l'actual quan s'obre el menú.
    p.goto(B + '/particulars/projectes/', wait_until='load')
    p.click('.folio-filters button[data-filter="estructures"]')
    p.wait_for_timeout(300)
    open_menu(p)
    p.click(switch, button='right')
    href = p.get_attribute(switch, 'href')
    check('6. menú contextual', href.endswith('/es/particulares/proyectos/?servei=estructures'), {'href': href})

    # 8. Àncora mal codificada (#100%) a amplada mòbil: cap error JavaScript, el menú funciona i el
    #    selector porta a la pàgina equivalent sense l'àncora (09/10/2026).
    m = b.new_context(viewport={'width': 390, 'height': 844}, is_mobile=True, has_touch=True)
    mp = m.new_page()
    # Errors per fase: els de la pàgina d'entrada (script de la capçalera amb #100%) fan fallar la prova.
    # Avís intermitent durant la navegació («Transition was aborted…»), sense impacte funcional
    # observat i d'origen pendent de confirmar (fases/fase-6/FASE6-bloc5-castella.md, 7.3): es
    # registra com a avís. Qualsevol altre error durant la navegació fa fallar la prova.
    phase = ['entrada']
    errors = []
    mp.on('pageerror', lambda error: errors.append((phase[0], str(error))))
    mp.goto(B + '/industrial/#100%', wait_until='load')
    mp.wait_for_timeout(300)
    toggle = mp.locator('.menu-toggle')
    toggle.click()
    opened = [toggle.get_attribute('aria-expanded'), mp.evaluate('() => document.getElementById("mobile-nav").classList.contains("is-open")')]
    toggle.click()
    closed = [toggle.get_attribute('aria-expanded'), mp.evaluate('() => document.getElementById("mobile-nav").classList.contains("is-open")')]
    href = mp.evaluate('() => { const a = document.querySelector("a[data-lang-switch]"); a.dispatchEvent(new Event("focus")); return a.getAttribute("href"); }')
    phase[0] = 'navegació'
    mp.locator('.header-lang summary').tap()
    with mp.expect_navigation():
        mp.locator(switch).tap()
    landed = mp.evaluate('() => location.pathname + location.hash')
    entry_errors = [message for stage, message in errors if stage == 'entrada']
    transition = [message for stage, message in errors if stage == 'navegació' and message.startswith('Transition was aborted')]
    other = [message for stage, message in errors if stage == 'navegació' and not message.startswith('Transition was aborted')]
    check('8. #100% en mòbil: sense errors, menú i selector',
          not entry_errors and not other and opened == ['true', True] and closed == ['false', False] and href.endswith('/es/industrial/') and landed == '/es/industrial/',
          {'errors entrada': entry_errors, 'errors navegació': other, 'avís transició navegador': transition, 'menú obert': opened, 'menú tancat': closed, 'href': href, 'destí': landed})
    m.close()

    # 9. Àncora vàlida amb accents (codificada a la URL): es manté l'equivalència.
    p.goto(B + '/legal/avis-legal/#llei-aplicable-i-jurisdicci%C3%B3', wait_until='load')
    open_menu(p)
    with p.expect_navigation():
        p.click(switch)
    landed = p.evaluate('() => [location.pathname + decodeURIComponent(location.hash), !!document.getElementById(decodeURIComponent(location.hash.slice(1)))]')
    check('9. àncora amb accents', landed == ['/es/legal/aviso-legal/#ley-aplicable-y-jurisdicción', True], {'destí': landed})

    # 10. Desplegable (12/10/2026; codis des del 13/10/2026): CA, ES i EN en ordre fix, amb el nom sencer per
    # als lectors de pantalla i l'actual marcat; Escape el tanca i torna el focus.
    p.goto(B + '/particulars/reparacions/', wait_until='load')
    p.click('.header-lang summary')
    menu = p.evaluate('() => { const d = document.querySelector("[data-lang-menu]"); return [d.open, [...d.querySelectorAll("li")].map((li) => [li.querySelector("[aria-hidden]").textContent, li.querySelector(".sr-only").textContent, li.querySelector("[aria-current]") ? "actual" : ""].join("|")), d.querySelector("summary").textContent.replace(/\\s+/g, " ").trim()]; }')
    p.keyboard.press('Escape')
    closed = p.evaluate('() => [document.querySelector("[data-lang-menu]").open, document.activeElement.tagName]')
    check('10. desplegable: tres idiomes, actual marcat, Escape tanca', menu[0] and menu[1] == ['CA|Català|actual', 'ES|Castellano|', 'EN|English|'] and menu[2] == 'CA, Idioma: Català' and closed == [False, 'SUMMARY'], {'menú': menu, 'després d\'Escape': closed})

    # 11. Anglès: de Reparacions a Repairs, amb els paràmetres del formulari conservats a Contact.
    p.goto(B + '/contacte/?tipus=empresa&servei=manteniment', wait_until='load')
    open_menu(p)
    with p.expect_navigation():
        p.click('a[data-lang-switch][hreflang=en]')
    landed = p.evaluate('() => [location.pathname + location.search, document.documentElement.lang, document.querySelector("input[name=tipus]:checked")?.value, document.getElementById("servei-empresa").value]')
    check('11. català → anglès amb el manteniment preseleccionat', landed == ['/en/contact/?tipus=empresa&servei=manteniment', 'en', 'empresa', 'manteniment'], {'destí': landed})

    # 12. Clic a fora tanca el desplegable.
    p.goto(B + '/en/residential/repairs/', wait_until='load')
    p.click('.header-lang summary')
    p.mouse.click(20, 400)
    check('12. clic a fora tanca el desplegable', p.evaluate('() => !document.querySelector("[data-lang-menu]").open'), {})

    # 7. Sense JavaScript: href vàlid cap a la pàgina equivalent.
    c2 = b.new_context(java_script_enabled=False)
    p2 = c2.new_page()
    p2.goto(B + '/particulars/projectes/?servei=automatismes', wait_until='load')
    check('7. sense JavaScript', p2.get_attribute(switch, 'href') == '/es/particulares/proyectos/', {'href': p2.get_attribute(switch, 'href')})
    c2.close()
    b.close()

for item in results:
    line = f"{'ok   ' if item['ok'] else 'FALLA'} {item['cas']}  {json.dumps(item['detall'], ensure_ascii=False)}"
    sys.stdout.buffer.write((line + chr(10)).encode('utf-8'))
sys.exit(0 if all(item['ok'] for item in results) else 1)
