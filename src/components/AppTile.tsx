import { FC } from 'react'
import { ITileData, UTFavoritesType } from '../types/tmdb.types'
import AppFavorite from './UI/AppFavorite'
import AppPicture from './UI/AppPicture'
import AppProgress from './UI/AppProgress'
import TorrentSearch from './UI/TorrentSearch'

// import { useFavorites } from "../contexts/FavoritesContext";

interface AppTileProps {
  tile: ITileData
  isRow?: boolean
  extraLabel?: 'year' | 'type'
}

const AppTile: FC<AppTileProps> = ({ tile, isRow = false, extraLabel }) => {
  const classes = ['app-tile']
  if (tile.type) classes.push(`m-${tile.type}`)
  if (isRow) classes.push('m-row')

  // const { isFavoritable } = useFavorites();

  // const hasFavoriteIcon = isFavoritable(tile.type as UTFavoritesType);
  const isLink = !!tile.link
  const isTorrentSearchable =
    (import.meta.env.VITE_TORRENT_SEARCH_ENABLED === 'true' &&
      isLink &&
      tile.type === 'movie') ||
    tile.type === 'tv'

  const tileInner = (
    <>
      <div className="app-tile__picture">
        <AppPicture img={tile.poster} alt={tile.title + ' poster'} />
        {extraLabel && (
          <span className="app-tile__extraLabel">{tile[extraLabel]}</span>
        )}
      </div>

      {true && (
        <AppFavorite
          type={tile.type as UTFavoritesType}
          id={tile.id}
          title={tile.title}
        />
      )}
      <div className="app-tile__content">
        {tile.rating && tile.rating?.average > 0 && !isRow && (
          <AppProgress value={tile.rating.average} />
        )}
        <p className="app-tile__label">{tile.label}</p>
        <h3 className="app-tile__title">{tile.title}</h3>
      </div>
      {tile.rating && isRow && (
        <span className="app-tile__rating">
          {tile.rating.average} / {tile.rating.count}
        </span>
      )}
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
    <article className={classes.join(' ')}>
      {tileWrapper}
      {isTorrentSearchable && <TorrentSearch term={tile.title} />}
    </article>
  )
}

export default AppTile
