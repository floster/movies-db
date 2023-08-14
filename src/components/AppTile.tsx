import { FC } from "react";
import { ITileData } from "../types/tmdb.types";
import AppFavorite from "./AppFavorite";
import AppPicture from "./AppPicture";
import AppProgress from "./AppProgress";

interface AppTileProps {
    tile: ITileData;
    isCarouselItem?: boolean;
    isRow?: boolean;
}

const AppTile: FC<AppTileProps> = ({ tile, isCarouselItem = false, isRow = false }) => {
    const classes = ['app-tile'];
    if (tile.type) classes.push(`m-${tile.type}`);
    if (isCarouselItem) classes.push('app-carousel__item');
    if (isRow) classes.push('m-row');

    return (
        <a href={tile.link} className={classes.join(' ')}>
            <AppPicture img={tile.poster} alt={tile.title + ' poster'} />

            {tile.favorite && <AppFavorite checked={false} title={tile.title} />}
            <div className="app-tile__content">
                {(tile.rating && !isRow) && <AppProgress value={tile.rating.average} />}
                <p className="app-tile__label">
                    {tile.label}
                </p>
                <h3 className="app-tile__title">{tile.title}</h3>
            </div>
            {(tile.rating && isRow) && <span className="app-tile__rating">{tile.rating.average} / {tile.rating.count}</span>}
        </a>
    )
}

export default AppTile;