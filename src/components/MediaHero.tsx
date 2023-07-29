import SvgIcon from "./SvgIcon";
import AppPicture from "./AppPicture";
import AppSpinner from "./AppSpinner";
import AppFavorite from "./AppFavorite";
import AppProgress from "./AppProgress";
import MoviePartOf from "./MoviePartOf";

import { Collection, Movie, Genre } from "../js/types";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import tmdb from "../js/tmdb";

interface Props {
    id?: number;
    type: 'random' | 'collection' | 'movie';
}

export default function MediaHero({ type, id }: Props) {
    const [data, setData] = useState({} as Collection | Movie);

    const [getData, isDataLoading, dataError] = useFetch(async () => {
        let data: Collection | Movie;
        if (type === 'random') {
            data = await tmdb.getRandomCollection();
            setData(data);
        } else if (type === 'collection') {
            data = await tmdb.getCollection();
            setData(data);
        } else if (type === 'movie') {
            data = await tmdb.getMovie(id!);
            setData(data);
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            await (getData as () => Promise<void>)();
        };
        fetchData();
    }, []);

    const renderTags = () => {
        const tags = (data as Movie).genres?.map((genre: Genre) => <li key={genre.id}>{genre.name}</li>);
        return <ul className="media-hero__tags">{tags}</ul>
    }

    const backdrop = `url(${data.backdrop})`;

    const heroInner = (
        <div className={`media-hero__inner ${type !== 'random' && 'container'}`}>
            <AppPicture img={data.poster} alt={data.title} />
            <div className="media-hero__content">
                <h2 className="media-hero__title">{data.title}</h2>
                {(type === 'movie' && (data as Movie).tagline) && <h3 className="media-hero__subtitle">{(data as Movie).tagline}</h3>}

                {(type === 'movie' && (data as Movie).genres) && renderTags()}

                <p className="media-hero__description">{data.overview}</p>

                {(type === 'movie' && (data as Movie).belongs_to_collection) && <MoviePartOf data={(data as Movie).belongs_to_collection} />}
            </div>
            <footer className="media-hero__footer">
                <div className="media-hero__stats">
                    {(type === 'movie' && (data as Movie).votes) && <AppProgress value={(data as Movie).votes?.average} />}
                    {(type === 'collection' && (data as Collection).partsCount) &&
                        <span className={`icon-labeled`}>
                            <SvgIcon icon="stack" />
                            <span className="icon-labeled__label">{(data as Collection).partsCount} parts</span>
                        </span>
                    }
                </div>

                <AppFavorite checked={true} title={data.title} />
            </footer>
        </div>
    )

    return (
        dataError
            ? <p className="error-message">🔴 Error occured while fetching Random Collection data</p>
            : type === 'random'
                ? <a href={`collection/${data.id}`} className="media-hero m-random" style={{ "--backdrop-image": backdrop } as React.CSSProperties}>
                    <AppSpinner visible={isDataLoading as boolean} />
                    {heroInner}
                </a>
                : <div className="media-hero" style={{ "--backdrop-image": backdrop } as React.CSSProperties}>
                    {heroInner}
                </div>
    )
}
