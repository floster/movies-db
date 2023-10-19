import { useCallback, useEffect, useState } from 'react'
import { ITile, IAvailableSortValues } from '../../types/tmdb.models'
import { pullTilesWithoutPosterToTheEnd, tilesSort } from '../../utils/helpers'

// TODO: add possibility to sort by rating
export const useTilesSort = (
  tiles: ITile[],
  currentSort: IAvailableSortValues
) => {
  const [sortedTiles, setSortedTiles] = useState([] as ITile[])

  const handleSort = useCallback(() => {
    const sorted = tilesSort(tiles, currentSort)
    const posterSensitive = pullTilesWithoutPosterToTheEnd(sorted)
    setSortedTiles(posterSensitive)
  }, [tiles, currentSort])

  useEffect(() => handleSort(), [handleSort])

  return { sortedTiles }
}
