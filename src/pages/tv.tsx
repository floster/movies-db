import AppSection from '../components/AppSection';
import AppSectionHeader from '../components/AppSectionHeader';
import { useEffect, useState } from 'react';
import MediaHero from '../components/MediaHero';
import AppTile from '../components/AppTile';
import { useParams } from 'react-router-dom';
import tmdb from '../js/tmdb';
import { useFetch } from '../hooks/useFetch';
import { TvShowSeason } from '../js/types';
import AppSpinner from '../components/AppSpinner';
import AppError from '../components/AppError';

export default function Tv() {
  const params = useParams();
  const tvId = +params.id!;

  const [seasons, setSeasons] = useState([] as TvShowSeason[]);

  const [getData, isDataLoading, dataError] = useFetch(async () => {
    const data = await tmdb.getTvShow(tvId);
    setSeasons(data.seasons);
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
      <MediaHero id={tvId} type='tv' />
      {dataError
        ? <AppError error={`Error occured while fetching tv show #${tvId}`} />
        : isDataLoading
          ? <AppSpinner visible={true} />
          : <>
            <div className="l-content container">
              <AppSection>
                <AppSectionHeader title={`${seasons.length} seasons`} alignStart={true} />
                <div className="l-tiles_grid m-movies">
                  {seasons.map((season) => <AppTile tile={season} key={season.id} />)}
                </div>
              </AppSection>
            </div>
          </>
      }
    </section>
  )
}
