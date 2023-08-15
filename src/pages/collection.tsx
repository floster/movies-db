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
import { getIdFromLink, tilesSort } from '../js/helpers';
import { formatTilesData } from '../js/formaters';

type CollectionParams = {
  id: string;
}

export default function Collection() {
  const params = useParams<CollectionParams>();
  const collectionId = getIdFromLink(params.id!);

  const [tiles, setTiles] = useState([] as ITileData[]);
  const [sortedTiles, setSortedTiles] = useState([] as ITileData[]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isDataError, setIsDataError] = useState(false);
  const [currentSort, setCurrentSort] = useState('year_desc' as USortOptionValues);

  const onSortChange = (option: USortOptionValues) => setCurrentSort(option);

  const sortChanged = useCallback(() => setSortedTiles(tilesSort(tiles, currentSort)), [tiles, currentSort]);

  const getPartsData = useCallback(async () => {
    try {
      const data = await tmdb.getCollection(collectionId);
      const formattedTiles = formatTilesData(data.parts, 'movie', 'year', true, true);
      setTiles(formattedTiles);
      const sortedTiles = tilesSort(formattedTiles, currentSort);
      setSortedTiles(sortedTiles);
    } catch (error) {
      setIsDataError(true);
      console.error(error);
    } finally {
      setIsDataLoading(false);
    }
  }, [collectionId, currentSort]);

  useEffect(() => {
    const fetchData = async () => {
      await (getPartsData as () => Promise<void>)();
    };
    fetchData();
    sortChanged();
  }, [getPartsData, sortChanged]);

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
                  {sortedTiles.map((tile) => <AppTile tile={tile} key={tile.id} />)}
                </div>
              </AppSection>
            </>}
      </div>
    </>
  )
}
