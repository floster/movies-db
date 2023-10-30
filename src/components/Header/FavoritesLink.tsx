import { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '../../hooks/useRedux'
import SvgIcon from '../UI/SvgIcon'
import { Link } from 'react-router-dom'

const FavoritesLink: React.FC = () => {
  const [qty, setQty] = useState(0)

  // get favorites IDs from redux store
  const { collection, movie, person, tv } = useAppSelector(
    state => state.favorites
  )

  const calcFavoritesQty = useMemo(
    () => collection.length + movie.length + person.length + tv.length,
    [collection, movie, person, tv]
  )

  useEffect(() => setQty(calcFavoritesQty), [calcFavoritesQty])

  return (
    <Link
      className="button m-icon m-open_favorites"
      to="favorites"
      aria-label="go to favorites"
      data-favorites-count={qty}>
      <SvgIcon icon="fire" />
    </Link>
  )
}

export default FavoritesLink
