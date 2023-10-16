import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/useRedux";
import SvgIcon from "../UI/SvgIcon";
import { Link } from "react-router-dom";

const FavoritesLink: React.FC = () => {
  const [qty, setQty] = useState(0);

  // get favorites IDs from redux store
  const { collection, movie, person, tv } = useAppSelector(
    (state) => state.favorites
  );

  const calcFavoritesQty = () =>
    collection.length + movie.length + person.length + tv.length;

  useEffect(() => setQty(calcFavoritesQty()), [collection, movie, person, tv]);

  return (
    <Link
      className="app-button m-open-favorites has-items m-icon m-primary"
      to="favorites"
      aria-label="go to favorites"
      data-favorites-count={qty}
    >
      <SvgIcon icon="fire" />
    </Link>
  );
};

export default FavoritesLink;
