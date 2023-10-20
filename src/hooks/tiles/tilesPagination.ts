import { useCallback, useEffect, useMemo, useState } from 'react'
import { IAvailableTilesQtyValues, ITile } from '../../types/tmdb.models'

const TILES_QTY_TO_SHOW = +import.meta.env.VITE_TILES_QTY_TO_SHOW as number

interface UseTilesPagination {
  pagesQty: number
  currentTiles: ITile[]
  currentPage: number
  handleShowMore: () => void
}

/**
 * Hook that manages the pagination of tiles.
 * @param {Array} tiles - The array of tiles to make pagination for.
 * @returns {Object} An object containing the current page, current tiles, total number of pages, and a function to load more tiles.
 */
const useTilesPagination = (
  tiles: ITile[] | [],
  qty?: IAvailableTilesQtyValues
): UseTilesPagination => {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentTiles, setCurrentTiles] = useState<ITile[]>([])

  const tilesQty = qty === 'all' ? tiles.length : qty ? +qty : TILES_QTY_TO_SHOW

  // calculate quantity of pages with given qty of tiles
  const pagesQty = useMemo(() => {
    const pages = Math.ceil(tiles.length / tilesQty)
    return pages
  }, [tiles, tilesQty])

  // Updates the current tiles to show based on the current page and the total tiles available.
  useEffect(() => {
    const end = tilesQty * currentPage
    const newTiles = tiles.slice(0, end)
    setCurrentTiles(newTiles)
  }, [currentPage, tiles, tilesQty])

  const handleShowMore = useCallback(() => {
    if (currentPage >= pagesQty) return
    setCurrentPage(current => current + 1)
  }, [currentPage, pagesQty])

  return {
    pagesQty,
    currentTiles,
    currentPage,
    handleShowMore,
  }
}

export default useTilesPagination
