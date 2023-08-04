import { Collection, ListTypes, Part, Person, TileData, TvShow } from "../js/types";
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
    const isPerson = tile.type === 'person';
    const isMovie = tile.type === 'movie';
    const isTv = tile.type === 'tv' && !(tile as TvShow).seasons_qty;
    const isTvShow = tile.type === 'tv' && (tile as TvShow).seasons_qty;
    const isCollection = tile.type === 'collection';
    const hasFavoriteBtn = tile.type !== 'person';
    const hasRatingIcon = tile.type !== 'person' && tile.type !== 'collection' && !isRow;
    const hasRatingText = listType && listType !== 'upcoming';

    const classes = ['app-tile'];
    if (tile.type) classes.push(`m-${tile.type}`);
    if (isTvShow) classes.push('m-tvshow');
    if (isCarouselItem) classes.push('app-carousel__item');
    if (isRow) classes.push('m-row');

    const title = (tile as Part).title || (tile as Person).name;

    return (
        <a href={`/${tile.type || 'movie'}/${tile.id}`} className={classes.join(' ')}>
            <AppPicture img={tile.poster} alt={title + ' poster'} />

            {hasFavoriteBtn && <AppFavorite checked={false} title={title} />}
            <div className="app-tile__content">
                {hasRatingIcon && <AppProgress value={(tile as Part).votes.average} />}
                <p className="app-tile__label">
                    {isPerson && (tile as Person).character || (tile as Person).department}
                    {isMovie && (tile as Part).released.date}
                    {isTv && (tile as Part).released.date}
                    {isTvShow && (tile as TvShow).seasons_qty + ' seasons'}
                    {isCollection && (tile as Collection).partsCount + ' parts'}
                </p>
                <h3 className="app-tile__title">{title}</h3>
            </div>
            {hasRatingText && <span className="app-tile__rating">{(tile as Part).votes.average} / {(tile as Part).votes.count}</span>}
        </a>
    )
}
