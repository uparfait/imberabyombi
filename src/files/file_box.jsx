/* files/file_box.jsx: <File_box/>, a file field inside its .filebox (attachments row + waiting spinner + the input): the
   DOM the reference's fileBox() + fileTiles() built around <input type=file>. The chosen files and the "picking" state
   (the system file dialog is open) are React state; the input keeps the real FileList (forms read it, x rewrites it). */
import { useEffect, useRef, useState } from 'react';
import { spinner } from '../feedback/index.js';
import { file_tile } from './file_tile.jsx';

const BOXES = new WeakMap();   /* file input → its File_box's sync() */
const same = (a, b) => a.length === b.length && a.every((f, i) => f === b[i]);
