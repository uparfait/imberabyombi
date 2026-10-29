/* iconisus/lib_grid.jsx: an icon set to pick from: the set, a search, and a grid that fills in batches as it is scrolled
   (thousands of icons stay quick). A click picks the icon; the set loads the first time it is chosen (lib_load.js). */
import { useEffect, useRef, useState } from 'react';
import { clean_svg } from '../icon3d/index.js';
import { spinner } from '../feedback/index.js';
