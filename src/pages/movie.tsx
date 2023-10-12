import AppSection from "../components/AppSection";
import AppSectionHeader from "../components/AppSectionHeader";
import { FC, useCallback, useEffect, useState } from "react";
import MovieCrew from "../components/Movie/MovieCrew";
import AppTile from "../components/AppTile";
import { useParams } from "react-router-dom";
import tmdb from "../js/tmdb-api";
import { IMovieCrew } from "../types/tmdb.types";
import AppSpinner from "../components/UI/AppSpinner";
import AppError from "../components/UI/AppError";
import { ShowMoreBtn } from "../components/UI/ShowMoreBtn";

import {
  cutArray,
  filterNoImage,
  filterUncredits,
  getIdFromLink,
} from "../js/helpers";
import { formatTilesData } from "../js/formatters";

import { useTilesShowMore } from "../hooks/tiles/tilesShowMore";
import MediaHero from "../components/MediaHero";

type MovieParams = {
  id: string;
};

const Movie: FC = () => {
  const params = useParams<MovieParams>();
  const movieId = getIdFromLink(params.id!);

  const [, setCrew] = useState([] as IMovieCrew[]);
  const [crewToShow, setCrewToShow] = useState([] as IMovieCrew[]);

  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isDataError, setIsDataError] = useState(false);

  const {
    quantity: castQuantity,
    currentPage: currentCastPage,
    currentTiles: currentCast,
    handleShowMore: handleShowMoreCast,
    initPagination: initCastPagination,
  } = useTilesShowMore();

  const getData = useCallback(async () => {
    try {
      setIsDataLoading(true);
      const data = await tmdb.getMovieCredits(movieId);

      setCrew(data.crew);
      setCrewToShow(cutArray(data.crew, 6));
      const formattedCast = formatTilesData(
        data.cast,
        "person",
        "character",
        false
      );
      const avoidNoImages = filterNoImage(formattedCast);
      const avoidUncredits = filterUncredits(avoidNoImages);
      initCastPagination(avoidUncredits);
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
      <MediaHero id={movieId} type="movie" />
      {isDataError ? (
        <AppError
          error={`Error occured while fetching movie #${movieId} credits`}
        />
      ) : (
        <>
          {crewToShow.length !== 0 && (
            <AppSection extraClass="m-movie_crew">
              <div className="container">
                {isDataLoading ? (
                  <AppSpinner visible={true} />
                ) : (
                  <MovieCrew members={crewToShow} />
                )}
                <AppSectionHeader title="crew" />
              </div>
            </AppSection>
          )}
          {currentCast.length !== 0 && (
            <div className="l-content container">
              <AppSection>
                <AppSectionHeader title="cast" />
                <div className="l-tiles_grid m-people">
                  {isDataLoading ? (
                    <AppSpinner visible={true} />
                  ) : (
                    <>
                      {currentCast.map((tile) => (
                        <AppTile tile={tile} key={tile.id} />
                      ))}
                      <ShowMoreBtn
                        currentPage={currentCastPage}
                        pagesQty={castQuantity.pages}
                        handleShowMore={handleShowMoreCast}
                      />
                    </>
                  )}
                </div>
              </AppSection>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Movie;
