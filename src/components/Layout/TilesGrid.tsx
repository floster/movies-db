import { useTilesShowMore } from '../../hooks/tiles/tilesShowMore'
import { useTilesSort } from '../../hooks/tiles/tilesSort'
import { useSortOption } from '../../hooks/useSortOption'
import { IAvailableFavoritesTypes, ITile } from '../../types/tmdb.models'
import TilesLayout from './TilesLayout'

import PageSection from './PageSection'
import Tile from '../Tile'
import ShowMoreBtn from '../UI/ShowMoreBtn'

interface Props {
  tiles: ITile[] | null
  type: IAvailableFavoritesTypes
  title?: string
  showAll?: boolean
}

/**
 * Renders a section with a list of tiles for a specific type of search result or favorites.
 * Has built-in sorting and show more functionality.
 */
const TilesGrid: React.FC<Props> = ({
  tiles,
  type,
  title,
  showAll = false,
}) => {
  if (!tiles) return null

  const sortOptions = useSortOption()

  const { sortedTiles } = useTilesSort(tiles, sortOptions.currentSortOption)

  // TODO: change behavior - first sort tiles than paginate them
  const { pagesQty, currentPage, currentTiles, handleShowMore } =
    useTilesShowMore(sortedTiles ? sortedTiles : [])

  const select =
    tiles.length === 0 ? null : { ...sortOptions, disabled: tiles.length === 1 }

  const tilesToShow = showAll ? sortedTiles : currentTiles

  const markup = (
    <PageSection
      extraClass="m-movies_list"
      title={`${title ? title : type + 's'} (${tiles.length})`}
      select={select}
      align="start">
      <TilesLayout type={type} id={type}>
        {tilesToShow.map(media => (
          <Tile tile={media} key={media.id} />
        ))}
        {!showAll && (
          <ShowMoreBtn
            currentPage={currentPage}
            pagesQty={pagesQty}
            handleShowMore={handleShowMore}
          />
        )}
      </TilesLayout>
    </PageSection>
  )

  return markup
}

export default TilesGrid
