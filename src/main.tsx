import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// to make redux works
import { Provider } from 'react-redux'
import { store } from './store/store.ts'

// [x] TODO: select with tiles qty to show for each section
// [x] TODO: small search field instead of icon with hint about shortcut
// [ ] TODO: improve mobile layout
// [ ] TODO: link to Wikipedia for persons (maybe use link preview)
// [ ] TODO: Footer with links to TMDB, GitHub, etc.
// [ ] TODO: animation for tiles when 'show more' clicked | sorting changed
// [ ] TODO: 404 page
// [ ] TODO: dynamic IDs for RandomCollection
// [ ] TODO: store favorites in Firebase for loged in users (but take a look at Supabase)
// [ ] TODO: TorrentSearch only for god_mode users
// [ ] TODO: AI-driven recommendations/search
// [ ] TODO: update README.md\ in the end

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)
