import { useCallback, useEffect, useState } from 'react'
import { ITile, ESortValues } from '../../types/tmdb.models'
import { pullTilesWithoutPosterToTheEnd, tilesSort } from '../../utils/helpers'

const useTilesSort = (tiles: ITile[], currentSort: ESortValues) => {
  const [sortedTiles, setSortedTiles] = useState([] as ITile[])

  const handleSort = useCallback(() => {
    const sorted = tilesSort(tiles, currentSort)
    const posterSensitive = pullTilesWithoutPosterToTheEnd(sorted)
    setSortedTiles(posterSensitive)
  }, [tiles, currentSort])

  useEffect(() => handleSort(), [handleSort])

  return { sortedTiles }
}
export default useTilesSort
