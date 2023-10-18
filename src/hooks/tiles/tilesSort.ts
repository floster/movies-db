import { useCallback, useEffect, useState } from 'react'
import { ITileData, UTSortValues } from '../../types/tmdb.types'
import { pullTilesWithoutPosterToTheEnd, tilesSort } from '../../utils/helpers'

export const useTilesSort = (tiles: ITileData[], currentSort: UTSortValues) => {
  const [sortedTiles, setSortedTiles] = useState([] as ITileData[])

  const handleSort = useCallback(() => {
    const sorted = tilesSort(tiles, currentSort)
    const posterSensitive = pullTilesWithoutPosterToTheEnd(sorted)
    setSortedTiles(posterSensitive)
  }, [tiles, currentSort])

  useEffect(() => handleSort(), [handleSort])

  return { sortedTiles }
}
