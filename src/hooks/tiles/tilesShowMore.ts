import { useCallback, useEffect, useMemo, useState } from "react";
import { ITile } from "../../types/tmdb.models";

const TILES_QTY_TO_SHOW = +import.meta.env.VITE_TILES_QTY_TO_SHOW as number;

interface UseTilesShowMore {
  pagesQty: number;
  currentTiles: ITile[];
  currentPage: number;
  handleShowMore: () => void;
}

/**
 * Hook that manages the pagination of tiles.
 * @param {Array} tiles - The array of tiles to make pagination for.
 * @returns {Object} An object containing the current page, current tiles, total number of pages, and a function to load more tiles.
 */
export const useTilesShowMore = (tiles: ITile[] | []): UseTilesShowMore => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTiles, setCurrentTiles] = useState<ITile[]>([]);

  // calculate quantity of pages with given qty of tiles
  const pagesQty = useMemo(() => {
    const pages = Math.ceil(tiles.length / TILES_QTY_TO_SHOW);
    return pages;
  }, [tiles, TILES_QTY_TO_SHOW]);

  // Updates the current tiles to show based on the current page and the total tiles available.
  useEffect(() => {
    const end = TILES_QTY_TO_SHOW * currentPage;
    const newTiles = tiles.slice(0, end);
    setCurrentTiles(newTiles);
  }, [currentPage, tiles, TILES_QTY_TO_SHOW]);

  const handleShowMore = useCallback(() => {
    if (currentPage >= pagesQty) return;
    setCurrentPage((current) => current + 1);
  }, [currentPage, pagesQty]);

  return {
    pagesQty,
    currentTiles,
    currentPage,
    handleShowMore,
  };
};
