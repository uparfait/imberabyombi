# Roles and access (RBAC)

Code: [`src/auth/`](../src/auth/). Each role has a level per module: `0` = no access, `1` = view, `2` = manage
(add, edit, delete). The sidebar, apps grid, Create menu, dashboard widgets, buttons and routes all read `auth.can()`.

| Role              | Main access                                                    |
|-------------------|----------------------------------------------------------------|
| Super Admin       | Everything, including roles (locked, cannot be edited)         |
| Administrator     | Manage all operations; view roles                              |
| HR manager        | Staff, employees, attendance                                   |
| Teacher           | Students (registration, bulletins, payments), attendance view  |
| Accountant        | View students, payments and inventory                          |
| Librarian         | Library                                                        |
| Store keeper      | Reservations and inventory                                     |
| Kitchen staff     | Own tasks, attendance, view inventory                          |
