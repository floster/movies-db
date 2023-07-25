import { TileData } from "../data.types";
import { AppFavorite } from "./AppFavorite";
import AppProgress from "./AppProgress";

interface AppTileProps {
    tile: TileData;
    type: 'actor' | 'movie' | 'collection';
    isCarouselItem?: boolean;
}

export default function AppTile({ tile, type, isCarouselItem }: AppTileProps) {
    const isActorTile = type === 'actor';
    const carouselItemClass = isCarouselItem ? ' app-carousel__item' : '';

    const tileInner = (
        <>
            <picture className="app-tile__picture">
                <img src={`./src/assets/${isActorTile ? 'actor' : 'poster'}_${tile.id}.png`} alt={`${tile.title} ${type === 'actor' ? 'image' : 'poster'}`} className="app-tile__img" />
            </picture>

            {(type !== 'actor') && <AppFavorite checked={tile.favorite} />}
            <div className="app-tile__content">
                {(type !== 'actor') && <AppProgress value={tile.rating} />}
                <p className="app-tile__label">{tile.label}</p>
                <h3 className="app-tile__title">{tile.title}</h3>
            </div>
        </>
    )

    return (
        isActorTile
            ? <div className="app-tile m-actor">
                {tileInner}
            </div>
            : <a href={`${type}.html`} className={`app-tile m-${type}${carouselItemClass}`}>
                {tileInner}
            </a>
    )
}
