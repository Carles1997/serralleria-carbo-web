"""Mesura de laboratori a Netlify amb el Chromium de la skill (mateix perfil mòbil que la Fase 7)."""
import json
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = "https://serralleriacarbo.netlify.app"
ROUTES = ["/", "/particulars/", "/particulars/estructures/", "/particulars/automatismes/",
          "/particulars/urgencies/", "/particulars/projectes/", "/industrial/",
          "/industrial/capacitats/", "/empresa/", "/contacte/"]
OBSERVE = """
window.__lcp = 0; window.__cls = 0;
new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lcp = e.startTime; })
  .observe({type: 'largest-contentful-paint', buffered: true});
new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; })
  .observe({type: 'layout-shift', buffered: true});
"""
PROFILES = {
    "mobil": dict(viewport={"width": 390, "height": 844}, device_scale_factor=2, is_mobile=True, has_touch=True,
                  throttle=dict(latency=150, downloadThroughput=1.6e6 / 8, uploadThroughput=750e3 / 8), cpu=4),
    "escriptori": dict(viewport={"width": 1440, "height": 900}, device_scale_factor=1, is_mobile=False, has_touch=False,
                       throttle=None, cpu=1),
}

results = {}
with sync_playwright() as p:
    browser = p.chromium.launch()
    for name, prof in PROFILES.items():
        for route in ROUTES:
            ctx = browser.new_context(viewport=prof["viewport"], device_scale_factor=prof["device_scale_factor"],
                                      is_mobile=prof["is_mobile"], has_touch=prof["has_touch"])
            page = ctx.new_page()
            cdp = ctx.new_cdp_session(page)
            cdp.send("Network.enable")
            cdp.send("Network.setCacheDisabled", {"cacheDisabled": True})
            if prof["throttle"]:
                cdp.send("Network.emulateNetworkConditions", {"offline": False, **prof["throttle"]})
            cdp.send("Emulation.setCPUThrottlingRate", {"rate": prof["cpu"]})
            sizes = []
            page.on("response", lambda r: sizes.append(r))
            page.add_init_script(OBSERVE)
            page.goto(BASE + route, wait_until="load", timeout=90000)
            page.wait_for_timeout(1500)
            lcp, cls = page.evaluate("[window.__lcp, window.__cls]")
            nav = page.evaluate("JSON.stringify(performance.getEntriesByType('navigation')[0])")
            res = page.evaluate("performance.getEntriesByType('resource').map(r => [r.name, r.transferSize, r.initiatorType])")
            navd = json.loads(nav)
            total = navd.get("transferSize", 0) + sum(r[1] for r in res)
            enc = {}
            for r in sizes:
                if r.url.startswith(BASE) and r.request.resource_type in ("document", "stylesheet", "script"):
                    enc[r.request.resource_type] = r.headers.get("content-encoding")
            results.setdefault(name, {})[route] = {
                "lcp_s": round(lcp / 1000, 2), "cls": round(cls, 3), "ttfb_ms": round(navd.get("responseStart", 0)),
                "transfer_kb": round(total / 1024), "requests": len(res) + 1, "encoding": enc,
            }
            ctx.close()
    browser.close()

Path(__file__).with_name("perf.json").write_text(json.dumps(results, indent=1), encoding="utf-8")
for name, rows in results.items():
    print(name)
    for route, r in rows.items():
        print(f"  {route:30} LCP {r['lcp_s']:>5}s  CLS {r['cls']:<6} TTFB {r['ttfb_ms']:>5}ms  {r['transfer_kb']:>4} KB  {r['requests']:>3} req  {r['encoding']}")
