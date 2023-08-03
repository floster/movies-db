import { Person, Part, SortOptionValues } from "./types";

export function splitSortOptionValue(option: SortOptionValues, splitBy: string = '_') {
    const sortBy = option.split(splitBy)[0] as keyof Part;
    const sortOrder = option.split(splitBy)[1] as 'asc' | 'desc';

    return { sortBy, sortOrder }
}

export function partsSort<T>(parts: T[], sortBy: keyof T, sortOrder: 'asc' | 'desc' = 'asc'): T[] {
    const sorted = [...parts].sort((a, b) => {
        if (sortOrder === 'asc') return a[sortBy] < b[sortBy] ? -1 : 1;
        else return a[sortBy] > b[sortBy] ? -1 : 1;
    });

    return sorted
}

export function cutArray(arr: Person[], size: number) {
    return [...arr].splice(0, size);
}