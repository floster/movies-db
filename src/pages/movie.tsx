import { useParams } from 'react-router-dom'

import { getIdFromLink } from '../utils/helpers'

import MediaHero from '../components/MediaHero'
import Spinner from '../components/UI/Spinner'
import Error from '../components/UI/Error'
import MovieCrew from '../components/Movie/MovieCrew'
import TilesGrid from '../components/Layout/TilesGrid'

import { useGetMovieCreditsQuery } from '../store/api/tmdb.api'

type MovieParams = {
  id: string
}

const Movie: React.FC = () => {
  const params = useParams<MovieParams>()
  const movieId = getIdFromLink(params.id!)

  const { data, isError, isLoading } = useGetMovieCreditsQuery(movieId)

  return (
    <section className="movie-header">
      <MediaHero id={movieId} type="movie" />
      {isError ? (
        <Error
          error={`Error occured while fetching movie #${movieId} credits`}
        />
      ) : isLoading ? (
        <Spinner />
      ) : (
        <>
          {data?.crew.length !== 0 && <MovieCrew members={data?.crew || []} />}
          <div className="l-content container">
            <TilesGrid
              tiles={data?.cast ? data.cast : []}
              type="person"
              title="actors"
            />
          </div>
        </>
      )}
    </section>
  )
}

export default Movie
