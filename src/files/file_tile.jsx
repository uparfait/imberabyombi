/* files/file_tile.jsx: one tile of the attachments row above a file field (fileTiles): a thumbnail for images and
   videos, an icon + name + type · size chip for the rest, and the x that removes it. The tile opens #viewer. */
import { ic } from '../icons/index.js';
import { furl, fmt_size, ext_of, file_kind, FICON } from './file_utils.js';

/* gen: the File_box's redraw count. Each redraw is a new set of tiles (as the reference's innerHTML), so the
   fade-in plays again and a tile faded out by data-act="file_rm" never stays on screen for another file. */
export function file_tile(f, i, gen = 0) {
  const k = file_kind(f), media = k === 'image' || k === 'video', u = media ? furl(f) : '';
  return (
    <div key={`${gen}_${i}`} className={`file ${media ? 'media' : 'doc'}`} style={{ '--i': i }} data-act="file_view" data-i={i} tabIndex="0" role="button"
      aria-label={`Open ${f.name}`} data-tip={media ? f.name : undefined}>
      {media
        ? (k === 'image' ? <img src={u} alt="" /> : <><video src={`${u}#t=0.5`} muted preload="metadata" playsInline></video>{ic('play', 'file_play')}</>)
        : <><span className="file_ico">{ic(FICON[k], 'h-5 w-5')}</span>
