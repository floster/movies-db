import { IMovieCast, ICollection, UListTypes, IBaseMovie, IBasePerson, UTileData, ITvShow, ITvShowSeason, IMovieCrew } from "../types/tmdb.types";
import AppFavorite from "./AppFavorite";
import AppPicture from "./AppPicture";
import AppProgress from "./AppProgress";



interface Props {
    tile: UTileData;
    isCarouselItem?: boolean;
    isRow?: boolean;
    listType?: UListTypes;
}

export default function AppTile({ tile, isCarouselItem, isRow = false, listType }: Props) {
    const isPerson = tile.type === 'person';
    const isMovie = tile.type === 'movie';
    const isTv = tile.type === 'tv' && !(tile as ITvShow).seasons_qty;
    const isTvShow = tile.type === 'tv' && (tile as ITvShow).seasons_qty;
    const isTvShowSeason = tile.type === 'season' && (tile as ITvShowSeason).episodes_qty;
    const isCollection = tile.type === 'collection';
    const hasFavoriteBtn = tile.type !== 'person';
    const hasRatingIcon = tile.type !== 'person' && tile.type !== 'collection' && !isRow;
    const hasRatingText = listType && listType !== 'upcoming';

    const classes = ['app-tile'];

    if (tile.type) classes.push(`m-${tile.type}`);
    if (isTvShow) classes.push('m-tvshow');
    if (isCarouselItem) classes.push('app-carousel__item');
    if (isRow) classes.push('m-row');

    return (
        <a href={tile.link} className={classes.join(' ')}>
            <AppPicture img={tile.poster} alt={tile.title + ' poster'} />

            {hasFavoriteBtn && <AppFavorite checked={false} title={tile.title} />}
            <div className="app-tile__content">
                {hasRatingIcon && <AppProgress value={(tile as IBaseMovie).votes.average} />}
                <p className="app-tile__label">
                    {isPerson && (tile as IMovieCast).character || (tile as IBasePerson).department}
                    {isMovie && ((tile as IMovieCrew).job || (tile as IMovieCast).character || (tile as IBaseMovie).released)}
                    {isTv && ((tile as IMovieCast).character || (tile as IMovieCrew).job || (tile as IBaseMovie).released)}
                    {isTvShow && (tile as ITvShow).seasons_qty + ' seasons'}
                    {isTvShowSeason && (tile as ITvShowSeason).episodes_qty + ' episodes'}
                    {isCollection && (tile as ICollection).partsCount + ' parts'}
                </p>
                <h3 className="app-tile__title">{tile.title}</h3>
            </div>
            {hasRatingText && <span className="app-tile__rating">{(tile as IBaseMovie).votes.average} / {(tile as IBaseMovie).votes.count}</span>}
        </a>
    )
}
