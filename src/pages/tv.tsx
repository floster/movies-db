import AppSection from '../components/AppSection'
import AppSectionHeader from '../components/AppSectionHeader'
import TvSeason from '../components/Tv/TvSeason'
import { useParams } from 'react-router-dom'
import AppSpinner from '../components/UI/AppSpinner'
import AppError from '../components/UI/AppError'
import { getIdFromLink } from '../utils/helpers'
import MediaHero from '../components/MediaHero'
import { useGetTvEpisodesQuery } from '../store/api/tmdb.api'

type TvParams = {
  id: string
}

export default function Tv() {
  const params = useParams<TvParams>()
  const tvId = getIdFromLink(params.id!)

  const { data, isError, isLoading } = useGetTvEpisodesQuery(tvId)

  return (
    <section className="movie-header">
      <MediaHero id={tvId} type="tv" />
      <>
        {isError ? (
          <AppError
            error={`Error fetching episodes data for tv series #${tvId}`}
          />
        ) : (
          <div className="l-content container">
            {!data || isLoading ? (
              <AppSpinner visible={true} />
            ) : (
              <AppSection>
                <AppSectionHeader
                  title={`${data.length} seasons`}
                  alignStart={true}
                />
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
