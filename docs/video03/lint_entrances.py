"""Rule 1.25 check: every entrance must FINISH before its shot's transition starts.

Scans src/video03/chapters/*.tsx shot by shot, resolves r('beat') + offset and literal at={n}
against timing.json, and lists entrances that start later than (shot length - LATE).
The Shots runner clamps r('beat', off) to <= dur - LATE; this catches offsets written outside r() and literal at={n}.
Usage: python3 docs/video03/lint_entrances.py   (exit code 1 if anything is late)
"""
import json, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
FPS = 24
LATE = 30  # pop settle (~20 f at tempo 0.62) + a short hold before the cut
OVERLAP_PAN = 30
FILES = {'cold': 'Cold', 'ch1': 'Ch1', 'ch2': 'Ch2', 'ch3': 'Ch3', 'ch4': 'Ch4', 'ch5': 'Ch5', 'ch6': 'Ch6', 'outro': 'Outro'}

timing = json.loads((ROOT / 'src/video03/timing.json').read_text())
bad = 0
for ch in timing['chapters']:
    src = (ROOT / f"src/video03/chapters/{FILES[ch['id']]}.tsx").read_text()
    beats = ch['beats']
    n = len([k for k in beats if re.fullmatch(r's\d+', k)])
    total = round((ch['pre'] + ch['audioDur'] + ch['post']) * FPS)
    exit_pan = 'exitPan=' in src
    bodies = [m.start() for m in re.finditer(r'body: \(r\) =>', src)]
    bodies.append(len(src))
    for k in range(n):
        txt = src[bodies[k]:bodies[k + 1]]
        start = round(beats[f's{k + 1}'] * FPS)
        end = round(beats[f's{k + 2}'] * FPS) if k < n - 1 else total - (OVERLAP_PAN if exit_pan else 0)
        dur = end - start
        lim = dur - LATE
        hits = []
        for m in re.finditer(r"r\('(\w+)'(?:,\s*(-?\d+))?\)\s*([+-]\s*\d+)?", txt):
            key, off, raw = m.group(1), int(m.group(2) or 0), m.group(3)
            fr = max(0, min(round(beats[key] * FPS) - start + off, lim))  # runner clamp
            if raw:  # an offset added OUTSIDE r() escapes the clamp: write r('beat', n) instead
                fr += int(raw.replace(' ', ''))
            if fr > lim:
                hits.append(f"r('{key}'){raw or ''} -> {fr}")
        for m in re.finditer(r'at=\{(\d+)\}', txt):
            if int(m.group(1)) > lim:
                hits.append(f'at={{{m.group(1)}}}')
        if hits:
            bad += 1
            print(f"{ch['id']} shot {k + 1} (len {dur} f, entrances must start <= {lim}): " + ', '.join(sorted(set(hits))))
print('OK: all entrances finish before the cut' if not bad else f'{bad} shot(s) with late entrances')
sys.exit(1 if bad else 0)
