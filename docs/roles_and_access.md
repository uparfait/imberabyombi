# Roles and access (RBAC)

Code: [`src/auth/`](../src/auth/). Each role has a level per module: `0` = no access, `1` = view, `2` = manage
(add, edit, delete). The sidebar, apps grid, Create menu, dashboard widgets, buttons and routes all read `auth.can()`.
