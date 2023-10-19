import { useParams } from 'react-router-dom'

import { getIdFromLink } from '../utils/helpers'

import MediaHero from '../components/MediaHero'
import PageSection from '../components/PageSection'
import Spinner from '../components/UI/Spinner'
import Error from '../components/UI/Error'
import Tile from '../components/Tile'
import ShowMoreBtn from '../components/UI/ShowMoreBtn'

import { useSortOption } from '../hooks/useSortOption'
import { useTilesShowMore } from '../hooks/tiles/tilesShowMore'
import { useTilesSort } from '../hooks/tiles/tilesSort'
import { useGetCollectionQuery } from '../store/api/tmdb.api'

type CollectionParams = {
  id: string
}

const Collection: React.FC = () => {
  const params = useParams<CollectionParams>()
  const collectionId = getIdFromLink(params.id!)

  // TODO: improve this flow in future
  // uses to pass unified sort option params through AppSection to AppSelect
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
          <Error
            error={`Error occured while fetching collection #${collectionId} parts`}
          />
        ) : (
          <>
            <PageSection
              extraClass="m-movies_list"
              title={`${tiles?.parts.length} parts`}
              select={{ ...collectionSortOption }}>
              <div className="l-tiles_grid m-movies">
                {isLoading ? (
                  <Spinner />
                ) : (
                  <>
                    {sortedTiles.map(tile => (
                      <Tile tile={tile} key={tile.id} />
                    ))}
                    <ShowMoreBtn
                      currentPage={currentPage}
                      pagesQty={pagesQty}
                      handleShowMore={handleShowMore}
                    />
                  </>
                )}
              </div>
            </PageSection>
          </>
        )}
      </div>
    </>
  )
}

export default Collection
