/* sign/sign_pad.jsx: <Mark_pad kind name/>, the body of the "Add your signature / stamp" dialog. A signature is drawn,
   typed (five handwriting styles) or uploaded; a stamp is created (organisation, centre text, date, ink, shape) or uploaded,
   and an upload can lose its background. The tab on show sets PAD.get() (pad_state.js), which the dialog's button reads. */
import { useState } from 'react';
import { PAD } from './pad_state.js';
import { Pad_draw } from './pad_draw.jsx';
