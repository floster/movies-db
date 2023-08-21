import { useEffect, useState } from 'react';
import AppSection from '../components/AppSection';
import AppSectionHeader from '../components/AppSectionHeader';
import AppTile from '../components/AppTile';
import { ICollection, IMovie, IPerson, ITileData, ITv, UTileData } from '../types/tmdb.types';
import AppSpinner from '../components/AppSpinner';
import tmdb from '../js/tmdb-api';
import AppError from '../components/AppError';
import { FAVORITES } from '../js/config';
import { formatTileData } from '../js/formaters';

interface Props {
  type: 'collection' | 'tv' | 'movie' | 'person' | 'season';
}

export default function FavoritesSection({ type }: Props) {
  const favoritesIds = FAVORITES[type];
  const [favorites, setFavorites] = useState([] as ITileData[]);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [isFavoriteError, setIsFavoriteError] = useState(false);

  function getFavoritesData() {
    favoritesIds.forEach(async (favoriteId) => {
      try {
        setIsFavoriteLoading(true);
        let data = {} as ITileData;
        let rawData = {} as UTileData;
        switch (type) {
          case 'collection':
            rawData = await tmdb.getCollection(favoriteId);
            data = formatTileData((rawData as ICollection), type, ['partsCount', 'parts'], true, true);
            break;
          case 'movie':
            rawData = await tmdb.getMovie(favoriteId);
            data = formatTileData((rawData as IMovie), type, 'year', true, true);
            break;
          case 'person':
            rawData = await tmdb.getPerson(favoriteId);
            data = formatTileData((rawData as IPerson), type, 'department', true, true);
            break;
          case 'tv':
            rawData = await tmdb.getTvShow(favoriteId);
            data = formatTileData((rawData as ITv), type, ['seasons_qty', 'seasons'], true, true);
            break;
          default:
            setIsFavoriteError(true);
        }

        setFavorites(prevFavorites => [...prevFavorites, data]);
      } catch (error) {
        setIsFavoriteError(true);
        console.error(error);
      } finally {
        setIsFavoriteLoading(false);
      }
    });
  }

  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getFavoritesData, []);

  return (
    <>
      {isFavoriteError
        ? <AppError error={`Error occured while fetching data for a favorite ${type}`} />
        : <>
          <AppSection extraClass='m-movies_list'>
            <AppSectionHeader title={`${favoritesIds.length} ${type}s`} alignStart={true} />
            <div className="l-tiles_grid m-movies">
              {isFavoriteLoading
                ? <AppSpinner visible={true} />
                : favorites.map((favorite) => <AppTile tile={favorite} key={favorite.id} />)
              }
            </div>
          </AppSection>
        </>}
    </>
  )
}
