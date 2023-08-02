import AppSection from '../components/AppSection';
import AppSectionHeader from '../components/AppSectionHeader';
import { useEffect, useState } from 'react';
import MediaHero from '../components/MediaHero';
import MovieCrew from '../components/MovieCrew';
import AppTile from '../components/AppTile';
import { useParams } from 'react-router-dom';
import tmdb from '../js/tmdb';
import { useFetch } from '../hooks/useFetch';
import { Person } from '../js/types';
import AppSpinner from '../components/AppSpinner';
import AppError from '../components/AppError';
import { cutArray, partsSort } from '../js/utils';

export default function Movie() {
  const params = useParams();
  const movieId = +params.id!;

  const [cast, setCast] = useState([] as Person[]);
  const [crew, setCrew] = useState([] as Person[]);

  const [getData, isDataLoading, dataError] = useFetch(async () => {
    const data = await tmdb.getMovieCredits(movieId);

    const sortedCrew = cutArray(partsSort(data.crew, 'popularity', 'desc'), 6);
    const sortedCast = cutArray(partsSort(data.cast, 'cast_id', 'asc'), 14);

    setCast(sortedCast);
    setCrew(sortedCrew);
  })

  useEffect(() => {
    const fetchData = async () => {
      await (getData as () => Promise<void>)();
    };
    fetchData();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <section className="movie-header">
      <MediaHero id={movieId} type='movie' />
      {dataError
        ? <AppError error={`Error occured while fetching movie #${movieId} credits`} />
        : isDataLoading
          ? <AppSpinner visible={true} />
          : <>
            <AppSection extraClass="m-movie_crew">
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
            </div>
          </>
      }
    </section>
  )
}
