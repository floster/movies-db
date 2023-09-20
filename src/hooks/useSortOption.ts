import { useState } from "react";
import { USortOptionValues } from "../types/tmdb.types";

const defaultSortOption = import.meta.env.VITE_DEFAULT_SORT_OPTION as USortOptionValues;

export const useSortOption = () => {
    const [currentSortOption, setCurrentSortOption] = useState(defaultSortOption as USortOptionValues);

    const onSortChange = (option: string) => setCurrentSortOption(option as USortOptionValues);

    return {
        currentSortOption,
        onSortChange
    };
}