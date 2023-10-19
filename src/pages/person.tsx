import { useParams } from 'react-router-dom'

import { getIdFromLink } from '../utils/helpers'

import MediaHero from '../components/MediaHero'
import AppSection from '../components/AppSection'
import AppSectionHeader from '../components/AppSectionHeader'
import AppSpinner from '../components/UI/Spinner'
import AppError from '../components/UI/Error'
import AppTile from '../components/Tile'
import ShowMoreBtn from '../components/UI/ShowMoreBtn'

import { useSortOption } from '../hooks/useSortOption'
import { useTilesSort } from '../hooks/tiles/tilesSort'
import { useTilesShowMore } from '../hooks/tiles/tilesShowMore'

import {
  useGetPersonMovieCreditsQuery,
  useGetPersonTvCreditsQuery,
} from '../store/api/tmdb.api'

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
          <AppError
            error={`Error occured while fetching movie credits for person #${personId}`}
          />
        ) : (
          <AppSection>
            <AppSectionHeader
              title={`${movieCredits?.length} movies`}
              hasSelect={true}
              {...movieCreditsSortOption}
            />
            <div className="l-tiles_grid m-movies">
              {isMovieCreditsLoading ? (
                <AppSpinner visible={true} />
              ) : (
                <>
                  {sortedMovies.map(media => (
                    <AppTile
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
            </div>
          </AppSection>
        )}
        {isTvCreditsError ? (
          <AppError
            error={`Error occured while fetching tv credits for person #${personId}`}
          />
        ) : (
          <AppSection>
            <AppSectionHeader
              title={`${tvCredits?.length} tv shows`}
              hasSelect={true}
              {...tvCreditsSortOption}
            />
            <div className="l-tiles_grid m-movies">
              {isTvCreditsLoading ? (
                <AppSpinner visible={true} />
              ) : (
                <>
                  {sortedTvs.map(media => (
                    <AppTile
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
            </div>
          </AppSection>
        )}
      </div>
    </section>
  )
}

export default Person
