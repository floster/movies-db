import { useParams } from 'react-router-dom'

import { getIdFromLink } from '../utils/helpers'

import MediaHero from '../components/MediaHero'
import PageSection from '../components/PageSection'
import Spinner from '../components/UI/Spinner'
import Error from '../components/UI/Error'
import MovieCrew from '../components/Movie/MovieCrew'
import Tile from '../components/Tile'
import ShowMoreBtn from '../components/UI/ShowMoreBtn'

import { useTilesShowMore } from '../hooks/tiles/tilesShowMore'
import { useGetMovieCreditsQuery } from '../store/api/tmdb.api'

type MovieParams = {
  id: string
}

const Movie: React.FC = () => {
  const params = useParams<MovieParams>()
  const movieId = getIdFromLink(params.id!)

  const { data, isError, isLoading } = useGetMovieCreditsQuery(movieId)

  const {
    pagesQty,
    currentPage: currentCastPage,
    currentTiles: currentCast,
    handleShowMore,
  } = useTilesShowMore(data?.cast ? data.cast : [])

  return (
    <section className="movie-header">
      <MediaHero id={movieId} type="movie" />
      {isError ? (
        <Error
          error={`Error occured while fetching movie #${movieId} credits`}
        />
      ) : (
        <>
          {data?.crew.length !== 0 && (
            <PageSection extraClass="m-movie_crew" title="crew">
              <div className="container">
                {isLoading ? (
                  <Spinner />
                ) : (
                  <MovieCrew members={data?.crew || []} />
                )}
              </div>
            </PageSection>
          )}
          {currentCast.length !== 0 && (
            <div className="l-content container">
              <PageSection title="cast">
                <div className="l-tiles_grid m-people">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      {currentCast.map(tile => (
                        <Tile tile={tile} key={tile.id} />
                      ))}
                      {/* TODO: add 'show all' functionality */}
                      <ShowMoreBtn
                        currentPage={currentCastPage}
                        pagesQty={pagesQty}
                        handleShowMore={handleShowMore}
                      />
                    </>
                  )}
                </div>
              </PageSection>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default Movie
