import AppSection from '../components/AppSection';
import AppSectionHeader from '../components/AppSectionHeader';
import { FC, useCallback, useEffect, useState } from 'react';
import MediaHero from '../components/MediaHero';
import MovieCrew from '../components/MovieCrew';
import AppTile from '../components/AppTile';
import { useParams } from 'react-router-dom';
import tmdb from '../js/tmdb-api';
import { IMovieCast, IMovieCrew, ITileData } from '../types/tmdb.types';
import AppSpinner from '../components/AppSpinner';
import AppError from '../components/AppError';
import { formatTilesData, getIdFromLink } from '../js/helpers';

type MovieParams = {
  id: string;
}

const Movie: FC = () => {
  const params = useParams<MovieParams>();
  const movieId = getIdFromLink(params.id!);

  const [crew, setCrew] = useState([] as IMovieCrew[]);
  const [cast, setCast] = useState([] as IMovieCast[]);
  const [tiles, setTiles] = useState([] as ITileData[]);

  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isDataError, setIsDataError] = useState(false);

  useEffect(() => setTiles(formatTilesData(cast, 'person', 'character', false, false)), [cast]);

  const getData = useCallback(async () => {
    try {
      const data = await tmdb.getMovieCredits(movieId);

      setCast(data.cast);
      setCrew(data.crew);
    } catch (error) {
      setIsDataError(true);
      console.error(error);
    } finally {
      setIsDataLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    const fetchData = async () => {
      await (getData as () => Promise<void>)();
    };
    fetchData();
  }, [getData]);


  return (
    <section className="movie-header">
      <MediaHero id={movieId} type='movie' />
      {isDataError
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
                  {tiles.map((tile) => <AppTile tile={tile} key={tile.id} />)}
                </div>
              </AppSection>
            </div>
          </>
      }
    </section>
  )
}

export default Movie;