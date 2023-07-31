import { ListTypes, Part, Person } from "../js/types";
import AppFavorite from "./AppFavorite";
import AppPicture from "./AppPicture";
import AppProgress from "./AppProgress";

interface Props {
    tile: Part | Person;
    isCarouselItem?: boolean;
    isRow?: boolean;
    listType?: ListTypes;
}

export default function AppTile({ tile, isCarouselItem, isRow = false, listType }: Props) {
    const classes = ['app-tile'];
    if (tile.type) classes.push(`m-${tile.type}`);
    if (isCarouselItem) classes.push('app-carousel__item');
    if (isRow) classes.push('m-row');

    const title = (tile as Part).title || (tile as Person).name;

    return (
        <a href={`${tile.type || 'movie'}/${tile.id}`} className={classes.join(' ')}>
            <AppPicture img={tile.poster} alt={title + ' poster'} />

            {(tile.type !== 'person') && <AppFavorite checked={false} title={title} />}
            <div className="app-tile__content">
                {(tile.type !== 'person' && !isRow) && <AppProgress value={(tile as Part).votes.average} />}
                {(tile.type === 'person')
                    ? <p className="app-tile__label">{(tile as Person).character}</p>
                    : <p className="app-tile__label">{(tile as Part).released?.date}</p>
                }
                <h3 className="app-tile__title">{title}</h3>
            </div>
            {(listType && listType !== 'upcoming') && <span className="app-tile__rating">{(tile as Part).votes.average} / {(tile as Part).votes.count}</span>}
        </a>
    )
}
