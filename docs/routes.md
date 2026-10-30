# Routes

Every page has its own address: `/path?key=value`. The router ([`src/router/`](../src/router/)) reads `location.pathname`
(after the base path, see below) and `location.search`, and moves between pages with the browser History API.

| Area    | Routes                                                                                          |
|---------|-------------------------------------------------------------------------------------------------|
