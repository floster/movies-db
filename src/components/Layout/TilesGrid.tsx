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
import BtnShowMore from '../UI/BtnShowMore'
import { createContext, useContext, useState } from 'react'
import { SORT_OPTIONS, TILES_QTY_OPTIONS } from '../../config'
import useTilesSort from '../../hooks/tiles/tilesSort'

// Context for sorting
interface ISortContext {
  onSortChange: (option: IAvailableSortValues) => void
  currentSort: IAvailableSortValues
  disabled: boolean
}
const SortContext = createContext<ISortContext>({
  onSortChange: () => {},
  currentSort: SORT_OPTIONS[0].value,
  disabled: false,
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
  defaultSort?: IAvailableSortValues
  hasQty?: boolean
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
  hasSort = false,
  defaultSort = SORT_OPTIONS[0].value,
  hasQty = false,
}) => {
  if (!tiles) return null

  const [currentSort, setCurrentSort] = useState(defaultSort)
  const onSortChange = (option: IAvailableSortValues) => setCurrentSort(option)

  const [currentQty, setCurrentQty] = useState(
    showAll ? 'all' : TILES_QTY_OPTIONS.find(option => option.default)!.value
  )

  const [qtyDisabled, setQtyDisabled] = useState(
    tiles.length <= +TILES_QTY_OPTIONS[0].value
  )

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
    <SortContext.Provider
      value={{ onSortChange, currentSort, disabled: tiles.length <= 1 }}>
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
              <BtnShowMore
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
