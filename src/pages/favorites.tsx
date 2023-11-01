import { useDocumentTitle } from 'usehooks-ts'

import { useAppSelector } from '../hooks/useRedux'

import { EMediaTypes, IAvailableFavoritesTypes } from '../types/tmdb.models'
import FavoritesGrid from '../components/Favorites/FavoritesGrid'

const AVAILABLE_FAVORITES_TYPES: IAvailableFavoritesTypes[] = [
  EMediaTypes.Collection,
  EMediaTypes.Movie,
  EMediaTypes.Tv,
  EMediaTypes.Person,
]

const Favorites: React.FC = () => {
  useDocumentTitle('favorites - Movies DB')

  // get favorites IDs from redux store
  const favorites = useAppSelector(state => state.favorites)

  return (
    <div className="l-content container">
      {AVAILABLE_FAVORITES_TYPES.map(type => {
        if (favorites[type].length > 0)
          return <FavoritesGrid ids={favorites[type]} type={type} key={type} />
        else return null
      })}
    </div>
  )
}

export default Favorites
