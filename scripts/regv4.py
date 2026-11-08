import sys
n=sys.argv[1]
r=open('src/Root.tsx').read()
imp=f"import {{V4Ch{n}, V4_CH{n}_LEN}} from './style2/V4Ch{n}';"
if imp not in r:
    r=r.replace("import {V4Ch1, V4_CH1_LEN} from './style2/V4Ch1';","import {V4Ch1, V4_CH1_LEN} from './style2/V4Ch1';\n"+imp)
    r=r.replace('<Composition id="V4-Ch1"',f'<Composition id="V4-Ch{n}" component={{V4Ch{n}}} defaultProps={{{{check: false}}}} durationInFrames={{V4_CH{n}_LEN}} fps={{24}} width={{1920}} height={{1080}} />\n      <Composition id="V4-Ch1"')
    open('src/Root.tsx','w').write(r)
