import { useState } from "react";
import { USortOptionValues } from "../types/tmdb.types";

export const useSortOption = () => {
    const [currentSortOption, setCurrentSortOption] = useState('year_desc' as USortOptionValues);

    const onSortChange = (option: string) => setCurrentSortOption(option as USortOptionValues);

    return {
        currentSortOption,
        onSortChange
    };
}