import AppTile from "./AppTile";
import { MediaType, Part } from "../js/types";
import TMDB from "../js/tmdb";
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import AppSpinner from "./AppSpinner";

interface Props {
    itemsType: MediaType;
}

export default function AppCarousel({ itemsType }: Props) {
    const [items, setItems] = useState([] as Part[]);

    const [getData, isDataLoading, dataError] = useFetch(async () => {
        const data = await TMDB.getTrending(itemsType);
        setItems(data);
    })

    useEffect(() => {
        const fetchData = async () => {
            await (getData as () => Promise<void>)();
        };
        fetchData();
    }, []);

    return (
        dataError
            ? <p className="error-message">🔴 Error occured while fetching carousel tiles</p>
            : <div className="app-carousel has-scroll">
                {isDataLoading
                    ? <AppSpinner visible={true} />
                    : <div className="app-carousel__track">
                        {items.map((item) => <AppTile tile={item} type="movie" isCarouselItem={true} key={item.id} />)}
                    </div>
                }
            </div>

    )
}
