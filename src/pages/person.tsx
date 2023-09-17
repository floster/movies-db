import AppSection from '../components/AppSection';
import AppSectionHeader from '../components/AppSectionHeader';
import { FC, useCallback, useEffect, useState } from 'react';
import MediaHero from '../components/MediaHero';
import AppTile from '../components/AppTile';
import { useParams } from 'react-router-dom';
import tmdb from '../js/tmdb-api';
import AppSpinner from '../components/AppSpinner';
import AppError from '../components/AppError';
import { filterNoImage, filterUncredits, getIdFromLink, tilesSort } from '../js/helpers';
import { formatTilesData } from '../js/formatters';
import { ITileData, USortOptionValues } from '../types/tmdb.types';

type PersonParams = {
  id: string;
}

const Person: FC = () => {
  const params = useParams<PersonParams>();
  const personId = getIdFromLink(params.id!);

  const [castMovie, setCastMovie] = useState([] as ITileData[]);
  const [castTv, setCastTv] = useState([] as ITileData[]);
  const [currentSortMovie, setCurrentSortMovie] = useState('year_desc' as USortOptionValues);
  const [currentSortTv, setCurrentSortTv] = useState('year_desc' as USortOptionValues);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isDataError, setIsDataError] = useState(false);

  const onMoviesSortChange = (option: string) => setCurrentSortMovie(option as USortOptionValues);
  const onTvsSortChange = (option: string) => setCurrentSortTv(option as USortOptionValues);

  useEffect(() => {
    setCastMovie(tilesSort(castMovie, currentSortMovie))
  }, [currentSortMovie]);
  useEffect(() => {
    setCastTv(tilesSort(castTv, currentSortTv))
  }, [currentSortTv]);

  const getData = useCallback(async () => {
    try {
      setIsDataLoading(true);
      const data = await tmdb.getPersonCredits(personId);

      const formattedCast = formatTilesData(data.cast, 'person', 'character', true, false);
      const avoidNoImages = filterNoImage(formattedCast);
      const avoidUncredits = filterUncredits(avoidNoImages);

      const movie = avoidUncredits.filter((media) => media.type === 'movie');
      const tv = avoidUncredits.filter((media) => media.type === 'tv');

      setCastMovie(tilesSort(movie, currentSortMovie));
      setCastTv(tilesSort(tv, currentSortMovie));
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
        : <>
          <div className="l-content container">
            <AppSection>
              <AppSectionHeader title="movies" hasSelect={true} currentSortOption={currentSortMovie} onSortChange={onMoviesSortChange} />
              <div className="l-tiles_grid m-movies">
                {isDataLoading
                  ? <AppSpinner visible={true} />
                  : castMovie.map((media) => <AppTile tile={media} key={`${media.id}_${media.label}`} extraLabel='year' />)}
              </div>
            </AppSection>

            <AppSection>
              <AppSectionHeader title="tv shows" hasSelect={true} currentSortOption={currentSortTv} onSortChange={onTvsSortChange} />
              <div className="l-tiles_grid m-movies">
                {isDataLoading
                  ? <AppSpinner visible={true} />
                  : castTv.map((media) => <AppTile tile={media} key={`${media.id}_${media.label}`} extraLabel='year' />)}
              </div>
            </AppSection>
          </div>
        </>
      }
    </section>
  )
}

export default Person;