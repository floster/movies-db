# Movies DB

TypeScript and React App leverages Redux Toolkit (RTK) and RTK Query to connect to [The Movie DB API](https://developer.themoviedb.org/reference/intro/getting-started).
Here's possibility to search for movies, TV shows, collections, and actors, get detailed information about them.

## Project configuration

- [Vite](https://vitejs.dev/) 4.4.5+
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
- [React 18+](https://react.dev/reference/react) + [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit (RTK)](https://redux-toolkit.js.org/) + [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [React Router 6+](https://reactrouter.com/en/main)
- Prettier + ESLint (install the appropriate plugins for [VSCode](https://code.visualstudio.com/download))

## Project setup

```bash
git clone git@github.com:floster/movies-db.git

cd movies-db

npm i

npm run dev
```

**!!!** it is necessary to create `.env.local`

```
VITE_TMDB_BEARER_KEY = YOUR_API_KEY_HERE
```

_[Get the API key](https://www.themoviedb.org/settings/api)_
