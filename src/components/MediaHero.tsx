import SvgIcon from "./SvgIcon";
import AppPicture from "./AppPicture";
import AppSpinner from "./AppSpinner";
import AppFavorite from "./AppFavorite";
// import AppProgress from "./AppProgress";
// import MoviePartOf from "./MoviePartOf";

import { Collection } from "../js/types";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import tmdb from "../js/tmdb";

interface Props {
    id?: number;
    type: 'random' | 'collection' | 'movie';
}

export default function MediaHero({ type }: Props) {
    const [data, setData] = useState({} as Collection);

    const [getData, isDataLoading, dataError] = useFetch(async () => {
        let data: Collection;
        if (type === 'random') {
            data = await tmdb.getRandomCollection();
            setData(data);
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            await (getData as () => Promise<void>)();
        };
        fetchData();
    }, []);

    // const renderTags = () => {
    //     if (data.tags) {
    //         const tags = data.tags.map((tag: string) => <li>{tag}</li>)
    //         return <ul className="media-hero__tags">{tags}</ul>
    //     }
    // }

    const backdrop = `url(${data.backdrop})`;

    const heroInner = (
        <div className={`media-hero__inner ${type !== 'random' && 'container'}`}>
            <AppPicture img={data.poster} alt={data.name} />
            <div className="media-hero__content">
                <h2 className="media-hero__title">{data.name}</h2>
                {/* {data.subtitle && <h3 className="media-hero__subtitle">{data.subtitle}</h3>} */}

                {/* {data.tags && renderTags()} */}

                <p className="media-hero__description">{data.overview}</p>

                {/* {data.part_of && <MoviePartOf title={data.part_of} />} */}
            </div>
            <footer className="media-hero__footer">
                <div className="media-hero__stats">
                    {/* <AppProgress value={data.rating} /> */}
                    <span className={`icon-labeled`}>
                        <SvgIcon icon="stack" />
                        <span className="icon-labeled__label">{data.partsCount} parts</span>
                    </span>

                </div>

                <AppFavorite checked={true} title={data.name} />
            </footer>
        </div>
    )

    return (
        dataError
            ? <p className="error-message">🔴 Error occured while fetching data</p>
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
