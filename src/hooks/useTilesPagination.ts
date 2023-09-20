import { useCallback, useEffect, useState } from "react";
import { ITileData } from "../types/tmdb.types";
import { getTilesPortion } from "../js/helpers";

const TILES_QTY_TO_SHOW = +import.meta.env.VITE_TILES_QTY_TO_SHOW as number;

/**
 * A custom React hook for paginating an array of tiles.
 * 
 *
 * @returns {{
*   quantity: { tiles: number, pages: number },
*   currentTiles: ITileData[],
*   currentPage: number,
*   handleShowMore: () => void,
*   handlePagination: (tiles: ITileData[]) => void
* }} An object containing the current quantity of tiles and pages, the current page of tiles, and functions for handling pagination and showing more tiles.
*/

interface UseTilesPagination {
    quantity: {
        tiles: number,
        pages: number,
    },
    currentTiles: ITileData[],
    currentPage: number,
    handleShowMore: () => void,
    initPagination: (tiles: ITileData[]) => void
}
export const useTilesPagination = (): UseTilesPagination => {
    const [tiles, setTiles] = useState([] as ITileData[]);
    const [quantity, setQuantity] = useState({ tiles: 0, pages: 0 });
    const [currentTiles, setCurrentTiles] = useState([] as ITileData[]);
    const [currentPage, setCurrentPage] = useState(1);

    const calcQuantity = (tiles: ITileData[]) => ({
        tiles: tiles.length,
        pages: Math.ceil(tiles.length / TILES_QTY_TO_SHOW),
    });

    const initPagination = (tiles: ITileData[]) => {
        setTiles(tiles);
    };

    const handlePagination = useCallback(() => {
        const tilesQty = currentPage * TILES_QTY_TO_SHOW;
        const portion = getTilesPortion(tiles, 0, tilesQty);
        setCurrentTiles(() => portion);
        setQuantity(calcQuantity(tiles))
    }, [currentPage, tiles]);

    useEffect(() => { handlePagination() }, [handlePagination]);

    const handleShowMore = () => {
        if (currentPage >= quantity.pages) return;
        setCurrentPage(current => current + 1);
    }

    return { quantity, currentTiles, currentPage, handleShowMore, initPagination };
}