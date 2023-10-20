import Picture from './UI/Picture'
import Error from './UI/Error'
import Spinner from './UI/Spinner'
import Favorite from './UI/FavoriteBtn'
import Rating from './UI/Rating'
import MoviePartOf from './Movie/MoviePartOf'
import TorrentSearch from './UI/TorrentSearch'

import { FC } from 'react'

import { useDocumentTitle } from 'usehooks-ts'
import { useGetMediaHeroQuery } from '../store/api/tmdb.api'
import { IAvailableMediaHeroTypes } from '../types/tmdb.models'
import IconLabeled from './UI/IconLabeled'

interface MediaHeroProps {
  id: number
  type: IAvailableMediaHeroTypes
  withLink?: boolean
}

const MediaHero: FC<MediaHeroProps> = ({ type, id, withLink = false }) => {
  const { data, isError, isLoading } = useGetMediaHeroQuery({
    type,
    id,
  })

  const title = isLoading
    ? 'loading...'
    : withLink // FIXME: search for a better way to do this
    ? 'Movies DB'
    : data?.title
    ? `${data.title} - Movies DB`
    : `${type} - Movies DB`
  useDocumentTitle(title)

  if (isError)
    return (
      <Error
        error={`MediaHero: Error occured while fetching hero data for the ${type} #${id}`}
      />
    )

  if (!data && !isLoading) return null

  // TODO: #tags make below works
  // const renderTags = () => {
  //   const tags = data.tags?.map((genre: IGenre) => (
  //     <li key={genre.id}>{genre.name}</li>
  //   ));
  //   return <ul className="media-hero__tags">{tags}</ul>;
  // };

  return isLoading ? (
    <Spinner />
  ) : (
    <div
      className="media-hero"
      style={{ '--backdrop-image': data.backdrop } as React.CSSProperties}>
      <div className="media-hero__inner container">
        <div className="media-hero__picture">
          <Picture img={data.poster} alt={data.title} />
          {data.rating && <Rating value={data.rating} />}
        </div>
        <div className="media-hero__content">
          {withLink && data.link ? (
            <a href={data.link} className="media-hero__link">
              {data.title}
            </a>
          ) : (
            <h2 className="media-hero__title">{data.title}</h2>
          )}

          {/* {hasGenres && renderTags()} */}
          {data.subtitle && (
            <p className="media-hero__subtitle">{data.subtitle}</p>
          )}

          {data.tags && <p className="media-hero__tags">{data.tags}</p>}

          <p className="media-hero__description">{data.description}</p>
        </div>
        <footer className="media-hero__footer">
          <Favorite type={type} id={id} title={data.title} />

          {data.date && data.date !== '' && (
            <IconLabeled icon="calendar" label={data.date} />
          )}

          {data.partsSeasons && (
            <IconLabeled icon="stack" label={data.partsSeasons} />
          )}

          {data.torrent && <TorrentSearch term={data.title} />}

          {data.belongs && <MoviePartOf data={data.belongs} />}
        </footer>
      </div>
    </div>
  )
}

export default MediaHero
