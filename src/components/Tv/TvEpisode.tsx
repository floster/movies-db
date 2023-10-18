import { FC } from 'react'
import { ITvEpisode } from '../../types/tmdb.types'
import AppPicture from '../UI/AppPicture'

interface TvEpisodeProps {
  episode: ITvEpisode
}

const TvEpisode: FC<TvEpisodeProps> = ({ episode }) => {
  return (
    <div className="tv-episode">
      <span className="tv-episode__count">{episode.episode_number}</span>
      <AppPicture img={episode.poster} alt={episode.title + ' poster'} />
      <div className="tv-episode__content">
        <span className="tv-episode__release">{episode.released}</span>
        <h4 className="tv-episode__title">{episode.title}</h4>
        <p className="tv-episode__overview">{episode.overview}</p>
      </div>
    </div>
  )
}

export default TvEpisode
