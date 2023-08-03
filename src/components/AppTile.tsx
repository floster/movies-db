import { Collection, ListTypes, Part, Person, TileData } from "../js/types";
import AppFavorite from "./AppFavorite";
import AppPicture from "./AppPicture";
import AppProgress from "./AppProgress";

interface Props {
    tile: TileData;
    isCarouselItem?: boolean;
    isRow?: boolean;
    listType?: ListTypes;
}

export default function AppTile({ tile, isCarouselItem, isRow = false, listType }: Props) {
    const classes = ['app-tile'];
    if (tile.type) classes.push(`m-${tile.type}`);
    if (isCarouselItem) classes.push('app-carousel__item');
    if (isRow) classes.push('m-row');

    const isPerson = tile.type === 'person';
    const isMovieOrTv = tile.type === 'movie' || tile.type === 'tv';
    const isCollection = tile.type === 'collection';
    const hasFavoriteBtn = tile.type !== 'person';
    const hasRatingIcon = tile.type !== 'person' && tile.type !== 'collection' && !isRow;
    const hasRatingText = listType && listType !== 'upcoming';

    const title = (tile as Part).title || (tile as Person).name;

    return (
        <a href={`/${tile.type || 'movie'}/${tile.id}`} className={classes.join(' ')}>
            <AppPicture img={tile.poster} alt={title + ' poster'} />

            {hasFavoriteBtn && <AppFavorite checked={false} title={title} />}
            <div className="app-tile__content">
                {hasRatingIcon && <AppProgress value={(tile as Part).votes.average} />}
                {isPerson && <p className="app-tile__label">{(tile as Person).character || (tile as Person).department}</p>}
                {isMovieOrTv && <p className="app-tile__label">{(tile as Part).released.date}</p>}
                {isCollection && <p className="app-tile__label">{(tile as Collection).partsCount} parts</p>}
                <h3 className="app-tile__title">{title}</h3>
            </div>
            {hasRatingText && <span className="app-tile__rating">{(tile as Part).votes.average} / {(tile as Part).votes.count}</span>}
        </a>
    )
}
