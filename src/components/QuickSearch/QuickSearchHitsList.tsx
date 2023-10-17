import { IAvailableFavoritesTypes, ITile } from "../../types/tmdb.models";
import QuickSearchHit from "./QuickSearchHit";

type QuickSearchHitsListProps = {
  hits: ITile[];
  type: IAvailableFavoritesTypes;
};
const QuickSearchHitsList: React.FC<QuickSearchHitsListProps> = ({
  hits,
  type,
}) => {
  if (hits && hits.length === 0) return null;
  return (
    <>
      <h3 className="quick-search-hits__title">
        {type}s ({hits.length})
      </h3>
      <ul className="quick-search-hits__list">
        {hits.map((hit) => (
          <QuickSearchHit hit={hit as ITile} key={hit.id} />
        ))}
      </ul>
    </>
  );
};

export default QuickSearchHitsList;
