import AppTile from "./AppTile";
import { IBaseMovie, UTrendingType, IBaseTv, IBasePerson } from "../types/tmdb.types";
import TMDB from "../js/tmdb-api";
import { useCallback, useEffect, useState } from "react";
import AppSpinner from "./AppSpinner";

interface Props {
    itemsType: UTrendingType;
}

export default function AppCarousel({ itemsType }: Props) {
    const [items, setItems] = useState([] as IBaseMovie[] | IBasePerson[] | IBaseTv[]);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isDataError, setIsDataError] = useState(false);

    const getData = useCallback(async (): Promise<void> => {
        try {
            setIsDataLoading(true);
            const data = await TMDB.getTrending(itemsType);
            setItems(data);
        } catch (error) {
            setIsDataError(true);
            console.error(error);
        } finally {
            setIsDataLoading(false);
        }
    }, [itemsType])

    useEffect(() => {
        async function fetchData() {
            await getData();
        }
        fetchData();
    }, [getData]);

    return (
        isDataError
            ? <p className="error-message">🔴 Error occured while fetching carousel tiles</p>
            : <div className="app-carousel has-scroll">
                {isDataLoading
                    ? <AppSpinner visible={true} />
                    : <div className="app-carousel__track">
                        {items.map((item) => <AppTile tile={item} isCarouselItem={true} key={item.id} />)}
                    </div>
                }
            </div>

    )
}
