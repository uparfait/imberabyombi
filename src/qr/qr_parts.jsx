/* qr/qr_parts.jsx: Qr-scan's pieces: the top bar (its name, Install, light / dark, back to the site), what a scan found (a
   secure link, opened in a new tab; an http link, which does not open from here; any other text, to copy) and the recent
   scans. */
import { useState } from 'react';
import { ic } from '../icons/index.js';
import { cfg } from '../config/index.js';
import { secure } from './qr_engine.js';
import { can_install, install, apple, standalone } from './qr_install.js';

function Copy({ text, label = 'Copy', cls = 'btn btn_outline' }) {
