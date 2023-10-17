import { useTilesShowMore } from "../hooks/tiles/tilesShowMore";
import { useTilesSort } from "../hooks/tiles/tilesSort";
import { useSortOption } from "../hooks/useSortOption";
import { IAvailableFavoritesTypes, ITile } from "../types/tmdb.models";

import AppSection from "./AppSection";
import AppSectionHeader from "./AppSectionHeader";
import AppTile from "./AppTile";
import ShowMoreBtn from "./UI/ShowMoreBtn";

interface ITilesGridProps {
  tiles: ITile[] | null;
  type: IAvailableFavoritesTypes;
}

/**
 * Renders a section with a list of tiles for a specific type of search result or favorites.
 * Has built-in sorting and show more functionality.
 * @param {Object} props - The component props.
 * @param {ITile[] | null} props.tiles - The list of tiles to display.
 * @param {IAvailableFavoritesTypes} props.type - The type of search result.
 * @returns {JSX.Element} The rendered component.
 */
const TilesGrid: React.FC<ITilesGridProps> = ({ tiles, type }) => {
  if (!tiles) return null;

  const { pagesQty, currentPage, currentTiles, handleShowMore } =
    useTilesShowMore(tiles ? tiles : []);

  const sortOptions = useSortOption();

  const { sortedTiles } = useTilesSort(
    currentTiles,
    sortOptions.currentSortOption
  );

  const markup = (
    <AppSection extraClass="m-movies_list">
      <AppSectionHeader
        title={`${type}s (${tiles.length})`}
        alignStart
        hasSelect={tiles.length > 0}
        {...sortOptions}
        selectDisabled={tiles.length <= 1}
      />
      <div className="l-tiles_grid m-movies" id={type}>
        {sortedTiles.map((media) => (
          <AppTile tile={media} key={media.id} />
        ))}
        <ShowMoreBtn
          currentPage={currentPage}
          pagesQty={pagesQty}
          handleShowMore={handleShowMore}
        />
      </div>
    </AppSection>
  );

  return markup;
};

export default TilesGrid;
