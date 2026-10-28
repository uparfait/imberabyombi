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
| Action and form names        | snake_case                     | `data-act="task_open"`, `data-form="login"` |

React needs a capital first letter to tell a component from an HTML tag, so components are `Capital_snake`.
Names the tools require keep their own spelling: `index.html`, `package.json`, `vite.config.js`,
`tailwind.config.js`, `postcss.config.js`, `README.md`. Tailwind utilities keep Tailwind's names (`bg-surface-2`),
HTML attributes keep HTML's (`aria-label`, `data-tip`), and custom elements need a hyphen (`<ds-callout>`).

## 3. Generic names, subject words only in data
Class names and ids describe what a thing IS or DOES, never a business subject, so the template fits any website:
`table_body_<collection>`, `table_filter`, `field_<key>`, `side_panel`, `tile`, `check_row`, `memo`, `choice_pill`.
Subject words (staff, parking, students…) belong only in data: schema keys, module keys, labels and action names.
