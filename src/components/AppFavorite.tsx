import { useEffect, useState } from "react";
import SvgIcon from "./SvgIcon";

import { useFavorites } from "../contexts/FavoritesContext";
import { UTFavoritesType } from "../types/tmdb.types";

interface Props {
  type: UTFavoritesType;
  id: number;
  title: string;
}

export default function AppFavorite({ type, id, title }: Props) {
  const { isAlreadyFavorite, toggleFavorite, favoritesQty } = useFavorites();

  const [checkedState, setCheckedState] = useState(() =>
    isAlreadyFavorite(type, id),
  );

  useEffect(() => setCheckedState(isAlreadyFavorite(type, id)), [favoritesQty]);

  const handleChange = () => {
    setCheckedState((prev) => !prev);
    toggleFavorite(type, id);
  };

  return (
    <>
      <label className="app-favorite" aria-label={`add ${title} to favorites`}>
        <input
          type="checkbox"
          name="toggleFavoriteCheckbox"
          checked={checkedState}
          onChange={handleChange}
        />
        <SvgIcon icon="fire" extraClass="m-outline" />
        <SvgIcon icon="fire_solid" extraClass="m-solid" />
      </label>
    </>
  );
}
