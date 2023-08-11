import { useEffect, useState } from 'react';
import AppSection from '../components/AppSection';
import AppSectionHeader from '../components/AppSectionHeader';
import AppTile from '../components/AppTile';
import { UTmdbMediaType, UTileData } from '../types/tmdb.types';
import AppSpinner from '../components/AppSpinner';
import tmdb from '../js/tmdb-api';
import AppError from '../components/AppError';
import { FAVORITES } from '../js/config';

interface Props {
  type: UTmdbMediaType;
}

export default function FavoritesSection({ type }: Props) {
  const favoritesIds = FAVORITES[type];
  const [favorites, setFavorites] = useState([] as UTileData[]);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [isFavoriteError, setIsFavoriteError] = useState(false);

  function getFavoritesData() {
    favoritesIds.forEach(async (favoriteId) => {
      try {
        setIsFavoriteLoading(true);
        let data: UTileData;
        switch (type) {
          case 'collection':
            data = await tmdb.getCollection(favoriteId);
            break;
          case 'movie':
            data = await tmdb.getMovie(favoriteId);
            break;
          case 'person':
            data = await tmdb.getPerson(favoriteId);
            break;
          case 'tv':
            data = await tmdb.getTvShow(favoriteId);
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
        : isFavoriteLoading
          ? <AppSpinner visible={true} />
          : <>
            <AppSection extraClass='m-movies_list'>
              <AppSectionHeader title={`${favoritesIds.length} ${type}s`} alignStart={true} />
              <div className="l-tiles_grid m-movies">
                {favorites.map((favorite) => <AppTile tile={favorite} key={favorite.id} />)}
              </div>
            </AppSection>
          </>}
    </>
  )
}
