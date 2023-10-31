import { useParams } from 'react-router-dom'

import { getIdFromLink } from '../utils/helpers'

import MediaHero from '../components/MediaHero'
import Spinner from '../components/UI/Spinner'
import Error from '../components/UI/Error'
import TilesGrid from '../components/Layout/TilesGrid'

import {
  useGetPersonMovieCreditsQuery,
  useGetPersonTvCreditsQuery,
} from '../store/api/tmdb.api'
import { useAppSelector } from '../hooks/useRedux'

type PersonParams = {
  id: string
}

const Person: React.FC = () => {
  const params = useParams<PersonParams>()
  const personId = getIdFromLink(params.id!)

  const locale = useAppSelector(state => state.locale.current)
  const {
    data: movieCredits,
    isError: isMovieCreditsError,
    isLoading: isMovieCreditsLoading,
  } = useGetPersonMovieCreditsQuery({ id: personId, locale })

  const {
    data: tvCredits,
    isError: isTvCreditsError,
    isLoading: isTvCreditsLoading,
  } = useGetPersonTvCreditsQuery({ id: personId, locale })

  return (
    <section className="movie-header">
      <MediaHero id={personId} type="person" />
      <div className="l-content container">
        {isMovieCreditsError ? (
          <Error
            error={`Error fetching movie credits for person #${personId}`}
          />
        ) : isMovieCreditsLoading ? (
          <Spinner />
        ) : (
          <TilesGrid
            tiles={movieCredits ? movieCredits : []}
            type="movie"
            hasSort={true}
            defaultSort="year_desc"
            hasQty={true}
          />
        )}
        {isTvCreditsError ? (
          <Error error={`Error fetching tv credits for person #${personId}`} />
        ) : isTvCreditsLoading ? (
          <Spinner />
        ) : (
          <TilesGrid
            tiles={tvCredits ? tvCredits : []}
            type="tv"
            hasSort={true}
            defaultSort="year_desc"
            hasQty={true}
          />
        )}
      </div>
    </section>
  )
}

export default Person
