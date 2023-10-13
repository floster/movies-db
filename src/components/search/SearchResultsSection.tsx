import {
  IAvailableTrendingAndSearchAllTypes,
  ISearchResultsMulti,
} from "../../types/tmdb.models";

import AppSection from "../AppSection";
import AppSectionHeader from "../AppSectionHeader";
import AppTile from "../AppTile";

interface ISearchResultsSectionProps {
  data: ISearchResultsMulti;
  type: IAvailableTrendingAndSearchAllTypes;
  sortOptions: {
    [key in IAvailableTrendingAndSearchAllTypes]: {};
  };
}

const SearchResultsSection: React.FC<ISearchResultsSectionProps> = ({
  data,
  type,
  sortOptions,
}) => {
  console.log("data", data);
  console.log("type", type);
  console.log("sortOptions", sortOptions);
  const markup = (
    <AppSection extraClass="m-movies_list">
      <AppSectionHeader
        title={`${type}s (${data[type].length})`}
        alignStart
        hasSelect={true}
        {...sortOptions[type]}
      />
      <div className="l-tiles_grid m-movies">
        {data[type].map((media) => (
          <AppTile tile={media} key={media.id} />
        ))}
        {/* <ShowMoreBtn
                      currentPage={movies.currentPage}
                      pagesQty={movies.qty.pages}
                      handleShowMore={handleShowMore("movies")}
                    /> */}
      </div>
    </AppSection>
  );

  console.log(markup);

  return markup;
};

export default SearchResultsSection;
