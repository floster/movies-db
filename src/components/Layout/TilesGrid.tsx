import useTilesPagination from '../../hooks/tiles/tilesPagination'
import {
  IAvailableFavoritesTypes,
  IAvailableSortValues,
  ITile,
} from '../../types/tmdb.models'
import TilesLayout from './TilesLayout'

import PageSection from './PageSection'
import Tile from '../Tile'
import ShowMoreBtn from '../UI/ShowMoreBtn'
import { createContext, useContext, useState } from 'react'
import { SORT_OPTIONS } from '../../config'
import useTilesSort from '../../hooks/tiles/tilesSort'

// Context for sorting
interface ISortContext {
  onSortChange: (option: IAvailableSortValues) => void
  currentSort: IAvailableSortValues
}
const SortContext = createContext<ISortContext>({
  onSortChange: () => {},
  currentSort: SORT_OPTIONS.find(option => option.default)!.value,
})
export const useSectionSort = () => useContext(SortContext)

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

  const [currentSort, setCurrentSort] = useState(
    SORT_OPTIONS.find(option => option.default)!.value
  )

  const onSortChange = (option: IAvailableSortValues) => setCurrentSort(option)

  // 1. Sort tiles
  const { sortedTiles } = useTilesSort(tiles, currentSort)

  // 2. ...than paginate them
  const { pagesQty, currentPage, currentTiles, handleShowMore } =
    useTilesPagination(sortedTiles ? sortedTiles : [])

  // 3. ...and finally show all sorted if showAll is true or paginated otherwise
  const tilesToShow = showAll ? sortedTiles : currentTiles

  const markup = (
    <SortContext.Provider value={{ onSortChange, currentSort }}>
      <PageSection
        extraClass="m-movies_list"
        title={`${title ? title : type + 's'} (${tiles.length})`}
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
    </SortContext.Provider>
  )

  return markup
}

export default TilesGrid
