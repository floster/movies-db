import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// to make redux works
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

// [x] TODO: select with tiles qty to show for each section
// [x] TODO: small search field instead of icon with hint about shortcut
// [x] TODO: improve mobile layout
// [x] TODO: 404 page
// [ ] TODO: animation for tiles when 'show more' clicked | sorting changed
// [x] TODO: dynamic IDs for RandomCollection
// [ ] TODO: link to Wikipedia for persons (maybe use link preview)
// [x] TODO: store favorites in Firebase for loged in users (but take a look at Supabase)
// [x] TODO: show favorites icon only for logged in users
// [x] TODO: TorrentSearch only for god_mode users
// [ ] TODO: AI-driven recommendations/search
// [ ] TODO: Footer with links to TMDB, GitHub, etc.
// [ ] TODO: update README.md\ in the end

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)
