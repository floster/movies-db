import { IAvailableFavoritesTypes, ITile } from "../../types/tmdb.models";
import AppFavorite from "../UI/AppFavorite";
import AppPicture from "../UI/AppPicture";

type QuickSearchHitProps = {
  hit: ITile;
};

const QuickSearchHit: React.FC<QuickSearchHitProps> = ({ hit }) => {
  return (
    <li className="quick-search-hits__item" key={hit.id}>
      <AppPicture img={hit.poster} alt={hit.title} hasLoading={false} />
      <div className="quick-search-hits__content">
        <a href={hit.link!} className="quick-search-hits__link">
          {hit.title}
        </a>
        {hit.year && (
          <span className="quick-search-hits__year">&nbsp;({hit.year})</span>
        )}
      </div>
      <AppFavorite
        id={hit.id}
        title={hit.title}
        type={hit.type as IAvailableFavoritesTypes}
      />
    </li>
  );
};

export default QuickSearchHit;
