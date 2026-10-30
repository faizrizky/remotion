import timing from './timing.json';
import {makeVideo} from '../kit';
import {SPECS} from './specs';

export const KitDemo = makeVideo({prefix: 'KD', timing, chapters: [{spec: SPECS[0], name: 'A'}, {spec: SPECS[1], name: 'B'}]});
