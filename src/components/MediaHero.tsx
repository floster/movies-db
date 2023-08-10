import SvgIcon from "./SvgIcon";
import AppPicture from "./AppPicture";
import AppSpinner from "./AppSpinner";
import AppFavorite from "./AppFavorite";
import AppProgress from "./AppProgress";
import MoviePartOf from "./MoviePartOf";

import { Collection, Movie, Part, Genre, MediaHeroType, TileData, MediaHeroData, TvShow } from "../js/types";
import { FC, useCallback, useEffect, useState } from "react";
import tmdb from "../js/tmdb";
import AppError from "./AppError";

interface MediaHeroProps {
    id?: number;
    type: MediaHeroType;
}

const MediaHero: FC<MediaHeroProps> = ({ type, id }) => {
    const [data, setData] = useState({} as MediaHeroData);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isDataError, setIsDataError] = useState(false);

    const getData = useCallback(async (): Promise<void> => {
        try {
            setIsDataLoading(true);
            let data = {} as TileData;
            switch (type) {
                case 'random':
                    data = await tmdb.getRandomCollection();
                    setData(data);
                    break;
                case 'collection':
                    data = await tmdb.getCollection(id!);
                    setData(data);
                    break;
                case 'movie':
                    data = await tmdb.getMovie(id!);
                    setData(data);
                    break;
                case 'tv':
                    data = await tmdb.getTvShow(id!);
                    setData(data);
                    break;
                default:
                    setIsDataError(true);
            }
        } catch (error) {
            setIsDataError(true);
            console.error(error);
        } finally {
            setIsDataLoading(false);
        }
    }, [id, type]);

    useEffect(() => {
        async function fetchData() {
            await getData();
        }
        fetchData();
    }, [getData]);

    const renderTags = () => {
        const tags = (data as Movie).genres?.map((genre: Genre) => <li key={genre.id}>{genre.name}</li>);
        return <ul className="media-hero__tags">{tags}</ul>
    }

    const backdrop = `url(${data.backdrop})`;
    const hasGenres = (data as Movie).genres;
    const hasTagline = (data as Movie).tagline;
    const hasRating = (data as Movie).votes;
    const hasParts = (data as Collection).partsCount;
    const hasSeasons = (data as TvShow).seasons_qty;
    const hasBelongsTo = (data as Movie).belongs_to_collection;
    const hasDate = type !== 'tv' && (data as Movie | Part).released;
    const isTv = type === 'tv' && (data as TvShow).released && (data as TvShow).finished;

    const heroInner = (
        <div className={`media-hero__inner ${type !== 'random' && 'container'}`}>
            <AppPicture img={data.poster} alt={data.title} />
            <div className="media-hero__content">
                {hasDate && <p className="media-hero__date">{(data as Movie | Part | TvShow).released.date}</p>}
                {isTv && <p className="media-hero__date">{(data as TvShow).released.year} - {(data as TvShow).finished.year}</p>}
                <h2 className="media-hero__title">{data.title}</h2>

                {hasGenres && renderTags()}
                {hasTagline && <h3 className="media-hero__subtitle">{(data as Movie).tagline}</h3>}

                <p className="media-hero__description">{data.overview}</p>
            </div>
            <footer className="media-hero__footer">
                {hasRating && <AppProgress value={(data as Movie).votes?.average} />}
                {(hasParts || hasSeasons) &&
                    <span className={`icon-labeled`}>
                        <SvgIcon icon="stack" />
                        <span className="icon-labeled__label">
                            {hasParts && (data as Collection).partsCount + ' parts'}
                            {hasSeasons && (data as TvShow).seasons_qty + ' seasons'}
                        </span>
                    </span>
                }
                {hasBelongsTo && <MoviePartOf data={(data as Movie).belongs_to_collection} />}
                <AppFavorite checked={true} title={data.title} />
            </footer>
        </div>
    )

    return (
        isDataError
            ? <AppError error={`Error occured while fetching hero data for the ${type} #${id}`} />
            : type === 'random'
                ? <a href={data.link} className="media-hero m-random" style={{ "--backdrop-image": backdrop } as React.CSSProperties}>
                    <AppSpinner visible={isDataLoading as boolean} />
                    {heroInner}
                </a>
                : <div className="media-hero" style={{ "--backdrop-image": backdrop } as React.CSSProperties}>
                    {heroInner}
                </div>
    )
}

export default MediaHero;