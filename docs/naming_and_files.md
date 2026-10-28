# Naming and file rules

These rules keep the template easy to read, easy to search and easy to reuse for any kind of website.

## 1. Every file stays short
No file is longer than **100 lines**: code, styles, configuration and documentation. When a file grows, split it by
topic (for example `schema_tasks.js`, `schema_staff.js`) and re-export the parts from the folder's `index.js`.
Short files are easy to review, easy to replace and load only what a page needs.

## 2. snake_case everywhere
| What                         | Style                          | Example                                  |
|------------------------------|--------------------------------|------------------------------------------|
| Files and folders            | snake_case                     | `src/modules/task_view.jsx`, `docs/how_to_add_a_module.md` |
| Functions, variables, props  | snake_case                     | `format_date`, `open_form`, `on_submit`  |
| Constant tables              | UPPER_SNAKE                    | `MODS`, `STATUS`, `PW_RULES`             |
| React components             | Capital first, then snake_case | `Task_view`, `File_box`, `Dialog_hosts`  |
| CSS classes and ids          | snake_case                     | `.icon_btn`, `.table_data`, `#side_panel`|
| CSS variables and keyframes  | snake_case                     | `--surface_2`, `toast_in`                |
