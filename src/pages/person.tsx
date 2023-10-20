import { useParams } from 'react-router-dom'

import { getIdFromLink } from '../utils/helpers'

import MediaHero from '../components/MediaHero'
import PageSection from '../components/Layout/PageSection'
import Spinner from '../components/UI/Spinner'
import Error from '../components/UI/Error'
import Tile from '../components/Tile'
import ShowMoreBtn from '../components/UI/ShowMoreBtn'

import { useSortOption } from '../hooks/useSortOption'
import { useTilesSort } from '../hooks/tiles/tilesSort'
import { useTilesShowMore } from '../hooks/tiles/tilesShowMore'

import {
  useGetPersonMovieCreditsQuery,
  useGetPersonTvCreditsQuery,
} from '../store/api/tmdb.api'
import TilesLayout from '../components/Layout/TilesLayout'

type PersonParams = {
  id: string
}

const Person: React.FC = () => {
  const params = useParams<PersonParams>()
  const personId = getIdFromLink(params.id!)

  const {
    data: movieCredits,
    isError: isMovieCreditsError,
    isLoading: isMovieCreditsLoading,
  } = useGetPersonMovieCreditsQuery(personId)
  const {
    data: tvCredits,
    isError: isTvCreditsError,
    isLoading: isTvCreditsLoading,
  } = useGetPersonTvCreditsQuery(personId)

  const movieCreditsSortOption = useSortOption()
  const tvCreditsSortOption = useSortOption()

  const {
    pagesQty: movieCreditsPagesQty,
    currentPage: currentMovieCreditsPage,
    currentTiles: currentMovieCredits,
    handleShowMore: handleMovieCreditsShowMore,
  } = useTilesShowMore(movieCredits || [])

  const {
    pagesQty: tvCreditsPagesQty,
    currentPage: currentTvCreditsPage,
    currentTiles: currentTvCredits,
    handleShowMore: handleTvCreditsShowMore,
  } = useTilesShowMore(tvCredits || [])

  const { sortedTiles: sortedMovies } = useTilesSort(
    currentMovieCredits,
    movieCreditsSortOption.currentSortOption
  )
  const { sortedTiles: sortedTvs } = useTilesSort(
    currentTvCredits,
    tvCreditsSortOption.currentSortOption
  )

  return (
    <section className="movie-header">
      <MediaHero id={personId} type="person" />
      <div className="l-content container">
        {isMovieCreditsError ? (
          <Error
            error={`Error occured while fetching movie credits for person #${personId}`}
          />
        ) : (
          // TODO: make this section with TilesGrid component
          <PageSection
            title={`${movieCredits?.length} movies`}
            select={{ ...movieCreditsSortOption }}>
            <TilesLayout type="movies">
              {isMovieCreditsLoading ? (
                <Spinner />
              ) : (
                <>
                  {sortedMovies.map(media => (
                    <Tile
                      tile={media}
                      key={`${media.id}_${media.label}`}
                      extraLabel="year"
                    />
                  ))}
                  <ShowMoreBtn
                    currentPage={currentMovieCreditsPage}
                    pagesQty={movieCreditsPagesQty}
                    handleShowMore={handleMovieCreditsShowMore}
                  />
                </>
              )}
            </TilesLayout>
          </PageSection>
        )}
        {isTvCreditsError ? (
          <Error
            error={`Error occured while fetching tv credits for person #${personId}`}
          />
        ) : (
          <PageSection
            title={`${tvCredits?.length} tv shows`}
            select={{ ...tvCreditsSortOption }}>
            <TilesLayout type="movies">
              {isTvCreditsLoading ? (
                <Spinner />
              ) : (
                <>
                  {sortedTvs.map(media => (
                    <Tile
                      tile={media}
                      key={`${media.id}_${media.label}`}
                      extraLabel="year"
                    />
                  ))}
                  <ShowMoreBtn
                    currentPage={currentTvCreditsPage}
                    pagesQty={tvCreditsPagesQty}
                    handleShowMore={handleTvCreditsShowMore}
                  />
                </>
              )}
            </TilesLayout>
          </PageSection>
        )}
      </div>
    </section>
  )
}

export default Person
