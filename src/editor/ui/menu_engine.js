/* editor/ui/menu_engine.js: the editor's popup menus (source "menus"): plain DOM on document.body (outside React), styled
   like the template's .pop / .menu_item, with submenus, check marks and shortcuts. Items: { label, icon, shortcut, checked,
   disabled, label_style, action, sub, no_preview, peek } · { sep } · { header } · { render }. Hovering (or focusing) an item
