/* router/render_route.jsx: what the reference's render() put into #app. It parses the hash into the store's route, then draws
   the admin page, an account page or a public page (or the error page when a view fails). A new page is a fresh tree (keyed),
