/* kit/kit_block.jsx: shared pieces of the design-system page: one specimen section (kit_block, the reference's
   block()) and svg_uri(), the small SVG data URI the media specimens show through <embed> and <object>. */

/* one specimen group: a titled section the side navigation scrolls to (#section_<id>) */
export const kit_block = (id, t, body) => (
  <section id={`section_${id}`} className="scroll-mt-24 border-t border-line py-12 first:border-0 first:pt-0">
    <h2 className="text-2xl sm:text-3xl">{t}</h2><div className="mt-6">{body}</div>
