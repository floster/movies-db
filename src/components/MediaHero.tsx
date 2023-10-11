import SvgIcon from "./SvgIcon";
import AppPicture from "./AppPicture";
import AppSpinner from "./AppSpinner";
import AppFavorite from "./AppFavorite";
import AppProgress from "./AppProgress";
import MoviePartOf from "./MoviePartOf";
import AppError from "./AppError";
import TorrentSearch from "./TorrentSearch";

import { FC } from "react";

import { useDocumentTitle } from "usehooks-ts";
import { useGetMediaHeroQuery } from "../store/tmdb/tmdb.api";
import { IAvailableMediaHeroTypes } from "../types/tmdb.models";

interface MediaHeroProps {
  id: number;
  type: IAvailableMediaHeroTypes;
  withLink?: boolean;
}

const MediaHero: FC<MediaHeroProps> = ({ type, id, withLink = false }) => {
  const { data, isError, isLoading } = useGetMediaHeroQuery({
    type,
    id,
  });

  const title = isLoading
    ? "loading..."
    : withLink // FIXME: search for a better way to do this
    ? "Movies DB"
    : data?.title
    ? `${data.title} - Movies DB`
    : `${type} - Movies DB`;
  useDocumentTitle(title);

  console.log("MediaHero2", data);

  if (isError || !data)
    return (
      <AppError
        error={`MediaHero: Error occured while fetching hero data for the ${type} #${id}`}
      />
    );

  // const renderTags = () => {
  //   const tags = data.tags?.map((genre: IGenre) => (
  //     <li key={genre.id}>{genre.name}</li>
  //   ));
  //   return <ul className="media-hero__tags">{tags}</ul>;
  // };

  return isLoading ? (
    <AppSpinner visible={true} />
  ) : (
    <div
      className="media-hero"
      style={{ "--backdrop-image": data.backdrop } as React.CSSProperties}
    >
      <div className="media-hero__inner container">
        <div className="media-hero__picture">
          <AppPicture img={data.poster} alt={data.title} />
          {data.rating && <AppProgress value={data.rating} />}
        </div>
        <div className="media-hero__content">
          {withLink && data.link ? (
            <a href={data.link} className="media-hero__link">
              {data.title}
            </a>
          ) : (
            <h2 className="media-hero__title">{data.title}</h2>
          )}

          {/* {hasGenres && renderTags()} */}
          {data.subtitle && (
            <p className="media-hero__subtitle">{data.subtitle}</p>
          )}

          {data.tags && <p className="media-hero__tags">{data.tags}</p>}

          <p className="media-hero__description">{data.description}</p>
        </div>
        <footer className="media-hero__footer">
          <AppFavorite type={type} id={id} title={data.title} />

          {data.date && data.date !== "" && (
            // TODO: make a component for this
            <span className="icon-labeled m-text_light m-text_normal">
              <SvgIcon icon="calendar" />
              <span className="icon-labeled__label">{data.date}</span>
            </span>
          )}

          {data.partsSeasons && (
            // TODO: make a component for this
            <span className="icon-labeled m-text_light m-text_normal">
              <SvgIcon icon="stack" />
              <span className="icon-labeled__label">{data.partsSeasons}</span>
            </span>
          )}

          {data.torrent && <TorrentSearch term={data.title} />}

          {data.belongs && <MoviePartOf data={data.belongs} />}
        </footer>
      </div>
    </div>
  );
};

export default MediaHero;
