import { AvalableLocales, LOCALES } from "./config";
import { ITileData, USortOptionValues } from "../types/tmdb.types";

export const filterNoImage = (tiles: ITileData[]): ITileData[] => tiles.filter(tile => tile.poster.includes('via.placeholder.com') === false);
export const filterUncredits = (tiles: ITileData[]): ITileData[] => tiles.filter(tile => tile.label.includes('uncredited') === false);

export function tilesSort<T>(tiles: T[], option: USortOptionValues): T[] {
    const sortBy = option.split('_')[0] as keyof T;
    const sortOrder = option.split('_')[1] as 'asc' | 'desc';

    return [...tiles].sort((a, b) => {
        if (sortOrder === 'asc') return a[sortBy] < b[sortBy] ? -1 : 1;
        else return a[sortBy] > b[sortBy] ? -1 : 1;
    });
}

/**
 * Cut an array to a specified size.
 * @template T - The type of elements in the input array.
 * @param {T[]} arr - The input array to cut.
 * @param {number} size - The number of elements to include in the output array.
 * @returns {T[]} - A new array containing the first `size` elements of the input array.
 */
export function cutArray<T>(arr: T[], size: number): T[] {
    return [...arr].splice(0, size);
}

/**
 * Extracts the ID from a link string and returns it as a number.
 * Used to extract ID from URL created by 'createLink' function.
 * @param {string} link - The link string to extract the ID from.
 * @returns {number} - The ID extracted from the link string as a number.
 */
export const getIdFromLink = (link: string): number => parseInt(link.split('-')[0])

////////////////////////////////////////
////////// general formatters //////////
////////////////////////////////////////
export const getCurrentLocale = () => localStorage.getItem('locale') as AvalableLocales || import.meta.env.VITE_DEFAULT_LOCALE;

export const getLocalCountryCode = () => {
    const currentLocale = getCurrentLocale();
    const countryCode = LOCALES.filter(locale => locale.value === currentLocale)[0].title;
    return countryCode;
};

/**
 * Formats a date object 
 * @param date - The date object to be formatted.
 * @returns An object with the 'MMM DD, YYYY' date and the year itself.
 */
export const formatDate = (date: Date | null) => {
    if (!date) return { full: '-', year: '' };

    const _date = new Date(date);
    const localeString = `${getCurrentLocale()}-${getLocalCountryCode()}`; // 'en-US'
    const full = _date.toLocaleDateString(localeString, { month: 'short', day: 'numeric', year: 'numeric' });
    const year = _date.getFullYear() + '';
    return { full, year };
}

export const kebabText = (link: string) => {
    return link.toLowerCase()
        .replace(/:/g, '') // remove colons
        .replace(/,/g, '') // remove commas
        .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric characters except spaces and hyphens
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-') // remove consecutive hyphens
        .replace(/^-+|-+$/g, ''); // remove leading and trailing hyphens
}

export const formatSearchTerm = (text: string) => {
    if (!text) return '';
    return text.toLowerCase()
        .replace(/:/g, '') // remove colons
        .replace(/,/g, '') // remove commas
        .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric characters except spaces and hyphens
        .replace(/\s+/g, '\+') // replace spaces with plus
        .replace(/-+/g, '\+') // remove consecutive plus
        .replace(/^-+|-+$/g, ''); // remove leading and trailing hyphens
}

/**
 * Creates a link string from the provided type, ID, and title.
 * @param {string} type - The type of the link (e.g. 'movie', 'tv', etc.).
 * @param {number} id - The ID of the item to link to.
 * @param {string} title - The title of the item to link to.
 * @returns {string} - A link string that looks like '/movie/12345-the-movie-title'.
 */
export const createLink = (type: string, id: number, title: string) => {
    const _type = type ? type : 'movie';
    return `/${_type}/${id}-${kebabText(title)}`;
}

export const getPosterUrl = (posterPath: string): string => {
    return posterPath
        ? `${import.meta.env.VITE_API_POSTER_BASE}${posterPath}`
        : import.meta.env.VITE_POSTER_NO_IMAGE;
}
