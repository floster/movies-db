import AppSection from '../components/AppSection';
import AppSectionHeader from '../components/AppSectionHeader';
import { FC, useCallback, useEffect, useState } from 'react';
import MediaHero from '../components/MediaHero';
import AppTile from '../components/AppTile';
import { useParams } from 'react-router-dom';
import tmdb from '../js/tmdb-api';
import AppSpinner from '../components/AppSpinner';
import AppError from '../components/AppError';
import { formatTilesData, getIdFromLink } from '../js/helpers';
import { ITileData } from '../types/tmdb.types';

type PersonParams = {
  id: string;
}

const Person: FC = () => {
  const params = useParams<PersonParams>();
  const personId = getIdFromLink(params.id!);

  const [cast, setCast] = useState([] as ITileData[]);
  const [crew, setCrew] = useState([] as ITileData[]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isDataError, setIsDataError] = useState(false);

  const getData = useCallback(async () => {
    try {
      const data = await tmdb.getPersonCredits(personId);

      setCrew(formatTilesData(data.crew, 'person', 'job', true, false));
      setCast(formatTilesData(data.cast, 'person', 'character', true, false));
    } catch (error) {
      setIsDataError(true);
      console.error(error);
    } finally {
      setIsDataLoading(false);
    }
  }, [personId]);

  useEffect(() => {
    const fetchData = async () => {
      await (getData as () => Promise<void>)();
    };
    fetchData();
  }, [getData]);


  return (
    <section className="movie-header">
      <MediaHero id={personId} type='person' />
      {isDataError
        ? <AppError error={`Error occured while fetching movie #${personId} credits`} />
        : isDataLoading
          ? <AppSpinner visible={true} />
          : <>
            <div className="l-content container">
              <AppSection>
                <AppSectionHeader title="cast" />
                <div className="l-tiles_grid m-movies">
                  {cast.map((media) => <AppTile tile={media} key={media.id} />)}
                </div>
              </AppSection>
            </div>
            <div className="l-content container">
              <AppSection>
                <AppSectionHeader title="crew" />
                <div className="l-tiles_grid m-movies">
                  {crew.map((media) => <AppTile tile={media} key={media.id} />)}
                </div>
              </AppSection>
            </div>
          </>
      }
    </section>
  )
}

export default Person;