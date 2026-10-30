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
