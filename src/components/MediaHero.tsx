import SvgIcon from "./SvgIcon";
import AppPicture from "./AppPicture";
import AppSpinner from "./AppSpinner";
import AppFavorite from "./AppFavorite";
import AppProgress from "./AppProgress";
import MoviePartOf from "./MoviePartOf";

import { IBaseMovie, ICollection, IMovie, ITv, IGenre, UMediaTypes, UMediaHeroData, IPerson } from "../types/tmdb.types";
import { FC, useCallback, useEffect, useState } from "react";
import tmdb from "../js/tmdb-api";
import AppError from "./AppError";
import TorrentSearch from "./TorrentSearch";

interface MediaHeroProps {
    id: number;
    type: UMediaTypes;
    withLink?: boolean;
}

const MediaHero: FC<MediaHeroProps> = ({ type, id, withLink = false }) => {
    const [data, setData] = useState({} as UMediaHeroData);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isDataError, setIsDataError] = useState(false);

    const getData = useCallback(async (): Promise<void> => {
        try {
            setIsDataLoading(true);
            let data = {} as UMediaHeroData;
            switch (type) {
                case 'collection':
                    data = await tmdb.getCollection(id);
                    setData(data);
                    break;
                case 'movie':
                    data = await tmdb.getMovie(id);
                    setData(data);
                    break;
                case 'tv':
                    data = await tmdb.getTvShow(id);
                    setData(data);
                    break;
                case 'person':
                    data = await tmdb.getPerson(id);
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
        const tags = (data as IMovie).genres?.map((genre: IGenre) => <li key={genre.id}>{genre.name}</li>);
        return <ul className="media-hero__tags">{tags}</ul>
    }

    const isTv = type === 'tv' && (data as ITv).released && (data as ITv).finished;
    const isPerson = type === 'person';
    const backdrop = `url(${data.backdrop})`;
    const hasGenres = (data as IBaseMovie).genres;
    const hasTagline = (data as IMovie | ITv).tagline;
    const hasRating = (data as IMovie).votes;
    const hasParts = (data as ICollection).partsCount;
    const hasSeasons = (data as ITv).seasons_qty;
    const hasBelongsTo = (data as IMovie).belongs_to_collection;
    const hasDate = type !== 'tv' && (data as IMovie).released;
    const hasTorrentSearch = type === 'tv' || type === 'movie' || type === 'season'

    const personDates = `${(data as IPerson).birthday?.date}${(data as IPerson).deathday?.date !== '-' ? ' - ' + (data as IPerson).deathday?.date : ''}`;

    const date = hasDate ? (data as IMovie | ITv).released
        : isPerson ? personDates
            : isTv ? `${(data as ITv).year} - ${(data as ITv).finished.year}`
                : null;

    const heroInner = (
        <div className='media-hero__inner container'>
            <div className="media-hero__picture">
                <AppPicture img={data.poster} alt={data.title} />
                {hasRating && <AppProgress value={(data as IMovie).votes?.average} />}
            </div>
            <div className="media-hero__content">
                {withLink && <a href={`/${type}/${id}`} className="media-hero__link">{data.title}</a>}
                {!withLink && <h2 className="media-hero__title">{data.title}</h2>}

                {hasGenres && renderTags()}
                {hasTagline && <h3 className="media-hero__subtitle">{(data as IMovie).tagline}</h3>}
                {isPerson && <h3 className="media-hero__subtitle">{(data as IPerson).place_of_birth}</h3>}

                {isPerson && <p className="media-hero__tags">{(data as IPerson).department}</p>}

                <p className="media-hero__description">{data.overview}</p>
            </div>
            <footer className="media-hero__footer">
                <AppFavorite checked={true} title={data.title} />

                {date && <span className='icon-labeled m-text_light m-text_normal'>
                    <SvgIcon icon="calendar" />
                    <span className="icon-labeled__label">
                        {date}
                    </span>
                </span>}

                {(hasParts || hasSeasons) &&
                    <span className='icon-labeled m-text_light m-text_normal'>
                        <SvgIcon icon="stack" />
                        <span className="icon-labeled__label">
                            {hasParts && (data as ICollection).partsCount + ' parts'}
                            {hasSeasons && (data as ITv).seasons_qty + ' seasons'}
                        </span>
                    </span>
                }

                {hasTorrentSearch && <TorrentSearch term={data.title} />}

                {hasBelongsTo && <MoviePartOf data={(data as IMovie).belongs_to_collection} />}
            </footer>
        </div>
    )

    return (
        isDataError
            ? <AppError error={`MediaHero: Error occured while fetching hero data for the ${type} #${id}`} />
            : isDataLoading ? <AppSpinner visible={true} />
                : <div className="media-hero" style={{ "--backdrop-image": backdrop } as React.CSSProperties}>
                    {heroInner}
                </div>
    )
}

export default MediaHero;