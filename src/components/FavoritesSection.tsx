import { useEffect, useState } from 'react';
import AppSection from '../components/AppSection';
import AppSectionHeader from '../components/AppSectionHeader';
import AppTile from '../components/AppTile';
import { Collection } from '../js/types';
import AppSpinner from '../components/AppSpinner';
import tmdb from '../js/tmdb';
import AppError from '../components/AppError';
import { COLLECTIONS } from '../js/config';

// TODO: make this component universal to get any of
// 1. collections
// 2. movies
// 3. tv shows
// 4. people

export default function FavoritesSection() {
  const collectionsIds = COLLECTIONS;
  const [favorites, setFavorites] = useState([] as Collection[]);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [isFavoriteError, setIsFavoriteError] = useState(false);

  function getCollectionsData() {
    collectionsIds.forEach(async (collectionId) => {
      try {
        setIsFavoriteLoading(true);
        const data = await tmdb.getCollection(collectionId);
        setFavorites(prevCollections => [...prevCollections, data]);
      } catch (error) {
        setIsFavoriteError(true);
        console.error(error);
      } finally {
        setIsFavoriteLoading(false);
      }
    });
  }

  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getCollectionsData, []);

  return (
    <>
      {isFavoriteError
        ? <AppError error={`Error occured while fetching collections`} />
        : isFavoriteLoading
          ? <AppSpinner visible={true} />
          : <>
            <AppSection extraClass='m-movies_list'>
              <AppSectionHeader title={`${collectionsIds.length} collections`} alignStart={true} />
              <div className="l-tiles_grid m-movies">
                {favorites.map((favorite) => <AppTile tile={favorite} key={favorite.id} />)}
              </div>
            </AppSection>
          </>}
    </>
  )
}
