import { useParams } from 'react-router-dom'

import { useGetTvEpisodesQuery } from '../store/api/tmdb.api'
import { getIdFromLink } from '../utils/helpers'

import PageSection from '../components/Layout/PageSection'
import TvSeason from '../components/Tv/TvSeason'
import Spinner from '../components/UI/Spinner'
import Error from '../components/UI/Error'
import MediaHero from '../components/MediaHero'
import TilesLayout from '../components/Layout/TilesLayout'
import { useAppSelector } from '../hooks/useRedux'
import { EMediaTypes } from '../types/tmdb.models'

type TvParams = {
  id: string
}

const Tv: React.FC = () => {
  const params = useParams<TvParams>()
  const tvId = getIdFromLink(params.id!)

  const locale = useAppSelector(state => state.locale.current)
  const { data, isError, isLoading } = useGetTvEpisodesQuery({
    id: tvId,
    locale,
  })

  return (
    <section className="movie-header">
      <MediaHero id={tvId} type={EMediaTypes.Tv} />
      <>
        {isError ? (
          <Error
            error={`Error fetching episodes data for tv series #${tvId}`}
          />
        ) : (
          <div className="l-content m-tv_seasons container">
            {!data || isLoading ? (
              <Spinner />
            ) : (
              <PageSection title={`${data.length} seasons`} align="start">
                <TilesLayout type={EMediaTypes.Tv}>
                  {data.map(season => (
                    <TvSeason season={season} key={season.id} />
                  ))}
                </TilesLayout>
              </PageSection>
            )}
          </div>
        )}
      </>
      )
    </section>
  )
}

export default Tv
