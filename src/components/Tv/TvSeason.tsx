import AppPicture from '../UI/AppPicture'
import AppProgress from '../UI/AppProgress'
import TvEpisode from './TvEpisode'
import { IRawTvSeasonResponse } from '../../types/tmdb.models'
import { formatDate, getPosterUrl } from '../../utils/helpers'

interface TvSeasonProps {
  season: IRawTvSeasonResponse
}

export const TvSeason: React.FC<TvSeasonProps> = ({ season }) => {
  return (
    <section className="tv-season">
      <figure className="tv-season__picture">
        <span className="tv-season__count">{season.season_number}</span>
        <AppPicture
          img={getPosterUrl(season.poster_path)}
          alt={season.name + ' poster'}
        />
        <AppProgress value={season.vote_average} />
      </figure>
      <div className="tv-season__content">
        <header className="tv-season__header">
          <span className="tv-season__release">
            {formatDate(season.air_date).full}
          </span>
          <h3 className="tv-season__title">{season.name}</h3>
          <p className="tv-season__overview">{season.overview}</p>
        </header>
        <div className="tv-season__episodes">
          {season.episodes?.map(episode => (
            <TvEpisode episode={episode} key={episode.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TvSeason
