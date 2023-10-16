import { useTilesShowMore } from "../../hooks/tiles/tilesShowMore";
import { useTilesSort } from "../../hooks/tiles/tilesSort";
import { useSortOption } from "../../hooks/useSortOption";
import { IAvailableSearchAllTypes, ITile } from "../../types/tmdb.models";

import AppSection from "../AppSection";
import AppSectionHeader from "../AppSectionHeader";
import AppTile from "../AppTile";
import ShowMoreBtn from "../UI/ShowMoreBtn";

interface ISearchResultsSectionProps {
  tiles: ITile[] | null;
  type: IAvailableSearchAllTypes;
}

const SearchResultsSection: React.FC<ISearchResultsSectionProps> = ({
  tiles,
  type,
}) => {
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
        hasSelect={true}
        {...sortOptions}
        selectDisabled={tiles.length <= 1}
      />
      <div className="l-tiles_grid m-movies">
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

export default SearchResultsSection;
