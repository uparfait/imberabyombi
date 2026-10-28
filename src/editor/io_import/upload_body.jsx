/* editor/io_import/upload_body.jsx: the upload dialog's content (drop zone, the chosen files with their badge, size
   and a remove button, "Where should the content go?", the formats that become editable) and its footer (Cancel,
   Add file / Add N files). Body and footer share a small store: up.get() → { files, m }, up.set(patch).
   Also the "could not be added" dialog (show_failed). */
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ic } from '../../icons/index.js';
import { modal } from '../../overlays/index.js';
import { qs } from '../core/index.js';
import { after_close } from '../format/index.js';
import { ext_of, fmt_size } from './file_helpers.js';
import { badge, fmt_chip } from './badge.jsx';

export function upload_store(files, m) {
  let s = { files, m }; const subs = new Set();
  return { get: () => s, set: p => { s = { ...s, ...p }; subs.forEach(f => f()); }, sub: f => { subs.add(f); return () => subs.delete(f); } };
