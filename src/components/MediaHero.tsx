import SvgIcon from "./SvgIcon";
import AppPicture from "./AppPicture";
import AppSpinner from "./AppSpinner";
import AppFavorite from "./AppFavorite";
import AppProgress from "./AppProgress";
import MoviePartOf from "./MoviePartOf";

import { IBaseMovie, ICollection, IMovie, ITvShow, IGenre, UMediaHeroType, UMediaHeroData, IPerson } from "../types/tmdb.types";
import { FC, useCallback, useEffect, useState } from "react";
import tmdb from "../js/tmdb-api";
import AppError from "./AppError";

interface MediaHeroProps {
    id: number;
    type: UMediaHeroType;
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

    const isTv = type === 'tv' && (data as ITvShow).released && (data as ITvShow).finished;
    const isPerson = type === 'person';
    const backdrop = `url(${data.backdrop})`;
    const hasGenres = (data as IBaseMovie).genres;
    const hasTagline = (data as IMovie | ITvShow).tagline;
    const hasRating = (data as IMovie).votes;
    const hasParts = (data as ICollection).partsCount;
    const hasSeasons = (data as ITvShow).seasons_qty;
    const hasBelongsTo = (data as IMovie).belongs_to_collection;
    const hasDate = type !== 'tv' && (data as IMovie).released;

    const personDates = `${(data as IPerson).birthday?.date}${(data as IPerson).deathday?.date !== '-' ? ' - ' + (data as IPerson).deathday?.date : ''}`;

    const heroInner = (
        <div className={'media-hero__inner container'}>
            <AppPicture img={data.poster} alt={data.title} />
            <div className="media-hero__content">
                {hasDate && <p className="media-hero__date">{(data as IMovie | ITvShow).released}</p>}
                {isPerson && <p className="media-hero__date">{personDates}</p>}
                {isTv && <p className="media-hero__date">{(data as ITvShow).year} - {(data as ITvShow).finished.year}</p>}

                {withLink && <a href={`/${type}/${id}`} className="media-hero__link">{data.title}</a>}
                {!withLink && <h2 className="media-hero__title">{data.title}</h2>}

                {hasGenres && renderTags()}
                {hasTagline && <h3 className="media-hero__subtitle">{(data as IMovie).tagline}</h3>}
                {isPerson && <h3 className="media-hero__subtitle">{(data as IPerson).place_of_birth}</h3>}

                {isPerson && <p className="media-hero__tags">{(data as IPerson).department}</p>}

                <p className="media-hero__description">{data.overview}</p>
            </div>
            <footer className="media-hero__footer">
                {hasRating && <AppProgress value={(data as IMovie).votes?.average} />}
                {(hasParts || hasSeasons) &&
                    <span className={`icon-labeled`}>
                        <SvgIcon icon="stack" />
                        <span className="icon-labeled__label">
                            {hasParts && (data as ICollection).partsCount + ' parts'}
                            {hasSeasons && (data as ITvShow).seasons_qty + ' seasons'}
                        </span>
                    </span>
                }
                {hasBelongsTo && <MoviePartOf data={(data as IMovie).belongs_to_collection} />}
                <AppFavorite checked={true} title={data.title} />
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