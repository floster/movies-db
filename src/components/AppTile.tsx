import { ListTypes, Part } from "../js/types";
import AppFavorite from "./AppFavorite";
import AppPicture from "./AppPicture";
import AppProgress from "./AppProgress";

interface Props {
    tile: Part;
    isCarouselItem?: boolean;
    isRow?: boolean;
    listType?: ListTypes;
}

export default function AppTile({ tile, isCarouselItem, isRow = false, listType }: Props) {
    const classes = ['app-tile'];
    if (tile.type) classes.push(`m-${tile.type}`);
    if (isCarouselItem) classes.push('app-carousel__item');
    if (isRow) classes.push('m-row');

    return (
        <a href={`${tile.type}/${tile.id}`} className={classes.join(' ')}>
            <AppPicture img={tile.poster} alt={tile.title + ' poster'} />

            {(tile.type !== 'person') && <AppFavorite checked={false} title={tile.title} />}
            <div className="app-tile__content">
                {(tile.type !== 'person' && !isRow) && <AppProgress value={tile.votes.average} />}
                {(tile.type === 'person')
                    ? <p className="app-tile__label">{tile.department}</p>
                    : <p className="app-tile__label">{tile.released?.date}</p>
                }
                <h3 className="app-tile__title">{tile.title}</h3>
            </div>
            {(listType && listType !== 'upcoming') && <span className="app-tile__rating">{tile.votes.average} / {tile.votes.count}</span>}
        </a>
    )
}
