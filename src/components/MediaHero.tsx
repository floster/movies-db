import AppFavorite from "./AppFavorite";
import AppPicture from "./AppPicture";
// import AppProgress from "./AppProgress";
// import MoviePartOf from "./MoviePartOf";
import SvgIcon from "./SvgIcon";

import { Collection } from "../js/types";
import AppSpinner from "./AppSpinner";

interface Props {
    data: Collection;
    isRandom: boolean;
    isFavorite: boolean;
    isLoading: boolean;
}

export default function MediaHero({ data, isRandom, isFavorite, isLoading }: Props) {
    // const renderTags = () => {
    //     if (data.tags) {
    //         const tags = data.tags.map((tag: string) => <li>{tag}</li>)
    //         return <ul className="media-hero__tags">{tags}</ul>
    //     }
    // }

    const backdrop = `url(${data.backdrop})`;

    const heroInner = (
        <div className={`media-hero__inner ${!isRandom && 'container'}`}>
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

                <AppFavorite checked={isFavorite} title={data.name} />
            </footer>
        </div>
    )

    return (
        isRandom
            ? <a href="collection.html" className="media-hero m-random" style={{ "--backdrop-image": backdrop } as React.CSSProperties}>
                <AppSpinner visible={isLoading} />
                {heroInner}
            </a>
            : <div className="media-hero" style={{ "--backdrop-image": backdrop } as React.CSSProperties}>
                {heroInner}
            </div>
    )
}
