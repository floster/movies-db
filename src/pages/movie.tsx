import { useParams } from 'react-router-dom'

import { getIdFromLink } from '../utils/helpers'

import MediaHero from '../components/MediaHero'
import Spinner from '../components/UI/Spinner'
import Error from '../components/UI/Error'
import MovieCrew from '../components/Movie/MovieCrew'
import TilesGrid from '../components/Layout/TilesGrid'

import { useGetMovieCreditsQuery } from '../store/api/tmdb.api'
import { useAppSelector } from '../hooks/useRedux'
import { EMediaTypes } from '../types/tmdb.models'

type MovieParams = {
  id: string
}

const Movie: React.FC = () => {
  const params = useParams<MovieParams>()
  const movieId = getIdFromLink(params.id!)

  const locale = useAppSelector(state => state.locale.current)
  const { data, isError, isLoading } = useGetMovieCreditsQuery({
    id: movieId,
    locale,
  })

  return (
    <section className="movie-header">
      <MediaHero id={movieId} type={EMediaTypes.Movie} />
      {isError ? (
        <Error
          error={`Movie: something went wrong while fetching movie #${movieId} credits`}
        />
      ) : isLoading ? (
        <Spinner />
      ) : (
        <>
          {data?.crew.length !== 0 && <MovieCrew members={data?.crew || []} />}
          <div className="l-content container">
            <TilesGrid
              tiles={data?.cast ? data.cast : []}
              type={EMediaTypes.Person}
              title="actors"
              hasQty={true}
            />
          </div>
        </>
      )}
    </section>
  )
}

export default Movie
