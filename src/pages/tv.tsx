import { useParams } from 'react-router-dom'

import { useGetTvEpisodesQuery } from '../store/api/tmdb.api'
import { getIdFromLink } from '../utils/helpers'

import AppSection from '../components/AppSection'
import AppSectionHeader from '../components/AppSectionHeader'
import TvSeason from '../components/Tv/TvSeason'
import Spinner from '../components/UI/Spinner'
import Error from '../components/UI/Error'
import MediaHero from '../components/MediaHero'

type TvParams = {
  id: string
}

const Tv: React.FC = () => {
  const params = useParams<TvParams>()
  const tvId = getIdFromLink(params.id!)

  const { data, isError, isLoading } = useGetTvEpisodesQuery(tvId)

  return (
    <section className="movie-header">
      <MediaHero id={tvId} type="tv" />
      <>
        {isError ? (
          <Error
            error={`Error fetching episodes data for tv series #${tvId}`}
          />
        ) : (
          <div className="l-content container">
            {!data || isLoading ? (
              <Spinner />
            ) : (
              <AppSection>
                <AppSectionHeader title={`${data.length} seasons`} alignStart />
                <div className="l-seasons">
                  {data.map(season => (
                    <TvSeason season={season} key={season.id} />
                  ))}
                </div>
              </AppSection>
            )}
          </div>
        )}
      </>
      )
    </section>
  )
}

export default Tv
