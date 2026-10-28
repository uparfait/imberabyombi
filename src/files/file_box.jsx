/* files/file_box.jsx: <File_box/>, a file field inside its .filebox (attachments row + waiting spinner + the input): the
   DOM the reference's fileBox() + fileTiles() built around <input type=file>. The chosen files and the "picking" state
   (the system file dialog is open) are React state; the input keeps the real FileList (forms read it, x rewrites it). */
import { useEffect, useRef, useState } from 'react';
import { spinner } from '../feedback/index.js';
import { file_tile } from './file_tile.jsx';

const BOXES = new WeakMap();   /* file input → its File_box's sync() */
const same = (a, b) => a.length === b.length && a.every((f, i) => f === b[i]);

/* The .filebox around a file input (null for an input that is not a File_box). The click listener adds .picking with it. */
export const file_box = inp => inp?.closest?.('.filebox') || null;
/* Redraw a File_box's tiles from input.files (after a change, an x or a form reset). The tiles fade in, except right after
   an x (input._quiet). Safe to call twice for one change, and a no-op for other file inputs. */
export const file_tiles = inp => { BOXES.get(inp)?.(); };

/* props: id, name, multiple, accept and any other <input> attribute (data-new-files…) */
export function File_box({ id, name, multiple, accept, onClick, onChange, ...rest }) {
  const ref = useRef(null), shown = useRef([]), picking_now = useRef(false);
  const [view, set_view] = useState({ files: [], quiet: false, gen: 0 });
  const [picking, set_picking] = useState(false);
  picking_now.current = picking;
  useEffect(() => {
    const inp = ref.current, stop = () => set_picking(false);
    const sync = () => {
      const list = [...(inp.files || [])], quiet = !!inp._quiet; inp._quiet = false; stop();
      if (same(list, shown.current)) return;
      shown.current = list; set_view(v => ({ files: list, quiet, gen: v.gen + 1 }));
    };
    /* File dialog closed without choosing: stop the waiting spinner (cancel event, plus a focus fallback for older browsers) */
