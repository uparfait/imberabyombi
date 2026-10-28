/* editor/io_export/download_dialog.jsx: Download (the template's modal): the file name with the format's extension,
   the format cards (click picks one, double-click downloads at once), this tab / all tabs, the PDF quality and a summary
   of what is saved. Download (or Enter) writes the file; on an error the message shows and the dialog stays open. */
import { useEffect, useState } from 'react';
import { ic } from '../../icons/index.js';
