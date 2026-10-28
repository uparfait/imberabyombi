/* files/file_utils.js: H. FILES helpers: an object URL per chosen file, sizes, extensions, the kind of a file
   (image, video, audio, pdf, text, other) and the icon each kind shows. */

/* H. FILES: chosen files preview above the file field (image, video, audio, document tiles). x removes a file,
      a tile opens #viewer: images, video, audio, PDF and any text/code file show inside; other types get Open + Download. */
export const FURL = new WeakMap();
export const VIEW = { f: null, n: 0 };   /* the file open in #viewer (null once it closes); n counts the views */
export const furl = f => FURL.get(f) || (FURL.set(f, URL.createObjectURL(f)), FURL.get(f));
export const fmt_size = n => n < 1024 ? `${n} B` : n < 1048576 ? `${(n / 1024).toFixed(1)} KB` : `${(n / 1048576).toFixed(1)} MB`;
export const ext_of = f => (f.name.includes('.') ? f.name.split('.').pop() : '').slice(0, 5);
export const TEXT_EXT = /^(txt|md|csv|tsv|json|xml|js|mjs|ts|jsx|tsx|css|html?|ya?ml|log|ini|conf|env|sql|py|rb|php|java|kt|c|h|cpp|cs|go|rs|sh|bat|ps1)$/i;
