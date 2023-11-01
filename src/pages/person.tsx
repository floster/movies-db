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
import { EMediaTypes, ESortValues } from '../types/tmdb.models'

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
      <MediaHero id={personId} type={EMediaTypes.Person} />
      <div className="l-content container">
        {isMovieCreditsError ? (
          <Error
            error={`Person: something went wrong while fetching movie credits for person #${personId}`}
          />
        ) : isMovieCreditsLoading ? (
          <Spinner />
        ) : (
          <TilesGrid
            tiles={movieCredits ? movieCredits : []}
            type={EMediaTypes.Movie}
            hasSort={true}
            defaultSort={ESortValues.YearDesc}
            hasQty={true}
          />
        )}
        {isTvCreditsError ? (
          <Error
            error={`Person: something went wrong while fetching tv credits for person #${personId}`}
          />
        ) : isTvCreditsLoading ? (
          <Spinner />
        ) : (
          <TilesGrid
            tiles={tvCredits ? tvCredits : []}
            type={EMediaTypes.Tv}
            hasSort={true}
            defaultSort={ESortValues.YearDesc}
            hasQty={true}
          />
        )}
      </div>
    </section>
  )
}

export default Person
