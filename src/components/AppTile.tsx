import { FC } from "react";
import { ITileData } from "../types/tmdb.types";
import AppFavorite from "./AppFavorite";
import AppPicture from "./AppPicture";
import AppProgress from "./AppProgress";

interface AppTileProps {
    tile: ITileData;
    isRow?: boolean;
    extraLabel?: 'year' | 'type';
}

const AppTile: FC<AppTileProps> = ({ tile, isRow = false, extraLabel }) => {
    const classes = ['app-tile'];
    if (tile.type) classes.push(`m-${tile.type}`);
    if (isRow) classes.push('m-row');

    const isLink = !!tile.link;

    const tileInner = (
        <>
            <AppPicture img={tile.poster} alt={tile.title + ' poster'} />

            {(extraLabel) && <span className="app-tile__extraLabel">{tile[extraLabel]}</span>}

            {tile.favorite && <AppFavorite checked={false} title={tile.title} />}
            <div className="app-tile__content">
                {(tile.rating && !isRow) && <AppProgress value={tile.rating.average} />}
                <p className="app-tile__label">
                    {tile.label}
                </p>
                <h3 className="app-tile__title">{tile.title}</h3>
            </div>
            {(tile.rating && isRow) && <span className="app-tile__rating">{tile.rating.average} / {tile.rating.count}</span>}
        </>
    )

    return (
        isLink ?
            <a href={tile.link!} className={classes.join(' ')}>
                {tileInner}
            </a>
            :
            <div className={classes.join(' ')}>
                {tileInner}
            </div>
    )
}

export default AppTile;