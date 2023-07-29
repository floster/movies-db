import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Movie from './pages/movie'
import Collection from './pages/collection'
import Layout from './components/Layout'
import NoMatch from './pages/404'

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="collection/:id" element={<Collection />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes >
    </BrowserRouter>
  )
}
