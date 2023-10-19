import { useTilesShowMore } from '../hooks/tiles/tilesShowMore'
import { useTilesSort } from '../hooks/tiles/tilesSort'
import { useSortOption } from '../hooks/useSortOption'
import { IAvailableFavoritesTypes, ITile } from '../types/tmdb.models'

import AppSection from './AppSection'
import AppSectionHeader from './AppSectionHeader'
import AppTile from './Tile'
import ShowMoreBtn from './UI/ShowMoreBtn'

interface Props {
  tiles: ITile[] | null
  type: IAvailableFavoritesTypes
  showAll?: boolean
}

/**
 * Renders a section with a list of tiles for a specific type of search result or favorites.
 * Has built-in sorting and show more functionality.
 */
const TilesGrid: React.FC<Props> = ({ tiles, type, showAll = false }) => {
  if (!tiles) return null

  // TODO: change behavior - first sort tiles than paginate them
  const { pagesQty, currentPage, currentTiles, handleShowMore } =
    useTilesShowMore(tiles ? tiles : [])

  const sortOptions = useSortOption()

  const { sortedTiles } = useTilesSort(
    showAll ? tiles : currentTiles,
    sortOptions.currentSortOption
  )

  const markup = (
    <AppSection extraClass="m-movies_list">
      <AppSectionHeader
        title={`${type}s (${tiles.length})`}
        alignStart
        hasSelect={tiles.length > 0}
        {...sortOptions}
        selectDisabled={tiles.length <= 1}
      />
      <div className="l-tiles_grid m-movies" id={type}>
        {sortedTiles.map(media => (
          <AppTile tile={media} key={media.id} />
        ))}
        {!showAll && (
          <ShowMoreBtn
            currentPage={currentPage}
            pagesQty={pagesQty}
            handleShowMore={handleShowMore}
          />
        )}
      </div>
    </AppSection>
  )

  return markup
}

export default TilesGrid
