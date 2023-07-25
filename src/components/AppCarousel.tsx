import { TileData } from "../data.types";
import AppTile from "./AppTile";

interface AppCarouselProps {
    items: TileData[];
}

export default function AppCarousel({ items }: AppCarouselProps) {
    return (
        <div className="app-carousel has-scroll">
            <div className="app-carousel__track">
                {items.map((item) => <AppTile tile={item} type="movie" isCarouselItem={true} />)}
            </div>
        </div>
    )
}
