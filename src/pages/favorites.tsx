import FavoritesSection from '../components/FavoritesSection';

export default function Favorites() {

  return (
    <>
      <div className="l-content container">
        <FavoritesSection type='collection' />
        <FavoritesSection type='movie' />
        <FavoritesSection type='person' />
        <FavoritesSection type='tv' />
      </div>
    </>
  )
}
