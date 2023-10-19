import { formatDate, getPosterUrl } from '../../utils/helpers'
import { IRawTvEpisode } from '../../types/tmdb.models'
import AppPicture from '../UI/Picture'

interface Props {
  episode: IRawTvEpisode
}

const TvEpisode: React.FC<Props> = ({ episode }) => {
  return (
    <div className="tv-episode">
      <span className="tv-episode__count">{episode.episode_number}</span>
      <AppPicture
        img={getPosterUrl(episode.still_path)}
        alt={episode.name + ' poster'}
      />
      <div className="tv-episode__content">
        <span className="tv-episode__release">
          {formatDate(episode.air_date).full}
        </span>
        <h4 className="tv-episode__title">{episode.name}</h4>
        <p className="tv-episode__overview">{episode.overview}</p>
      </div>
    </div>
  )
}

export default TvEpisode
