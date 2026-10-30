# Components catalogue (CSS, declared once)

Every class below lives in [`src/styles/`](../src/styles/) and is used the same way everywhere. Open `/ui` to see each
one live. Classes are snake_case; Tailwind utilities keep Tailwind's names.

| Class                                   | Use                                                              |
|-----------------------------------------|------------------------------------------------------------------|
| `.wrap` / `.section`                    | page width and gutters / vertical section rhythm                 |
| `.btn` + `.btn_primary` `.btn_ink` `.btn_outline` `.btn_ghost` `.btn_soft` `.btn_danger` `.btn_warn` `.btn_glass`, `.btn_sm` | buttons (44px, small 36px; beside a field = field height) |
| `.icon_btn`                             | round 40px icon button (its `aria-label` is its tooltip)         |
| `.card` / `.card_hover`                 | flat surface container / border tint on hover                    |
| `.chip` / `.chip_btn`                   | badge / pressable filter chip (`aria-pressed`)                   |
| `.kicker`                               | small section label with the diamond icon                        |
| `.field`                                | outlined field: the label rests inside and floats onto the border |
| `.on_bg`                                | a form that sits on the page background (not on a card)          |
| `.nav_link` / `.side_link` / `.link_group` | top navigation pill / sidebar link / translucent link group    |
| `.panel` / `.memo` / `.check_row`       | side panel beside the content / note card / checklist row        |
| `.scroll_hover`                         | scrollbar visible only while hovered (admin sidebar)             |
| `.fold`                                 | smooth collapsible section (sidebar groups, mini calendar)       |
| `.table_data` / `.table_acts` / `.table_filter` / `.pick` / `.trunc` / `.pager` | data table / pinned Action Buttons / column filter / filter wrapper / trimmed cell / pager |
| `.kv`                                   | COLUMN NAME / VALUE details table with category rows             |
| `.tile_trigger` / `.tile_pop`           | "Your modules" style menu: a button dropping a grid of 3D tiles  |
| `.viz_card` / `.kpi`                    | chart card / KPI card                                            |
| `.selectable`                           | lets people select (copy) the text inside it                     |
| `.help_tip`                             | help icon after a title; its text shows in the tooltip           |
| `.brand_toggle`                         | collapsed sidebar: logo that becomes "open sidebar" on hover     |
| `.date_hint`                            | the format hint shown while typing a date or time                |
| `.tab` / `.seg`                         | underlined tabs / segmented button                               |
| `.pop` / `.menu_item` / `.menu_danger`  | popover menu and its items                                       |
| `.pop.pop_fixed`                         | a menu drawn at the top of the page (portal), placed under its button, above everything (the account menu) |
| `.choice_pill`                          | pill radio option (filter-chip style)                            |
| `.search_btn` / `.clear_btn`            | search button (left) / clear button (right) of a search field    |
| `.multi_value`                          | the visible box of a searchable multiple select                  |
