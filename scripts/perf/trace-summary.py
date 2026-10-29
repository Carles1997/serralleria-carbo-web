"""Resum d'una traça de Chromium (fil principal del renderitzador) fins a un instant donat.

Ús: python -I scripts/perf/trace-summary.py traça.json [--until-ms 5000]
Mostra el temps propi per tipus d'esdeveniment i les tasques llargues amb el seu contingut principal.
"""
import argparse
import collections
import json


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('trace')
    parser.add_argument('--until-ms', type=float, default=10000)
    args = parser.parse_args()
    data = json.load(open(args.trace, encoding='utf-8'))
    events = data['traceEvents'] if isinstance(data, dict) else data

    threads = {(e['pid'], e['tid']): e['args'].get('name') for e in events if e.get('ph') == 'M' and e.get('name') == 'thread_name'}
    # Fil principal de la pàgina: el CrRendererMain amb més esdeveniments de document.
    candidates = collections.Counter((e['pid'], e['tid']) for e in events
                                     if threads.get((e.get('pid'), e.get('tid'))) == 'CrRendererMain' and e.get('name') in ('ParseHTML', 'Layout', 'Paint'))
    main_thread = candidates.most_common(1)[0][0]
    nav = [e for e in events if e.get('name') in ('navigationStart', 'NavigationTimingStart', 'markAsMainFrame') and e.get('ph') in ('R', 'I', 'n', 'X')]
    start = min((e['ts'] for e in events if (e.get('pid'), e.get('tid')) == main_thread and e.get('ph') == 'X'), default=0)
    nav_ts = min((e['ts'] for e in nav if e.get('pid') == main_thread[0]), default=start)
    until = nav_ts + args.until_ms * 1000

    xs = sorted((e for e in events if (e.get('pid'), e.get('tid')) == main_thread and e.get('ph') == 'X' and 'dur' in e and e['ts'] <= until),
                key=lambda e: (e['ts'], -e['dur']))
    # Temps propi: durada menys la dels fills directes (pila per niuament).
    self_time = collections.Counter()
    stack = []
    for e in xs:
        end = e['ts'] + e['dur']
        while stack and stack[-1][1] <= e['ts']:
            stack.pop()
        if stack:
            self_time[stack[-1][0]['name']] -= min(e['dur'], stack[-1][1] - e['ts'])
        self_time[e['name']] += e['dur']
        stack.append((e, end))
    print(f'Fil principal {main_thread}, fins a {args.until_ms:.0f} ms des de la navegació')
    print('Temps propi per esdeveniment (ms):')
    for name, us in self_time.most_common(18):
        print(f'  {us / 1000:8.1f}  {name}')

    print('Tasques de més de 50 ms (inici ms, durada ms, fills principals):')
    tops = [e for e in xs if e['name'] in ('RunTask', 'ThreadControllerImpl::RunTask') and e['dur'] >= 50000]
    for task in tops:
        t0, t1 = task['ts'], task['ts'] + task['dur']
        inner = collections.Counter()
        for e in xs:
            if t0 < e['ts'] < t1 and e['name'] not in ('RunTask', 'ThreadControllerImpl::RunTask'):
                inner[e['name']] += e['dur']
        detail = ', '.join(f'{n} {d / 1000:.0f}' for n, d in inner.most_common(4))
        print(f'  {(t0 - nav_ts) / 1000:7.0f} {task["dur"] / 1000:7.0f}  {detail}')


if __name__ == '__main__':
    main()
