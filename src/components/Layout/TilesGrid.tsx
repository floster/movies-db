import useTilesPagination from '../../hooks/tiles/tilesPagination'
import {
  IAvailableFavoritesTypes,
  IAvailableSortValues,
  IAvailableTilesQtyValues,
  ITile,
} from '../../types/tmdb.models'
import TilesLayout from './TilesLayout'

import PageSection from './PageSection'
import Tile from '../Tile'
import ShowMoreBtn from '../UI/ShowMoreBtn'
import { createContext, useContext, useState } from 'react'
import { SORT_OPTIONS, TILES_QTY_OPTIONS } from '../../config'
import useTilesSort from '../../hooks/tiles/tilesSort'

// Context for sorting
interface ISortContext {
  onSortChange: (option: IAvailableSortValues) => void
  currentSort: IAvailableSortValues
}
const SortContext = createContext<ISortContext>({
  onSortChange: () => {},
  currentSort: SORT_OPTIONS[0].value,
})
export const useSectionSortCtx = () => useContext(SortContext)

interface Props {
  tiles: ITile[] | null
  type: IAvailableFavoritesTypes
  title?: string
  showAll?: boolean
}

// Context for set quantity of tiles per page
interface IQtyContext {
  onQtyChange: (option: IAvailableTilesQtyValues) => void
  currentQty: IAvailableTilesQtyValues
  disabled: boolean
}
const QtyContext = createContext<IQtyContext>({
  onQtyChange: () => {},
  currentQty: TILES_QTY_OPTIONS.find(option => option.default)!.value,
  disabled: false,
})
export const useSectionQtyCtx = () => useContext(QtyContext)

interface Props {
  tiles: ITile[] | null
  type: IAvailableFavoritesTypes
  title?: string
  showAll?: boolean
  hasSort?: boolean
  hasQty?: boolean
}

// [] TODO: hide selectQty if tiles.length < TYLES_QTY
// [] TODO: 'default' sort option -> show 'raw' tiles order
// [] TODO: possibility to set default sort option separately for each section
// clarify for prev:
//   - home -> defult (off)
//   - collection -> year 9-0
//   - movie cast -> default (off)
//   - person -> year 9-0
//   - search -> rating 9-0
//   - favorites -> default (off)

/**
 * Renders a section with a list of tiles for a specific type of search result or favorites.
 * Has built-in sorting and show more functionality.
 */
const TilesGrid: React.FC<Props> = ({
  tiles,
  type,
  title,
  showAll = false,
  hasSort = false,
  hasQty = false,
}) => {
  if (!tiles) return null

  const [currentSort, setCurrentSort] = useState(SORT_OPTIONS[0].value)
  const onSortChange = (option: IAvailableSortValues) => setCurrentSort(option)

  const [currentQty, setCurrentQty] = useState(
    showAll ? 'all' : TILES_QTY_OPTIONS.find(option => option.default)!.value
  )

  const [qtyDisabled, setQtyDisabled] = useState(false)

  const handleShowMoreClick = () => {
    handleShowMore()
    setQtyDisabled(true)
  }

  const onQtyChange = (option: IAvailableTilesQtyValues) =>
    setCurrentQty(option)

  // 1. Sort tiles
  const { sortedTiles } = useTilesSort(tiles, currentSort)

  // 2. ...than paginate them
  const { pagesQty, currentPage, currentTiles, handleShowMore } =
    useTilesPagination(sortedTiles ? sortedTiles : [], currentQty)

  const markup = (
    <SortContext.Provider value={{ onSortChange, currentSort }}>
      <QtyContext.Provider
        value={{ onQtyChange, currentQty, disabled: qtyDisabled }}>
        <PageSection
          extraClass="m-movies_list"
          title={`${title ? title : type + 's'} (${tiles.length})`}
          align="start"
          hasSort={hasSort}
          hasQty={hasQty}>
          <TilesLayout type={type} id={type}>
            {currentTiles.map(media => (
              <Tile tile={media} key={media.id} />
            ))}
            {!showAll && (
              <ShowMoreBtn
                currentPage={currentPage}
                pagesQty={pagesQty}
                handleShowMore={handleShowMoreClick}
              />
            )}
          </TilesLayout>
        </PageSection>
      </QtyContext.Provider>
    </SortContext.Provider>
  )

  return markup
}

export default TilesGrid
