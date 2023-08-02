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
import { manipulateArray } from '../js/utils';

export default function Collection() {
  const params = useParams();
  const collectionId = +params.id!;

  const [parts, setParts] = useState([] as Part[]);
  const [currentSort, setCurrentSort] = useState('year_desc' as SortOptionsValues);

  const onSortChange = (option: SortOptionsValues) => {
    setCurrentSort(option);
  }

  const [getData, isDataLoading, dataError] = useFetch(async () => {
    const data = await tmdb.getCollection(collectionId);

    const sortedParts = manipulateArray(data.parts, 'year', 0, 'asc');
    setParts(sortedParts);
  })

  useEffect(() => {
    const fetchData = async () => {
      await (getData as () => Promise<void>)();
    };
    fetchData();
  }, []);

  return (
    <>
      <MediaHero id={collectionId} type='collection' />
      <div className="l-content container">
        {dataError
          ? <AppError error={`Error occured while fetching collection #${collectionId} parts`} />
          : isDataLoading
            ? <AppSpinner visible={true} />
            : <>
              <AppSection extraClass='m-movies_list'>
                <AppSectionHeader title={`${parts.length} parts`} hasSelect={true} currentSortOption={currentSort} onSortChange={onSortChange} />
                <div className="l-tiles_grid m-movies">
                  {parts.map((part) => <AppTile tile={part} key={part.id} />)}
                </div>
              </AppSection>
            </>}
      </div>
    </>
  )
}
