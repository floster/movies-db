import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Movie from './pages/movie'
import Person from './pages/person'
import Collection from './pages/collection'
import Layout from './components/Layout'
import NoMatch from './pages/404'
import Favorites from './pages/favorites'
import Tv from './pages/tv'
import Search from './pages/search';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="person/:id" element={<Person />} />
          <Route path="tv/:id" element={<Tv />} />
          <Route path="collection/:id" element={<Collection />} />
          <Route path="favorites/" element={<Favorites />} />
          <Route path="favorites/" element={<Favorites />} />
          <Route path="search/" element={<Search />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes >
    </BrowserRouter>
  )
}
