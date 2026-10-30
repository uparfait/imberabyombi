/* auth/mods.js: RBAC modules = permission keys; levels 0 none · 1 view · 2 manage.
   Each record: k = key (route /admin/<k>), l = label, s = short label, i = icon, g = sidebar group, full = opens in the
   whole window without the admin sidebar and header (it brings its own Back button), d = what it is (the sidebar link's
   tooltip). */
export const MODS = [
