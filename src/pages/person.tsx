import AppSection from '../components/AppSection';
import AppSectionHeader from '../components/AppSectionHeader';
import { FC, useCallback, useEffect, useState } from 'react';
import MediaHero from '../components/MediaHero';
import MovieCrew from '../components/MovieCrew';
import AppTile from '../components/AppTile';
import { useParams } from 'react-router-dom';
import tmdb from '../js/tmdb-api';
import AppSpinner from '../components/AppSpinner';
import AppError from '../components/AppError';
import { cutArray, getIdFromLink, partsSort } from '../js/utils';

type PersonParams = {
  id: string;
}

const Person: FC = () => {
  const params = useParams<PersonParams>();
  const personId = getIdFromLink(params.id!);

  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isDataError, setIsDataError] = useState(false);

  const getData = useCallback(async () => {
    try {
      const data = await tmdb.getPersonCredits(personId);

      // const sortedCrew = cutArray(partsSort(data.crew, 'popularity', 'desc') as [], 6);
      // const sortedCast = cutArray(partsSort(data.cast, 'cast_id', 'asc') as [], 14);

      console.log('cast', data.cast);
      console.log('crew', data.crew);
      // setCast(data.cast);
      // setCrew(data.crew);
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
      <MediaHero id={personId} type='movie' />
      {isDataError
        ? <AppError error={`Error occured while fetching movie #${personId} credits`} />
        : isDataLoading
          ? <AppSpinner visible={true} />
          : <>
            Person's Cast'n'Crew
            {/* <AppSection extraClass="m-movie_crew">
              <div className="container">
                <MovieCrew members={crew} />
                <AppSectionHeader title="crew" />
              </div>
            </AppSection>
            <div className="l-content container">
              <AppSection>
                <AppSectionHeader title="cast" />
                <div className="l-tiles_grid m-people">
                  {cast.map((person) => <AppTile tile={person} key={person.id} />)}
                </div>
              </AppSection>
            </div> */}
          </>
      }
    </section>
  )
}

export default Person;