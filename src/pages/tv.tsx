import AppSection from "../components/AppSection";
import AppSectionHeader from "../components/AppSectionHeader";
import { useCallback, useEffect, useState } from "react";
import TvSeason from "../components/TvSeason";
import { useParams } from "react-router-dom";
import tmdb from "../js/tmdb-api";
import { ITileData, ITvSeason } from "../types/tmdb.types";
import AppSpinner from "../components/AppSpinner";
import AppError from "../components/AppError";
import { getIdFromLink } from "../js/helpers";
import { formatTilesData } from "../js/formatters";
import MediaHero from "../components/MediaHero";

type TvParams = {
  id: string;
};

export default function Tv() {
  const params = useParams<TvParams>();
  const tvId = getIdFromLink(params.id!);

  const [baseSeasons, setBaseSeasons] = useState([] as ITileData[]);
  const [seasons, setSeasons] = useState([] as ITvSeason[]);
  const [isDataError, setIsDataError] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setIsDataLoading(true);
      const data = await tmdb.getTvShow(tvId);

      const seasons = await tmdb.getTvShowSeasons(tvId, data.seasons_qty);
      setSeasons(seasons);

      setBaseSeasons(
        formatTilesData(data.seasons, "tv", ["episodes_qty", "episodes"], true)
      );
    } catch (error) {
      setIsDataError(true);
      console.error(error);
    } finally {
      setIsDataLoading(false);
    }
  }, [tvId]);

  useEffect(() => {
    const fetchData = async () => {
      await (getData as () => Promise<void>)();
    };
    fetchData();
  }, [getData]);

  return (
    <section className="movie-header">
      <MediaHero id={tvId} type="tv" />
      {isDataError ? (
        <AppError error={`Error occured while fetching tv show #${tvId}`} />
      ) : (
        <>
          <div className="l-content container">
            <AppSection>
              <AppSectionHeader
                title={`${baseSeasons.length} seasons`}
                alignStart={true}
              />
              <div className="l-seasons">
                {isDataLoading ? (
                  <AppSpinner visible={true} />
                ) : (
                  seasons.map((season) => (
                    <TvSeason season={season} key={season.id} />
                  ))
                )}
              </div>
            </AppSection>
          </div>
        </>
      )}
    </section>
  );
}
