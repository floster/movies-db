import { FC } from 'react'
import { ITvSeason } from '../../types/tmdb.types'
import AppPicture from '../UI/AppPicture'
import AppProgress from '../UI/AppProgress'
import TvEpisode from './TvEpisode'

interface TvSeasonProps {
  season: ITvSeason
}

export const TvSeason: FC<TvSeasonProps> = ({ season }) => {
  return (
    <section className="tv-season">
      <figure className="tv-season__picture">
        <span className="tv-season__count">{season.season_number}</span>
        <AppPicture img={season.poster} alt={season.title + ' poster'} />
        <AppProgress value={season.votes.average} />
      </figure>
      <div className="tv-season__content">
        <header className="tv-season__header">
          <span className="tv-season__release">{season.released}</span>
          <h3 className="tv-season__title">{season.title}</h3>
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
