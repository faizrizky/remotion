"""Builds src/video03/timing.json + captions.json from the owner's transcript (transcript_v3.py),
the silence list (silences.json) and the pause-tightening report (retime_report.json, made by the rule-1.24 cutter).
Beats: s1..sN = shot starts (tightened audio); named anchors = word onsets estimated inside a transcript
segment by character position, snapped to the nearest speech onset (end of a silence) within 0.35 s."""
import json, sys, os, wave
H = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, H)
from transcript_v3 import T
R = json.load(open(f'{H}/retime_report.json'))
S = json.load(open(f'{H}/silences.json'))
ROOT = os.path.abspath(f'{H}/../..')

FILES = ['v3_00_cold', 'v3_01_hike', 'v3_02_brain', 'v3_03_hides', 'v3_04_matter', 'v3_05_fight', 'v3_06_number', 'v3_07_outro']
IDS = ['cold', 'ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'outro']
TITLES = ['', 'The Invisible Price Hike', 'Why Your Brain Misses It', 'Where It Hides', 'Does It Really Matter?', 'Some Countries Fight Back', 'The Number That Catches It', 'Outro']
# pre: ch1 opens with the PennySting (4.35 s). post: chapters that end with a carry pan need >= 1.25 s (30-frame pan).
PRE = {'ch1': 4.35}
POST = {'cold': 0.6, 'outro': 2.5}
OVERLAP = {'ch1': 10}  # others: 30 (pan)

A = {
 'v3_00_cold': {'sameBox': 'same box', 'samePrice': 'same price', 'sameSpot': 'same spot', 'openIt': 'but open', 'less': "less inside",
   'nobody': 'raised the price', 'memo': 'nobody sent', 'lighter': 'the bag just', 'called': "it's called", 'bug': 'tiny bug', 'brain': 'how your brain',
   'where': 'where it hides', 'why': 'why it works', 'oneNumber': 'and the one number', 'catches': 'catches it'},
 'v3_01_hike': {'costs': 'costs go up', 'twoOpt': 'two options', 'opt1': 'option one', 'box4': 'your $4 box', 'b450': '$4.50', 'notice': 'and you notice',
   'opt2': 'option two', 'keep4': 'keep it at $4', 'lessIn': 'put less inside', 'samePrice': 'same price, less', 'stillHike': "that's still", 'cantSee': "you just can't",
   'econ': 'economists call', 'shrinkPlus': 'shrink plus', 'notNew': "it's not new", 'y2016': 'in 2016', 'toblerone': 'toblerone', 'gaps': 'widened',
   'triangles': 'between its', 'g400': '400 grams', 'g360': 'to 360', 'shape': 'the shape', 'choco': 'the chocolate'},
 'v3_02_brain': {'why': 'so why', 'checkPrices': 'because you check', 'notWeights': "you don't check", 'study': 'researchers studied', 'chicago': 'in chicago',
   'react': 'they found', 'fourX': 'four times more', 'sizeWord': 'package size', 'four2': 'four times.', 'easy': 'for a company', 'raise': 'raise the price',
   'walk': 'walk away', 'shrinkPkg': 'shrink the package', 'never': 'and most of them', 'built': 'and the package is built', 'colors': 'same colors',
   'logo': 'same logo', 'shelf': 'same size on', 'only': 'often the only', 'netWt': 'the net weight'},
 'v3_03_hides': {'looking': 'once you start', 'everywhere': 'everywhere', 'y2022': 'in 2022', 'npr': 'npr documented', 'cott': 'cottonelle', 'sh340': '340 sheets',
   'sh312': 'became 312', 'kleenex': 'kleenex', 't65': 'box of 65', 't60': 'became 60', 'gator': 'gatorade', 'oz32': '32-ounce', 'oz28': 'for 28', 'folg': "folger's",
   'oz51': 'from 51', 'oz435': 'to 43.5', 'cups': 'the can still', 'cups400': '400 cups', 'domino': "domino's", 'w10': '10 pieces', 'w8': 'to 8', 'p799': '$7.99',
   'cousin': 'quieter cousin', 'skimp': 'skimpflation', 'sameSize': 'same size,', 'samePrice': 'same price, but', 'cheaper': 'cheaper ingredients', 'service': 'less service',
   'label': "that one doesn't"},
 'v3_04_matter': {'honest': 'here\'s the honest', 'economy': 'for the economy', 'tiny': 'is tiny', 'y2025': 'in 2025', 'gao': 'government accountability', 'years': 'from 2019',
   'overall': 'overall,', 'rose': 'prices rose', 'p345': '34.5%', 'shrinkAdd': 'shrinking packages added less', 'tenth': 'tenth of one', 'soNo': 'so no,', 'feels': 'everything feels',
   'zoom': 'but zoom', 'cart': 'on your cart', 'story': 'different story', 'paper': 'for household paper', 'towels': 'like paper towels', 'three': 'three full',
   'cereal': 'for cereal, 1.6', 'c16': '1.6.', 'inCereal': 'and in cereal', 'onePct': 'about 1%', 'shrank': 'of products shrank', 'nine': 'almost 9%', 'otherWords': 'in other words',
   'random': "it doesn't hit", 'most': 'it tends to hit', 'buyMost': 'buy the most'},
 'v3_05_fight': {'govts': 'some governments', 'detective': 'play detective', 'july': 'since july', 'france': 'in france', 'notice': 'put a notice', 'shrank': 'that shrank',
   'unit': 'while the price per unit', 'fine': 'companies that break', 'eur': '€15,000', 'korea': 'south korea', 'pkg': 'on the package', 'store': 'in the store', 'online': 'or online',
   'us': 'and in the us', 'noRule': "there's no national", 'bills': 'bills have', 'nonePassed': 'but none has passed', 'own': "so you're on", 'almost': 'well, almost'},
 'v3_06_number': {'remember': 'remember the one', 'unitPrice': "it's the unit price", 'small': 'the small print', 'oz': 'per ounce', 'sheet': 'per sheet', 'grams': 'per hundred',
   'frozen': 'the big price', 'cantHide': "the unit price can't", 'shrinks': 'when the package', 'jumps': 'the unit price jumps', 'nineStates': 'only nine', 'dc': 'washington',
   'notReq': 'in most states', 'read': "so if it's there", 'math': "if it isn't", 'phone': 'on your phone', 'habits': 'three habits', 'h1': 'one, compare', 'h2': 'two, when',
   'newDesign': 'new design', 'netWt': 'check the net', 'h3': 'three, count', 'sheets': 'sheets, scoops', 'boxes': 'not boxes'},
 'v3_07_outro': {'wrong': 'shrinkflation works', 'wrongNum': 'the wrong number', 'front': 'the price on the front', 'want': 'they want you', 'truth': 'the unit price is',
   'challenge': "here's your challenge", 'nextShop': 'next time you shop', 'weekly': 'check one thing', 'comments': 'then tell me', 'shrink': 'did it shrink',
   'subscribe': 'subscribe so', 'seeYou': 'see you next'},
}

def mapper(f):
    tr = R[f]['trimmed']
    def m(t):
        out = t
        for a, L, n in tr:
            if t >= a + L: out += n - L
            elif t > a: out += (n - L) * (t - a) / L
        return out
    return m

def wav_dur(p):
    w = wave.open(p); d = w.getnframes() / w.getframerate(); w.close(); return d

chapters, caps = [], {}
for f, cid, title in zip(FILES, IDS, TITLES):
    m = mapper(f)
    sil = [(a, b) for a, b in S[f]['sil'] if b - a >= 0.2]
    beats = {}
    for k, (a, b) in enumerate(R[f]['shots']):
        beats[f's{k+1}'] = round(a, 2)
    segs = T[f]
    for name, ph in A[f].items():
        hit = None
        for a, b, text in segs:
            i = text.lower().find(ph.lower())
            if i >= 0: hit = (a, b, text, i); break
        if not hit: raise SystemExit(f'{f}: phrase not found: {ph}')
        a, b, text, i = hit
        t = a + (b - a) * i / max(1, len(text))
        ends = [e for s0, e in sil if abs(e - t) <= 0.35]
        if ends: t = min(ends, key=lambda e: abs(e - t)) + 0.05
        beats[name] = round(max(0, m(t)), 2)
    dur = wav_dur(f'{ROOT}/public/v3/audio/{f}.wav')
    ch = {'id': cid, 'title': title, 'audio': f'v3/audio/{f}.wav', 'pre': PRE.get(cid, 0), 'audioDur': round(dur, 2),
          'post': POST.get(cid, 1.6), 'beats': dict(sorted(beats.items(), key=lambda kv: kv[1]))}
    if cid != 'cold': ch['overlapFrames'] = OVERLAP.get(cid, 30)
    chapters.append(ch)
    # captions: words timed by character position inside their segment, regrouped into cues that end at
    # sentence ends (or a comma once a cue passes ~45 chars), max ~84 chars (2 lines), min 1.0 s
    fixw = {"tweets.": "weights.", "Folger's": "Folgers", "Shrinkflation": "shrinkflation", "Skimpflation.": "skimpflation."}
    words = []
    for a, b, text in segs:
        pos = 0
        for w in text.split():
            i = text.index(w, pos); pos = i + len(w)
            words.append([m(a + (b - a) * i / len(text)), m(a + (b - a) * pos / len(text)), fixw.get(w, w)])
    # sentences first, then split long ones (>84 chars) at the comma nearest the middle, else at the middle word
    sents, cur = [], []
    for w in words:
        cur.append(w)
        if w[2][-1] in '.?!' and not w[2].endswith('D.C.') and not w[2].endswith('U.S.'): sents.append(cur); cur = []
    if cur: sents.append(cur)
    def split(ws):
        t = ' '.join(x[2] for x in ws)
        if len(t) <= 84 or len(ws) < 4: return [ws]
        mid = len(t) / 2; acc = 0; best = None
        for i, x in enumerate(ws[:-1]):
            acc += len(x[2]) + 1
            score = abs(acc - mid) - (25 if x[2].endswith(',') else 0)
            if best is None or score < best[0]: best = (score, i)
        i = best[1]
        return split(ws[:i + 1]) + split(ws[i + 1:])
    cues = []
    for se in sents:
        for ws in split(se):
            cues.append([round(ws[0][0], 2), round(ws[-1][1], 2), ' '.join(x[2] for x in ws)])
    if cues: cues[0][2] = cues[0][2][0].upper() + cues[0][2][1:]
    caps[cid] = cues
json.dump({'_readme': 'GENERATED by docs/video03/make_timing.py (do not hand-edit). Seconds in the TIGHTENED voice (public/v3/audio). s1..sN = shot starts (rule 1.24); other beats = word onsets (+-0.3 s). ch1.pre = 4.35 s PennySting. overlapFrames = frames a chapter starts before the previous one ends (sting 10, carry pan 30).',
           'fps': 24, 'chapters': chapters}, open(f'{ROOT}/src/video03/timing.json', 'w'), indent=1)
json.dump(caps, open(f'{ROOT}/src/video03/captions.json', 'w'), indent=1)
for c in chapters: print(c['id'], c['audioDur'], len(c['beats']))
