import { useCallback, useEffect, useState } from "react"
import { ITileData, USortOptionValues } from "../types/tmdb.types"
import { tilesSort } from "../js/helpers"

export const useTilesSort = (tiles: ITileData[], currentSort: USortOptionValues) => {
    const [sortedTiles, setSortedTiles] = useState([] as ITileData[])

    const handleSort = useCallback(() => {
        setSortedTiles(tilesSort(tiles, currentSort))
    }, [tiles, currentSort]);

    useEffect(() => handleSort(), [handleSort]);

    return { sortedTiles };
}