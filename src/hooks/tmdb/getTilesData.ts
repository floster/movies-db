import { useEffect, useState } from 'react'
import { useLazyGetMediaTileQuery } from '../../store/api/tmdb.api'
import { ITile } from '../../types/tmdb.models'
import { IAvailableFavoritesTypes } from '../../types/tmdb.models'
import { useAppSelector } from '../useRedux'

/**
 * A custom hook that fetches and returns a bunch of tiles by its type and given IDs.
 * @returns {{ tiles: ITile[], isError: boolean, isLoading: boolean }} An object containing the list of movie tiles, an error flag, and a loading flag.
 */
const useGetTilesData = (type: IAvailableFavoritesTypes, ids: number[]) => {
  const [tiles, setTiles] = useState<ITile[] | []>([])

  const locale = useAppSelector(state => state.locale.current)
  const [getTile, { isError, isLoading }] = useLazyGetMediaTileQuery()

  // go through ids and get its data, for that:
  useEffect(() => {
    const getTiles = async () => {
      // 3. waiting for all promises (one promise = one media) to resolve
      const tilesPromises = await Promise.all(
        // 1. went through IDs
        ids.map(async id => {
          // 2. return a promise for each media to get the data
          const { data } = await getTile({ type, id, locale })
          return data
        })
      )
      // 5. set the tiles
      setTiles(
        // 4. filter out undefined values
        tilesPromises.filter((tile): tile is ITile => tile !== undefined)
      )
    }
    getTiles()
  }, [ids, type, getTile])

  return { tiles, isError, isLoading }
}

export default useGetTilesData
