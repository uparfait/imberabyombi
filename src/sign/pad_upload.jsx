/* sign/pad_upload.jsx: <Pad_upload kind/>, a picture of your signature or stamp (PNG, JPG or WebP, up to 5 MB), shown on a
   checkerboard so what is transparent is plain to see. "Remove background" makes the paper transparent (bg_cut.js): it
   starts part-way for a picture with paper around it; slide right until only the ink is left. Its mark is the picture
   as shown, cut to its visible part. */
import { useEffect, useRef, useState } from 'react';
import { i3 } from '../icons/index.js';
import { form_msg } from '../feedback/index.js';
