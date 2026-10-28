/* editor/ui/page_setup.jsx: File / Format › Page setup (source pageSetupDialog) in the template's modal: pages or
   pageless, orientation, paper size, margins, header / footer / page numbers and the page colour. The new setup is one
   step of history and is applied once the dialog has closed. */
import { useState } from 'react';
import { state, PAPER, clamp, begin_op, commit, save_soon } from '../core/index.js';
import { num_props } from '../format/index.js';
import { modal } from '../../overlays/index.js';
import { form_msg } from '../../feedback/index.js';
import { apply_setup } from './view.js';
