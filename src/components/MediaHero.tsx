import { AppFavorite } from "./AppFavorite";
import AppPicture from "./AppPicture";
import AppProgress from "./AppProgress";
import PartOf from "./PartOf";

import { HeroData } from "../data.types";
import sprite from '../assets/sprite.svg';

interface MediaHeroProps {
    data: HeroData;
    isRandom: boolean;

}

export default function MediaHero({ data, isRandom }: MediaHeroProps) {
    const backdrop = `url(./src/assets/${data.backdrop}.png)`;

    const renderTags = () => {
        if (data.tags) {
            const tags = data.tags.map((tag: string) => <li>{tag}</li>)
            return <ul className="media-hero__tags">{tags}</ul>
        }
    }

    const heroInner = (
        <div className={`media-hero__inner ${!isRandom && 'container'}`}>
            <AppPicture img={data.poster} alt={data.title} />
            <div className="media-hero__content">
                <h2 className="media-hero__title">{data.title}</h2>
                {data.subtitle && <h3 className="media-hero__subtitle">{data.subtitle}</h3>}

                {data.tags && renderTags()}

                <p className="media-hero__description">{data.description}</p>

                {data.part_of && <PartOf title={data.part_of} />}
            </div>
            <footer className="media-hero__footer">
                <div className="media-hero__stats">
                    <AppProgress value={data.rating} />
                    <span className={`icon-labeled ${data.extra_info.light ? 'm-text_light' : ''}`}>
                        <svg className="svg-icon" width="32" height="32" viewBox="0 0 24 24" aria-hidden="true">
                            <use href={`${sprite}#${data.extra_info.icon}`} />
                        </svg>
                        <span className="icon-labeled__label">{data.extra_info.label}</span>
                    </span>

                </div>

                <AppFavorite checked={data.favorite} />
            </footer>
        </div>
    )

    return (
        isRandom
            ? <a href="collection.html" className="media-hero m-random" style={{ "--backdrop-image": backdrop } as React.CSSProperties}>
                {heroInner}
            </a>
            : <div className="media-hero" style={{ "--backdrop-image": backdrop } as React.CSSProperties}>
                {heroInner}
            </div>
    )
}
