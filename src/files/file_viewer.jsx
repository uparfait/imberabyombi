/* files/file_viewer.jsx: view_file(), one file in the #viewer dialog. Images, video, audio, PDF and any text/code file
   show inside; other types (and media the browser cannot play) get Open + Download (file_info). */
import { useEffect, useState } from 'react';
import { ic, i3 } from '../icons/index.js';
import { spinner } from '../feedback/index.js';
import { help_tip } from '../ui/index.js';
import { show_in_dialog, tip } from '../overlays/index.js';
