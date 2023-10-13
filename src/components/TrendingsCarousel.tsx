import AppError from "./UI/AppError";
import AppTile from "./AppTile";
import AppSpinner from "./UI/AppSpinner";

import { useGetTrendingsQuery } from "../store/tmdb/tmdb.api";
import { IAvailableTrendingAndSearchAllTypes } from "../types/tmdb.models";

interface Props {
  itemsType: IAvailableTrendingAndSearchAllTypes;
}

export default function TrendingsCarousel({ itemsType }: Props) {
  const { data, isError, isLoading } = useGetTrendingsQuery(itemsType);

  if (!data && !isLoading) return null;

  return isError ? (
    <AppError error={`Error occured while fetching trending ${itemsType}s`} />
  ) : (
    <div className="app-carousel has-scroll">
      {isLoading ? (
        <AppSpinner visible={true} />
      ) : (
        <div className="app-carousel__track">
          {data.map((item) => (
            <AppTile tile={item} key={item.id} />
          ))}
        </div>
      )}
    </div>
  );
}
