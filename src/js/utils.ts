import { Person } from "./types";

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