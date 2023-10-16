import useGetTilesData from "../../hooks/tmdb/getTilesData";
import { IAvailableFavoritesTypes } from "../../types/tmdb.models";
import TilesGrid from "../TilesGrid";
import AppError from "../UI/AppError";
import AppSpinner from "../UI/AppSpinner";

type Props = {
  ids: number[];
  type: IAvailableFavoritesTypes;
};

const FavoritesGrid: React.FC<Props> = ({ ids, type }) => {
  const { tiles, isError, isLoading } = useGetTilesData(type, ids);

  return isError ? (
    <AppError error={`Error occured while getting #${type}s favorites data`} />
  ) : isLoading ? (
    <AppSpinner visible={true} />
  ) : (
    <TilesGrid tiles={tiles} type={type} />
  );
};

export default FavoritesGrid;
