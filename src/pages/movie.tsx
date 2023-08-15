import AppSection from '../components/AppSection';
import AppSectionHeader from '../components/AppSectionHeader';
import { FC, useCallback, useEffect, useState } from 'react';
import MediaHero from '../components/MediaHero';
import MovieCrew from '../components/MovieCrew';
import AppTile from '../components/AppTile';
import { useParams } from 'react-router-dom';
import tmdb from '../js/tmdb-api';
import { IMovieCrew, ITileData } from '../types/tmdb.types';
import AppSpinner from '../components/AppSpinner';
import AppError from '../components/AppError';
import { cutArray, filterNoImage, filterUncredits, getIdFromLink } from '../js/helpers';
import { formatTilesData } from '../js/formaters';

type MovieParams = {
  id: string;
}

const Movie: FC = () => {
  const params = useParams<MovieParams>();
  const movieId = getIdFromLink(params.id!);

  const [, setCrew] = useState([] as IMovieCrew[]);
  const [crewToShow, setCrewToShow] = useState([] as IMovieCrew[]);
  const [cast, setCast] = useState([] as ITileData[]);
  const [castToShow, setCastToShow] = useState([] as ITileData[]);
  const [isAllCastShowed, setIsAllCastShowed] = useState(false);

  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isDataError, setIsDataError] = useState(false);

  const showAllCast = () => {
    setCastToShow(cast);
    setIsAllCastShowed(true);
  };

  const getData = useCallback(async () => {
    try {
      const data = await tmdb.getMovieCredits(movieId);

      setCrew(data.crew);
      setCrewToShow(cutArray(data.crew, 6));
      const formattedCast = formatTilesData(data.cast, 'person', 'character', false, false);
      const avoidNoImages = filterNoImage(formattedCast);
      const avoidUncredits = filterUncredits(avoidNoImages);
      setCast(avoidUncredits);
      setCastToShow(cutArray(avoidUncredits, 9))
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
                <MovieCrew members={crewToShow} />
                <AppSectionHeader title="crew" />
              </div>
            </AppSection>
            <div className="l-content container">
              <AppSection>
                <AppSectionHeader title="cast" />
                <div className="l-tiles_grid m-people">
                  {castToShow.map((tile) => <AppTile tile={tile} key={tile.id} />)}
                  {!isAllCastShowed && <button className='app-button' onClick={showAllCast}>show all</button>}
                </div>
              </AppSection>
            </div>
          </>
      }
    </section>
  )
}

export default Movie;