"""Pick clean start/end points for a vertical Short (rules for every Short, 3 Nov 2026).

START: the first frame must be calm (no shot transition, no object popping in or about to vanish), and the
       voice must start a sentence right away (no long silent lead-in, never mid-word).
END:   cut after a sentence has fully finished (no audio fade-out, so nothing sounds chopped off).

How: candidate starts = caption cue starts near the spec's `from`; for each, measure on-screen motion in the
first 1.2 s (mean absolute frame difference, low-res) and keep only calm ones. Ends = cue ends near `to`, cut
0.30 s after the cue end (or just before the next cue if that comes sooner).

Usage: python3 -I scripts/short_pick.py <id> [--apply]
"""
import json, subprocess, sys, pathlib
import numpy as np

ROOT = pathlib.Path(__file__).resolve().parents[1]
W, H = 192, 108
LEAD = 0.12        # seconds of quiet before the first word
TAIL = 0.30        # seconds after the last word
CALM = 1.6         # max mean abs difference (0-255) between consecutive frames in the first 1.2 s


def srt(path):
    cues = []
    for b in path.read_text().replace('\r', '').strip().split('\n\n'):
        l = b.split('\n')
        i = next((k for k, x in enumerate(l) if '-->' in x), None)
        if i is None:
            continue
        a, z = [x.strip() for x in l[i].split('-->')]
        ts = lambda t: (lambda h, m, r: int(h) * 3600 + int(m) * 60 + float(r.replace(',', '.')))(*t.split(':'))
        cues.append((ts(a), ts(z), ' '.join(l[i + 1:])))
    return cues


def silences(video, t0, t1, db=-26, d=0.10):
    """Pauses in the voice (the music bed sits well below -26 dB, so this catches the gaps between sentences)."""
    err = subprocess.run(['ffmpeg', '-v', 'info', '-ss', f'{t0:.3f}', '-to', f'{t1:.3f}', '-i', str(video), '-vn',
                          '-af', f'silencedetect=noise={db}dB:d={d}', '-f', 'null', '-'], capture_output=True, text=True).stderr
    out, a = [], None
    for line in err.split('\n'):
        if 'silence_start' in line:
            a = t0 + float(line.split('silence_start:')[1].split()[0])
        elif 'silence_end' in line and a is not None:
            out.append((a, t0 + float(line.split('silence_end:')[1].split()[0])))
            a = None
    return out


def sentences(cues):
    """Split cues into sentences; time each sentence start by its character position inside the cue."""
    out = []
    for a, z, txt in cues:
        parts, cur = [], ''
        for w in txt.split():
            cur = (cur + ' ' + w).strip()
            if w.endswith(('.', '!', '?')) and not w[:-1].replace('$', '').replace(',', '').replace('.', '').isdigit():
                parts.append(cur); cur = ''
        if cur:
            parts.append(cur)
        n = sum(len(x) for x in parts) or 1
        t = a
        for x in parts:
            d = (z - a) * len(x) / n
            out.append((t, t + d, x))
            t += d
    return out


def motion(video, t0, dur=1.2):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{max(0, t0):.3f}', '-t', f'{dur:.3f}', '-i', str(video),
                          '-vf', f'scale={W}:{H},format=gray', '-f', 'rawvideo', '-'], capture_output=True).stdout
    fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W).astype(np.float32)
    if len(fr) < 2:
        return 99.0
    return float(np.abs(np.diff(fr, axis=0)).mean(axis=(1, 2)).max())


def main():
    sid = sys.argv[1]
    specs = json.loads((ROOT / 'src/shorts/shorts.json').read_text())
    sp = next(s for s in specs if s['id'] == sid)
    video, cues = ROOT / sp['long'], srt(ROOT / sp['srt'])
    sil = silences(video, max(0, sp['from'] - 12), sp['to'] + 8)
    sents = [x for x in sentences(cues) if x[2][:1].isupper() or x[2][:1] in '$"\'0123456789']
    starts = []
    for a, z, txt in sents:
        if abs(a - sp['from']) > 10:
            continue
        near = [g for g in sil if abs(g[1] - a) < 0.7]   # the pause right before this sentence
        if not near:
            continue
        g = min(near, key=lambda g: abs(g[1] - a))
        st = max(g[0], g[1] - LEAD)
        m = motion(video, st)
        starts.append((m <= CALM, abs(a - sp['from']), round(st, 2), round(m, 2), txt[:60]))
    starts.sort(key=lambda x: (not x[0], x[1]))
    print('START candidates (calm?, distance, start, motion, first words):')
    for s in starts[:8]:
        print('  ', s)
    ends = []
    for a, z, txt in sentences(cues):
        if abs(z - sp['to']) > 8 or not txt.rstrip().endswith(('.', '!', '?')):
            continue
        near = [g for g in sil if abs(g[0] - z) < 0.7]   # the pause right after this sentence
        if not near:
            continue
        g = min(near, key=lambda g: abs(g[0] - z))
        ends.append((abs(z - sp['to']), round(min(g[0] + TAIL, g[1] - 0.04), 2), txt[-50:]))
    ends.sort()
    print('END candidates (distance, end, last words):')
    for e in ends[:4]:
        print('  ', e)
    if '--apply' in sys.argv and starts and starts[0][0] and ends:
        sp['from'], sp['to'] = starts[0][2], ends[0][1]
        (ROOT / 'src/shorts/shorts.json').write_text(json.dumps(specs, indent=1) + '\n')
        print('applied', sid, sp['from'], sp['to'], 'len', round(sp['to'] - sp['from'], 1))


if __name__ == '__main__':
    main()
