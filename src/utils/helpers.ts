import { LOCALES } from '../config'
import {
  IAvailableSortValues,
  IAvailableTileFields,
  IAvalableLocales,
  IMediaTypes,
  ITile,
} from '../types/tmdb.models'

/**
 * Filters an array of tile data to remove any tiles with a placeholder image.
 */
export const filterNoImage = (tiles: ITile[]): ITile[] =>
  tiles.filter(tile => tile.poster.includes('via.placeholder.com') === false)

/**
 * Filters an array of tile data to remove any tiles with an 'uncredited' label.
 */
export const filterUncredits = (tiles: ITile[]): ITile[] =>
  tiles.filter(tile => tile.label.includes('uncredited') === false)

/**
 * Sorts an array of tile data by a specified property.
 */
export function tilesSort<T>(tiles: T[], option: IAvailableSortValues): T[] {
  const sortBy = option.split('_')[0] as keyof T
  const sortOrder = option.split('_')[1] as 'asc' | 'desc'

  return [...tiles].sort((a, b) => {
    if (sortOrder === 'asc') return a[sortBy] < b[sortBy] ? -1 : 1
    else return a[sortBy] > b[sortBy] ? -1 : 1
  })
}

/**
 * Filters an array of tile data to pull any tiles with a placeholder image to the end.
 */
export const pullTilesWithoutPosterToTheEnd = (tiles: ITile[]): ITile[] => {
  const withPoster = tiles.filter(tile =>
    tile.poster.includes('image.tmdb.org')
  )
  const withoutPoster = tiles.filter(
    tile => tile.poster.includes('image.tmdb.org') === false
  )

  return [...withPoster, ...withoutPoster]
}

/**
 * Extracts the ID from a link string and returns it as a number.
 * Used to extract ID from URL created by 'createLink' function.
 * @param {string} link - The link string to extract the ID from.
 * @returns {number} - The ID extracted from the link string as a number.
 */
export const getIdFromLink = (link: string): number =>
  parseInt(link.split('-')[0])

// TODO: #locale refactor all about locales
export const getCurrentLocale = () =>
  (localStorage.getItem('locale') as IAvalableLocales) ||
  import.meta.env.VITE_DEFAULT_LOCALE

export const getLocalCountryCode = () => {
  const currentLocale = getCurrentLocale()
  const countryCode = LOCALES.filter(
    locale => locale.value === currentLocale
  )[0].title
  return countryCode
}

/**
 * Formats a date object
 */
// FIXME: find a better way to store current locale and country code
export const formatDate = (date: string | null) => {
  if (!date) return { full: '', year: '' }

  const _date = new Date(date)
  const localeString = `${getCurrentLocale()}-${getLocalCountryCode()}` // 'en-US'
  const full = _date.toLocaleDateString(localeString, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const year = _date.getFullYear() + ''
  return { full, year }
}

export const kebabText = (link: string) => {
  return link
    .toLowerCase()
    .replace(/:/g, '') // remove colons
    .replace(/,/g, '') // remove commas
    .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-') // remove consecutive hyphens
    .replace(/^-+|-+$/g, '') // remove leading and trailing hyphens
}

/**
 * Creates a link string from the provided type, ID, and title.
 */
export const createLink = (
  type: IMediaTypes,
  id: number,
  title: string
): string => {
  return `/${type}/${id}-${kebabText(title)}`
}

/**
 * Creates a link from tile data.
 */
export const createLinkFromTileData = (
  tile: IAvailableTileFields,
  type?: IMediaTypes
) => {
  const _type = type || realizeMediaType(tile)
  const _title = tile.title || tile.name
  return `/${_type}/${tile.id}-${kebabText(_title)}`
}

/**
 * Determines the media type of a given tile based on its properties.
 */
export const realizeMediaType = (tile: IAvailableTileFields): IMediaTypes => {
  return tile.media_type // 'movie' -> exists in ICollectionPart
    ? (tile.media_type as IMediaTypes)
    : 'first_air_date' in tile // 'tv' -> exists in ITv
    ? 'tv'
    : 'parts' in tile // 'collection' -> exists in ICollection
    ? 'collection'
    : 'biography' in tile || 'known_for_department' in tile // 'person' -> exists in IPerson
    ? 'person'
    : 'movie'
}

export const getPosterUrl = (posterPath: string): string => {
  return posterPath
    ? `${import.meta.env.VITE_API_POSTER_BASE}${posterPath}`
    : import.meta.env.VITE_POSTER_NO_IMAGE
}

export const getBackdropUrl = (path: string): string =>
  path
    ? `url(${import.meta.env.VITE_API_BACKDROP_BASE}${path})`
    : 'var(--gradient-dark)'
