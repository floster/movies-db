import { useParams } from 'react-router-dom'

import { getIdFromLink } from '../utils/helpers'

import MediaHero from '../components/MediaHero'
import AppSection from '../components/AppSection'
import AppSectionHeader from '../components/AppSectionHeader'
import AppSpinner from '../components/UI/AppSpinner'
import AppError from '../components/UI/AppError'
import AppTile from '../components/AppTile'
import ShowMoreBtn from '../components/UI/ShowMoreBtn'

import { useSortOption } from '../hooks/useSortOption'
import { useTilesShowMore } from '../hooks/tiles/tilesShowMore'
import { useTilesSort } from '../hooks/tiles/tilesSort'
import { useGetCollectionQuery } from '../store/api/tmdb.api'

type CollectionParams = {
  id: string
}

export default function Collection() {
  const params = useParams<CollectionParams>()
  const collectionId = getIdFromLink(params.id!)

  // TODO: improve this flow in future
  // uses to pass unified sort option params through AppSectionHeader to AppSelect
  const collectionSortOption = useSortOption()

  const {
    data: tiles,
    isError,
    isLoading,
  } = useGetCollectionQuery(collectionId)

  const { pagesQty, currentPage, currentTiles, handleShowMore } =
    useTilesShowMore(tiles?.parts ? tiles.parts : [])

  const { sortedTiles } = useTilesSort(
    currentTiles,
    collectionSortOption.currentSortOption
  )

  return (
    <>
      <MediaHero id={collectionId} type="collection" />
      <div className="l-content container">
        {isError ? (
          <AppError
            error={`Error occured while fetching collection #${collectionId} parts`}
          />
        ) : (
          <>
            <AppSection extraClass="m-movies_list">
              <AppSectionHeader
                title={`${tiles?.parts.length} parts`}
                hasSelect={true}
                {...collectionSortOption}
              />
              <div className="l-tiles_grid m-movies">
                {isLoading ? (
                  <AppSpinner visible={true} />
                ) : (
                  <>
                    {sortedTiles.map(tile => (
                      <AppTile tile={tile} key={tile.id} />
                    ))}
                    <ShowMoreBtn
                      currentPage={currentPage}
                      pagesQty={pagesQty}
                      handleShowMore={handleShowMore}
                    />
                  </>
                )}
              </div>
            </AppSection>
          </>
        )}
      </div>
    </>
  )
}
