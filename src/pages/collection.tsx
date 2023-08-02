import { useEffect, useState } from 'react';
import AppSection from '../components/AppSection';
import AppSectionHeader from '../components/AppSectionHeader';
import MediaHero from '../components/MediaHero';
import AppTile from '../components/AppTile';
import { useParams } from 'react-router-dom';
import { Part, SortOptionsValues } from '../js/types';
import AppSpinner from '../components/AppSpinner';
import tmdb from '../js/tmdb';
import { useFetch } from '../hooks/useFetch';
import AppError from '../components/AppError';
import { partsSort as collectionPartsSort } from '../js/utils';

export default function Collection() {
  const params = useParams();
  const collectionId = +params.id!;

  const [parts, setParts] = useState([] as Part[]);
  const [sortedParts, setSortedParts] = useState([] as Part[]);
  const [currentSort, setCurrentSort] = useState('year_asc' as SortOptionsValues);

  const onSortChange = (option: SortOptionsValues) => {
    setCurrentSort(option);
  }

  useEffect(() => {
    const sortBy = currentSort.split('_')[0] as keyof Part;
    const sortOrder = currentSort.split('_')[1] as 'asc' | 'desc';

    setSortedParts(collectionPartsSort(parts, sortBy, sortOrder));
  }, [parts, currentSort]);

  const [getPartsData, isPartsDataLoading, isPartsDataError] = useFetch(async () => {
    const data = await tmdb.getCollection(collectionId);
    setParts(data.parts);
  })

  useEffect(() => {
    (getPartsData as () => Promise<void>)();
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
