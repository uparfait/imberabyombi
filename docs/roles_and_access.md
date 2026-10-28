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
| Cleaner           | Own tasks, attendance                                          |
| Parking officer   | Smart parking                                                  |
| Event coordinator | Events, calendar, reservations                                 |

Every role manages its own tasks and opens Settings (theme, profile).

## Landing page
Each role has a landing page ("Lands on after sign-in"), set on the role or when creating it. People with that role
arrive there after signing in (`landing(role_id)`). The choices only list pages the role can open and follow the access
matrix as it changes: if a page is taken away, the role moves to the first page it can still open.

## Roles & access page
- Create roles, set levels in the matrix, delete roles nobody uses.
- Copy an invite link (`#/login?role=<id>`) that locks the sign-in form to that role.
- The Staff page copies a personal access link (`#/login?role=..&email=..&name=..`) for any person.
- Signing in with a new email adds that person to Staff with the chosen role.

## Using it in code
```js
import { auth, me } from '../auth/index.js';
