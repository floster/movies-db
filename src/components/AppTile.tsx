import { Part } from "../js/types";
import AppFavorite from "./AppFavorite";
import AppPicture from "./AppPicture";
import AppProgress from "./AppProgress";

interface Props {
    tile: Part;
    isCarouselItem?: boolean;
}

export default function AppTile({ tile, isCarouselItem }: Props) {
    const carouselItemClass = isCarouselItem ? ' app-carousel__item' : '';

    return (
        <a href={`${tile.type}/${tile.id}`} className={`app-tile m-${tile.type}${carouselItemClass}`}>
            <AppPicture img={tile.poster} alt={tile.title + ' poster'} />

            {(tile.type !== 'person') && <AppFavorite checked={true} title={tile.title} />}
            <div className="app-tile__content">
                {(tile.type !== 'person') && <AppProgress value={tile.votes.count} />}
                {(tile.type === 'person')
                    ? <p className="app-tile__label">{tile.department}</p>
                    : <p className="app-tile__label">{tile.released?.date}</p>
                }
                <h3 className="app-tile__title">{tile.title}</h3>
            </div>
        </a>
    )
}
