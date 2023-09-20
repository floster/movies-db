import { useCallback, useEffect, useState } from 'react';
import AppSection from '../components/AppSection';
import AppSectionHeader from '../components/AppSectionHeader';
import MediaHero from '../components/MediaHero';
import AppTile from '../components/AppTile';
import { useParams } from 'react-router-dom';
import { ITileData, USortOptionValues } from '../types/tmdb.types';
import AppSpinner from '../components/AppSpinner';
import tmdb from '../js/tmdb-api';
import AppError from '../components/AppError';
import { getIdFromLink } from '../js/helpers';
import { formatTilesData } from '../js/formatters';

import { useTilesSort } from '../hooks/useTilesSort';

type CollectionParams = {
  id: string;
}

export default function Collection() {
  const params = useParams<CollectionParams>();
  const collectionId = getIdFromLink(params.id!);

  const [tiles, setTiles] = useState([] as ITileData[]);
  const [currentSort, setCurrentSort] = useState('year_desc' as USortOptionValues);

  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isDataError, setIsDataError] = useState(false);

  const { sortedTiles } = useTilesSort(tiles, currentSort);

  const onSortChange = (option: string) => setCurrentSort(option as USortOptionValues);

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

  // useEffect(() => sortChanged(), [sortChanged]);

  return (
    <>
      <MediaHero id={collectionId} type='collection' />
      <div className="l-content container">
        {isDataError
          ? <AppError error={`Error occured while fetching collection #${collectionId} parts`} />
          : <>
            <AppSection extraClass='m-movies_list'>
              <AppSectionHeader title={`${sortedTiles.length} parts`} hasSelect={true} currentSortOption={currentSort} onSortChange={onSortChange} />
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
