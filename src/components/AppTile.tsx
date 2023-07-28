import { Part, AppTileType } from "../js/types";
import AppFavorite from "./AppFavorite";
import AppPicture from "./AppPicture";
import AppProgress from "./AppProgress";

interface Props {
    tile: Part;
    type: AppTileType;
    isCarouselItem?: boolean;
}

export default function AppTile({ tile, type, isCarouselItem }: Props) {
    const isActorTile = type === 'actor';
    const carouselItemClass = isCarouselItem ? ' app-carousel__item' : '';

    const tileInner = (
        <>
            <AppPicture img={tile.poster} alt={tile.title + ' poster'} />

            {(type !== 'actor') && <AppFavorite checked={true} title={tile.title} />}
            <div className="app-tile__content">
                {(type !== 'actor') && <AppProgress value={tile.votes.count} />}
                <p className="app-tile__label">{tile.released.date}, {tile.released.year}</p>
                <h3 className="app-tile__title">{tile.title}</h3>
            </div>
        </>
    )

    return (
        isActorTile
            ? <div className="app-tile m-actor">
                {tileInner}
            </div>
            : <a href={`${type}/${tile.id}`} className={`app-tile m-${type}${carouselItemClass}`}>
                {tileInner}
            </a>
    )
}
