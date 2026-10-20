"""Comparació alternada de rendiment entre dos desplegaments (Fase 9, preparació del llançament).

Fa servir el perfil i les mètriques de lab-mobile.py (una execució per crida) i alterna l'ordre a cada
parell (A-B, B-A…) perquè la variació de la màquina afecti les dues versions per igual. Mesura de
laboratori: indica la direcció i la mida aproximada dels canvis, no el temps d'un usuari real.

  python -I scripts/perf/lab-ab.py <adreça A> <adreça B> <ruta> [--pairs 9] [--desktop] > resultats.jsonl
Escriu una línia JSON per execució ({versio, parell, …mètriques}) i, al final, el resum per versió.
"""
import argparse
import json
import pathlib
import statistics
import subprocess
import sys

HERE = pathlib.Path(__file__).resolve().parent
parser = argparse.ArgumentParser()
parser.add_argument('a')
parser.add_argument('b')
parser.add_argument('route')
parser.add_argument('--pairs', type=int, default=9)
parser.add_argument('--desktop', action='store_true')
args = parser.parse_args()
sys.stdout.reconfigure(encoding='utf-8')

runs = {'A': [], 'B': []}
for pair in range(1, args.pairs + 1):
    order = [('A', args.a), ('B', args.b)] if pair % 2 else [('B', args.b), ('A', args.a)]
    for label, base in order:
        cmd = [sys.executable, '-X', 'utf8', '-I', str(HERE / 'lab-mobile.py'), base, args.route, '--runs', '1'] + (['--desktop'] if args.desktop else [])
        done = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8')
        line = next((json.loads(l) for l in done.stdout.splitlines() if l.startswith('{"run"')), None)
        if not line:
            print(json.dumps({'versio': label, 'parell': pair, 'error': done.stderr.strip()[-200:]}, ensure_ascii=False), flush=True)
            continue
        runs[label].append(line)
        print(json.dumps({'versio': label, 'parell': pair, **line}, ensure_ascii=False), flush=True)


def stats(values):
    values = sorted(v for v in values if isinstance(v, (int, float)))
    if not values:
        return None
    return {'mediana': round(statistics.median(values)), 'min': round(values[0]), 'max': round(values[-1])}


summary = {}
for label in ('A', 'B'):
    rs = runs[label]
    summary[label] = {k: stats([r.get(k) for r in rs]) for k in ('ttfb', 'fcp', 'lcp', 'longtaskTotal', 'cls', 'bytes') if any(k in r for r in rs)}
    summary[label]['n'] = len(rs)
pairs = list(zip(runs['A'], runs['B']))
summary['parells_on_B_millora_lcp'] = sum(1 for a, b in pairs if b.get('lcp') is not None and a.get('lcp') is not None and b['lcp'] < a['lcp'])
print(json.dumps({'summary': {'ruta': args.route, 'perfil': 'escriptori' if args.desktop else 'mobil', 'A': args.a, 'B': args.b, **summary}}, ensure_ascii=False), flush=True)
