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
import { formatTilesData, getIdFromLink } from '../js/helpers';

type CollectionParams = {
  id: string;
}

export default function Collection() {
  const params = useParams<CollectionParams>();
  const collectionId = getIdFromLink(params.id!);

  const [tiles, setTiles] = useState([] as ITileData[]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isDataError, setIsDataError] = useState(false);
  const [currentSort, setCurrentSort] = useState('year_asc' as USortOptionValues);

  const onSortChange = (option: USortOptionValues) => setCurrentSort(option);

  const getPartsData = useCallback(async () => {
    try {
      const data = await tmdb.getCollection(collectionId);
      setTiles(formatTilesData(data.parts, 'movie', 'year', true, true))
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
          : isDataLoading
            ? <AppSpinner visible={true} />
            : <>
              <AppSection extraClass='m-movies_list'>
                <AppSectionHeader title={`${tiles.length} parts`} hasSelect={true} currentSortOption={currentSort} onSortChange={onSortChange} />
                <div className="l-tiles_grid m-movies">
                  {tiles.map((tile) => <AppTile tile={tile} key={tile.id} />)}
                </div>
              </AppSection>
            </>}
      </div>
    </>
  )
}
