/* iconisus/lib_load.js: the icon sets Iconisus can browse ([prefix, name, the matching React package]) and load_set(prefix),
   which fetches a set's Iconify JSON from jsDelivr once (a set loads only when it is picked; the large ones are a few MB). */
export const LIBS = [['lucide', 'Lucide', 'lucide-react'], ['heroicons', 'Heroicons', '@heroicons/react'], ['tabler', 'Tabler', '@tabler/icons-react'],
  ['ph', 'Phosphor', '@phosphor-icons/react'], ['feather', 'Feather', 'react-feather'], ['bi', 'Bootstrap', 'react-bootstrap-icons'],
  ['fa6-solid', 'Font Awesome', '@fortawesome/react-fontawesome'], ['ri', 'Remix', '@remixicon/react'], ['ion', 'Ionicons', 'react-icons/io5'],
  ['mdi', 'Material Design', '@mdi/react'], ['iconoir', 'Iconoir', 'iconoir-react'], ['simple-icons', 'Simple Icons', '@icons-pack/react-simple-icons']];

const SETS = {};
export const load_set = p => SETS[p] ||= fetch(`https://cdn.jsdelivr.net/npm/@iconify-json/${p}@1.2.0/icons.json`)
  .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
  .catch(e => { delete SETS[p]; throw e; });

/* one icon of a set, as the engine takes it: { body, width, height, left, top } */
export const icon_of = (set, n) => { const i = set.icons[n];
  return { body: i.body, width: i.width || set.width || 16, height: i.height || set.height || 16, left: i.left || set.left || 0, top: i.top || set.top || 0 }; };
