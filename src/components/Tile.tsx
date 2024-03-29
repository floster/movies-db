import { ITile, IAvailableFavoritesTypes } from '../types/tmdb.models'

import AppFavorite from './UI/FavoriteBtn'
import AppPicture from './UI/AppPicture'
import AppProgress from './UI/Rating'
import TorrentSearch from './UI/TorrentSearch'
import { useAppSelector } from '../hooks/useRedux'

interface Props {
  tile: ITile
  isRow?: boolean
  extraLabel?: 'year' | 'type'
  attributes?: {}
}

const Tile: React.FC<Props> = ({
  tile,
  isRow = false,
  extraLabel,
  attributes,
}) => {
  const classes = ['app-tile']
  if (tile.type) classes.push(`m-${tile.type}`)
  if (isRow) classes.push('m-row')

  const isAuthorized = useAppSelector(state => state.account.isAuthorized)
  const isGod = useAppSelector(state => state.account.isGod)

  const isLink = !!tile.link
  const isTorrentSearchable =
    (import.meta.env.VITE_TORRENT_SEARCH_ENABLED === 'true' &&
      isLink &&
      tile.type === 'movie') ||
    tile.type === 'tv'

  const tileInner = (
    <>
      <div className="app-tile__picture">
        <AppPicture
          img={tile.poster.path}
          alt={tile.title + ' poster'}
          isSmall={isRow}
        />
        {extraLabel && (
          <span className="app-tile__extraLabel">{tile[extraLabel]}</span>
        )}
      </div>

      {isAuthorized && (
        <AppFavorite
          type={tile.type as IAvailableFavoritesTypes}
          id={tile.id}
          title={tile.title}
        />
      )}
      <div className="app-tile__content">
        {!!tile.rating && tile.rating > 0 && !isRow && (
          <AppProgress value={tile.rating} />
        )}
        <p className="app-tile__label">{tile.label}</p>
        <h3 className="app-tile__title">{tile.title}</h3>
      </div>
    </>
  )

  const tileWrapper = isLink ? (
    <a href={tile.link!} className="app-tile__inner">
      {tileInner}
    </a>
  ) : (
    <div className="app-tile__inner">{tileInner}</div>
  )

  return (
    <article className={classes.join(' ')} data-id={tile.id} {...attributes}>
      {tileWrapper}
      {isAuthorized && isGod && isTorrentSearchable && (
        <TorrentSearch term={tile.title} />
      )}
    </article>
  )
}

export default Tile
