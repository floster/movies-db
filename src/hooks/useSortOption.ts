import { useState } from "react";
import { UTSortValues } from "../types/tmdb.types";

const defaultSortOption = import.meta.env.VITE_DEFAULT_SORT_OPTION as UTSortValues;

export const useSortOption = () => {
    const [currentSortOption, setCurrentSortOption] = useState(defaultSortOption as UTSortValues);

    const onSortChange = (option: string) => setCurrentSortOption(option as UTSortValues);

    return {
        currentSortOption,
        onSortChange
    };
}