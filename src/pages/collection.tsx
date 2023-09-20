import { useCallback, useEffect, useState } from 'react';
import AppSection from '../components/AppSection';
import AppSectionHeader from '../components/AppSectionHeader';
import MediaHero from '../components/MediaHero';
import AppTile from '../components/AppTile';
import { useParams } from 'react-router-dom';
import { ITileData } from '../types/tmdb.types';
import AppSpinner from '../components/AppSpinner';
import tmdb from '../js/tmdb-api';
import AppError from '../components/AppError';
import { getIdFromLink } from '../js/helpers';
import { formatTilesData } from '../js/formatters';

import { useTilesSort } from '../hooks/useTilesSort';
import { useSortOption } from '../hooks/useSortOption';

type CollectionParams = {
  id: string;
}

export default function Collection() {
  const params = useParams<CollectionParams>();
  const collectionId = getIdFromLink(params.id!);

  const [tiles, setTiles] = useState([] as ITileData[]);

  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isDataError, setIsDataError] = useState(false);

  const collectionSortOption = useSortOption();

  const { sortedTiles } = useTilesSort(tiles, collectionSortOption.currentSortOption);

  const getPartsData = useCallback(async () => {
    try {
      setIsDataLoading(true);
      const data = await tmdb.getCollection(collectionId);
      const formattedTiles = formatTilesData(data.parts, 'movie', 'year', true, true);
      setTiles(formattedTiles);
    } catch (error) {
      setIsDataError(true);
      console.error(error);
    } finally {
      setIsDataLoading(false);
    }
  }, [collectionId]);

  useEffect(() => {
    const fetchData = async () => {
      await (getPartsData as () => Promise<void>)();
    };
    fetchData();
  }, [getPartsData]);

  return (
    <>
      <MediaHero id={collectionId} type='collection' />
      <div className="l-content container">
        {isDataError
          ? <AppError error={`Error occured while fetching collection #${collectionId} parts`} />
          : <>
            <AppSection extraClass='m-movies_list'>
              <AppSectionHeader title={`${sortedTiles.length} parts`} hasSelect={true} {...collectionSortOption} />
              <div className="l-tiles_grid m-movies">
                {isDataLoading
                  ? <AppSpinner visible={true} />
                  : sortedTiles.map((tile) => <AppTile tile={tile} key={tile.id} />)
                }
              </div>
            </AppSection>
          </>}
      </div>
    </>
  )
}
