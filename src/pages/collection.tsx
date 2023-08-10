import { useEffect, useState } from 'react';
import AppSection from '../components/AppSection';
import AppSectionHeader from '../components/AppSectionHeader';
import MediaHero from '../components/MediaHero';
import AppTile from '../components/AppTile';
import { useParams } from 'react-router-dom';
import { Part, SortOptionValues } from '../js/types';
import AppSpinner from '../components/AppSpinner';
import tmdb from '../js/tmdb';
import { useFetch } from '../hooks/useFetch';
import AppError from '../components/AppError';
import { partsSort as collectionPartsSort, getIdFromLink, splitSortOptionValue } from '../js/utils';

type CollectionParams = {
  id: string;
}

export default function Collection() {
  const params = useParams<CollectionParams>();
  const collectionId = getIdFromLink(params.id!);

  const [parts, setParts] = useState([] as Part[]);
  const [sortedParts, setSortedParts] = useState([] as Part[]);
  const [currentSort, setCurrentSort] = useState('year_asc' as SortOptionValues);

  const onSortChange = (option: SortOptionValues) => setCurrentSort(option);

  useEffect(() => {
    const { sortBy, sortOrder } = splitSortOptionValue(currentSort);
    setSortedParts(collectionPartsSort(parts, sortBy, sortOrder));
  }, [parts, currentSort]);

  const [getPartsData, isPartsDataLoading, isPartsDataError] = useFetch(async () => {
    const data = await tmdb.getCollection(collectionId);
    setParts(data.parts);
  })

  useEffect(() => {
    (getPartsData as () => Promise<void>)();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MediaHero id={collectionId} type='collection' />
      <div className="l-content container">
        {isPartsDataError
          ? <AppError error={`Error occured while fetching collection #${collectionId} parts`} />
          : isPartsDataLoading
            ? <AppSpinner visible={true} />
            : <>
              <AppSection extraClass='m-movies_list'>
                <AppSectionHeader title={`${parts.length} parts`} hasSelect={true} currentSortOption={currentSort} onSortChange={onSortChange} />
                <div className="l-tiles_grid m-movies">
                  {sortedParts.map((part) => <AppTile tile={part} key={part.id} />)}
                </div>
              </AppSection>
            </>}
      </div>
    </>
  )
}
