import { useTilesShowMore } from '../hooks/tiles/tilesShowMore'
import { useTilesSort } from '../hooks/tiles/tilesSort'
import { useSortOption } from '../hooks/useSortOption'
import { IAvailableFavoritesTypes, ITile } from '../types/tmdb.models'

import PageSection from './PageSection'
import Tile from './Tile'
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

  const select =
    tiles.length === 0 ? null : { ...sortOptions, disabled: tiles.length === 1 }

  const markup = (
    <PageSection
      extraClass="m-movies_list"
      title={`${type}s (${tiles.length})`}
      select={select}
      align="start">
      <div className="l-tiles_grid m-movies" id={type}>
        {sortedTiles.map(media => (
          <Tile tile={media} key={media.id} />
        ))}
        {!showAll && (
          <ShowMoreBtn
            currentPage={currentPage}
            pagesQty={pagesQty}
            handleShowMore={handleShowMore}
          />
        )}
      </div>
    </PageSection>
  )

  return markup
}

export default TilesGrid
