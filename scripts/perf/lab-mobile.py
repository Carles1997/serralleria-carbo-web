"""Mesura de laboratori reproduïble del rendiment mòbil (Fase 6, bloc 2, 08/10/2026).

Eina: Chromium de Playwright (Python), sense Lighthouse. És una mesura sintètica de laboratori, no són
dades reals d'usuaris (CrUX o Search Console).

Perfil (el de fases/fase-7/FASE7-qa.md):
- viewport 390 × 844, densitat 2×, mòbil i tàctil (Chromium amb emulació mòbil de Playwright);
- CPU 4 vegades més lenta (Emulation.setCPUThrottlingRate);
- xarxa 1,6 Mbps de baixada, 750 kbps de pujada i 150 ms de latència (Network.emulateNetworkConditions);
- memòria cau desactivada i context nou a cada execució (primera visita);
- moviment sense preferència de reducció, tret que la variant ho indiqui.

Variants: injecten CSS al document des del primer moment per comparar temporalment un efecte sense
tocar el codi del projecte. «base» injecta un estil buit perquè totes les execucions siguin iguals.

Ús (des de l'arrel del projecte, amb un Python que tingui Playwright):
  python -I scripts/perf/lab-mobile.py <adreça> <ruta> [--variant base] [--runs 7] [--trace fitxer.json] [--desktop]
Escriu una línia JSON per execució i un resum amb la mediana i el rang.
"""
import argparse
import json
import statistics
import sys

from playwright.sync_api import sync_playwright

VARIANTS = {
    'base': '',
    # Sense l'entrada del titular de la Home (title-rise amb clip-path).
    'sense-titol': '.hero-line{animation:none!important}',
    # Sense l'ocultació inicial de les peces [data-reveal] (opacitat 0 fins que el JS les revela).
    'sense-ocultacio': 'html.motion-ready [data-reveal]:not(.is-revealed),html.motion-ready [data-reveal="group"]:not(.is-revealed)>*{opacity:1!important}',
    # Cap animació CSS ni ocultació (referència extrema, no és una proposta).
    'sense-animacions': '*,*::before,*::after{animation:none!important;transition:none!important}html.motion-ready [data-reveal]:not(.is-revealed),html.motion-ready [data-reveal="group"]:not(.is-revealed)>*{opacity:1!important}',
}
# Variants que actuen sobre el DOM abans que s'executin els scripts del document.
DOM_VARIANTS = {
    # Industrial sense el mètode de sèries animat (series.ts no troba [data-series] i no s'executa).
    'sense-series': '[data-series]',
}
# La variant «moviment-reduit» no injecta CSS: emula prefers-reduced-motion: reduce.

OBSERVERS = """
(() => {
  window.__lab = {lcp: [], cls: 0, longtasks: []};
  const describe = (el) => el ? `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).slice(0, 2).join('.') : ''}` : null;
  new PerformanceObserver((list) => { for (const e of list.getEntries()) window.__lab.lcp.push({
    t: e.startTime, render: e.renderTime, load: e.loadTime, size: e.size, url: e.url || null,
    element: describe(e.element), text: e.element && !e.url ? (e.element.textContent || '').trim().slice(0, 40) : null }); })
    .observe({type: 'largest-contentful-paint', buffered: true});
  new PerformanceObserver((list) => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.__lab.cls += e.value; })
    .observe({type: 'layout-shift', buffered: true});
  new PerformanceObserver((list) => { for (const e of list.getEntries()) window.__lab.longtasks.push({start: e.startTime, duration: e.duration}); })
    .observe({type: 'longtask', buffered: true});
  const css = %s;
  if (css) {
    const style = document.createElement('style');
    style.textContent = css;
    new MutationObserver((records, observer) => { if (document.head) { document.head.append(style); observer.disconnect(); } })
      .observe(document, {childList: true, subtree: true});
  }
  const strip = %s;
  if (strip) {
    new MutationObserver(() => document.querySelectorAll(strip).forEach((el) => el.removeAttribute(strip.slice(1, -1))))
      .observe(document, {childList: true, subtree: true});
  }
})();
"""

COLLECT = """() => {
  const nav = performance.getEntriesByType('navigation')[0];
  const resources = performance.getEntriesByType('resource');
  const paint = Object.fromEntries(performance.getEntriesByType('paint').map((p) => [p.name, p.startTime]));
  const lcp = window.__lab.lcp.at(-1) || {};
  const res = lcp.url ? resources.find((r) => r.name === lcp.url) : null;
  const pick = (re) => resources.filter((r) => re.test(r.name)).map((r) => ({name: r.name.split('/').pop(), start: r.startTime, end: r.responseEnd}));
  return {
    ttfb: nav.responseStart, domContentLoaded: nav.domContentLoadedEventEnd, load: nav.loadEventEnd,
    fcp: paint['first-contentful-paint'] ?? null, lcp: lcp.t ?? null, lcpElement: lcp.element ?? null,
    lcpText: lcp.text ?? null, lcpUrl: lcp.url ? lcp.url.split('/').pop() : null,
    lcpResourceStart: res ? res.startTime : null, lcpResourceEnd: res ? res.responseEnd : null,
    candidates: window.__lab.lcp.map((c) => ({t: Math.round(c.t), element: c.element, url: c.url ? c.url.split('/').pop() : null})),
    cls: window.__lab.cls,
    longtaskTotal: window.__lab.longtasks.reduce((s, t) => s + t.duration, 0),
    longtasks: window.__lab.longtasks.map((t) => [Math.round(t.start), Math.round(t.duration)]),
    fonts: pick(/\\.woff2/), css: pick(/\\.css/), bytes: resources.reduce((s, r) => s + (r.transferSize || 0), nav.transferSize || 0),
  };
}"""


def one_run(browser, url, variant, desktop, trace_path=None):
    if desktop:
        context = browser.new_context(viewport={'width': 1440, 'height': 900}, device_scale_factor=1,
                                      reduced_motion='reduce' if variant == 'moviment-reduit' else 'no-preference')
    else:
        context = browser.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True, has_touch=True,
                                      reduced_motion='reduce' if variant == 'moviment-reduit' else 'no-preference')
    page = context.new_page()
    cdp = context.new_cdp_session(page)
    cdp.send('Network.enable')
    cdp.send('Network.setCacheDisabled', {'cacheDisabled': True})
    if not desktop:
        cdp.send('Network.emulateNetworkConditions', {'offline': False, 'latency': 150,
                                                      'downloadThroughput': 1.6e6 / 8, 'uploadThroughput': 750e3 / 8})
        cdp.send('Emulation.setCPUThrottlingRate', {'rate': 4})
    page.add_init_script(OBSERVERS % (json.dumps(VARIANTS.get(variant, '')), json.dumps(DOM_VARIANTS.get(variant, ''))))
    if trace_path:
        browser.start_tracing(page=page, path=trace_path, screenshots=False,
                              categories=['devtools.timeline', 'disabled-by-default-devtools.timeline', 'loading', 'blink.user_timing', 'v8.execute'])
    page.goto(url, wait_until='load', timeout=120000)
    page.wait_for_timeout(5000)
    if trace_path:
        browser.stop_tracing()
    data = page.evaluate(COLLECT)
    context.close()
    return data


def summary(values):
    values = [v for v in values if v is not None]
    if not values:
        return None
    q = statistics.quantiles(values, n=4) if len(values) >= 4 else [min(values), statistics.median(values), max(values)]
    return {'median': round(statistics.median(values)), 'min': round(min(values)), 'max': round(max(values)),
            'iqr': round(q[2] - q[0]), 'n': len(values)}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('base')
    parser.add_argument('route')
    parser.add_argument('--variant', default='base', choices=[*VARIANTS, *DOM_VARIANTS, 'moviment-reduit'])
    parser.add_argument('--runs', type=int, default=7)
    parser.add_argument('--trace')
    parser.add_argument('--desktop', action='store_true')
    parser.add_argument('--css', help='CSS de prova addicional (substitueix la variant)')
    args = parser.parse_args()
    if args.css:
        VARIANTS['css'] = args.css
        args.variant = 'css'
    url = args.base.rstrip('/') + args.route
    runs = []
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        for i in range(args.runs):
            data = one_run(browser, url, args.variant, args.desktop, args.trace if (args.trace and i == 0) else None)
            runs.append(data)
            print(json.dumps({'run': i + 1, **data}), flush=True)
        browser.close()
    keys = ['ttfb', 'fcp', 'lcp', 'lcpResourceEnd', 'longtaskTotal', 'cls', 'bytes']
    result = {k: summary([r[k] for r in runs]) for k in keys}
    result['cls'] = {'median': round(statistics.median(r['cls'] for r in runs), 3), 'max': round(max(r['cls'] for r in runs), 3)}
    result['lcpElements'] = sorted({f"{r['lcpElement']} {r['lcpUrl'] or r['lcpText'] or ''}".strip() for r in runs})
    print(json.dumps({'summary': {'url': url, 'variant': args.variant, 'profile': 'escriptori' if args.desktop else 'mobil', **result}}, ensure_ascii=False), flush=True)


if __name__ == '__main__':
    sys.exit(main())
