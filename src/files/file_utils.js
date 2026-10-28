/* files/file_utils.js: H. FILES helpers: an object URL per chosen file, sizes, extensions, the kind of a file
   (image, video, audio, pdf, text, other) and the icon each kind shows. */

/* H. FILES: chosen files preview above the file field (image, video, audio, document tiles). x removes a file,
      a tile opens #viewer: images, video, audio, PDF and any text/code file show inside; other types get Open + Download. */
export const FURL = new WeakMap();
export const VIEW = { f: null, n: 0 };   /* the file open in #viewer (null once it closes); n counts the views */
export const furl = f => FURL.get(f) || (FURL.set(f, URL.createObjectURL(f)), FURL.get(f));
