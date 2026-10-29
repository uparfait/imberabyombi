/* iconisus/lib_load.js: the icon sets Iconisus can browse ([prefix, name, the matching React package]) and load_set(prefix),
   which fetches a set's Iconify JSON from jsDelivr once (a set loads only when it is picked; the large ones are a few MB). */
export const LIBS = [['lucide', 'Lucide', 'lucide-react'], ['heroicons', 'Heroicons', '@heroicons/react'], ['tabler', 'Tabler', '@tabler/icons-react'],
  ['ph', 'Phosphor', '@phosphor-icons/react'], ['feather', 'Feather', 'react-feather'], ['bi', 'Bootstrap', 'react-bootstrap-icons'],
  ['fa6-solid', 'Font Awesome', '@fortawesome/react-fontawesome'], ['ri', 'Remix', '@remixicon/react'], ['ion', 'Ionicons', 'react-icons/io5'],
  ['mdi', 'Material Design', '@mdi/react'], ['iconoir', 'Iconoir', 'iconoir-react'], ['simple-icons', 'Simple Icons', '@icons-pack/react-simple-icons']];
