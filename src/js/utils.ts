export function manipulateArray<T>(array: T[], sortBy: keyof T, qty: number, direction: 'asc' | 'desc' = 'asc'): T[] {
    const sorted = [...array].sort((a: T, b: T) => {
        if (direction === 'asc') return a[sortBy]! < b[sortBy]! ? -1 : 1;
        else return a[sortBy]! > b[sortBy]! ? -1 : 1;
    })

    if (qty) return sorted.slice(0, qty);
    else return sorted;
}