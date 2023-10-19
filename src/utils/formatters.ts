const CREW_QTY_TO_SHOW = +import.meta.env.VITE_MOVIE_CREW_QTY_TO_SHOW as number

import {
  IAvailableMediaHeroFields,
  IAvailableMediaHeroTypes,
  IAvailableTileFields,
  IMediaHeroData,
  IRawCollection,
  ICollection as ICollectionModel,
  ITile,
  IRawMovieCredisResponse,
  IMovieCreditsNew,
  ICrewMember,
  IRawSearchMultiResult,
  ISearchResultsMulti,
  IRawSearchResponse,
  IRawCollectionSearch,
  IMediaTypes,
} from '../types/tmdb.models'

import {
  createLinkFromTileData,
  filterNoImage,
  filterUncredits,
  formatDate,
  getBackdropUrl,
  getPosterUrl,
  realizeMediaType,
} from './helpers'

/**
 * Formats a search term by removing non-alphanumeric characters,
 * replacing spaces with '+' characters, and removing leading/trailing hyphens.
 *
 * @param {string} text - The search term to format.
 * @returns {string} The formatted search term.
 */
export const formatSearchTerm = (term: string) => {
  if (!term) return ''
  return term
    .toLowerCase()
    .replace(/:/g, '') // remove colons
    .replace(/,/g, '') // remove commas
    .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric characters except spaces and hyphens
    .replace(/\s+/g, '+') // replace spaces with plus
    .replace(/-+/g, '+') // remove consecutive plus
    .replace(/^-+|-+$/g, '') // remove leading and trailing hyphens
}

export function formatTile<T extends IAvailableTileFields>(
  tile: T,
  type?: IMediaTypes
): ITile {
  const mediaType = type ? type : realizeMediaType(tile)

  const link = createLinkFromTileData(tile, mediaType)

  const { year } = formatDate(
    tile.release_date ? tile.release_date : tile.first_air_date
  )
  const poster = getPosterUrl(tile.poster_path || tile.profile_path)

  const ratingAvg = tile.vote_average ? +tile.vote_average.toFixed(1) : 0

  const label =
    mediaType === 'movie' || mediaType === 'tv'
      ? year
      : mediaType === 'collection'
      ? tile.parts
        ? `${tile.parts.length.toString()} parts`
        : ''
      : mediaType === 'person' && 'character' in tile
      ? tile.character
      : mediaType === 'person'
      ? tile.known_for_department
      : ''

  return {
    id: tile.id,
    type: mediaType,
    link,
    poster,
    title: tile.title || tile.name,
    label,
    rating: { average: ratingAvg, count: tile.vote_count },
    year,
  }
}

export function formatTiles<T extends IAvailableTileFields>(
  data: T[],
  type?: IMediaTypes
): ITile[] {
  return data.map(item => formatTile(item, type))
}

export const formatMediaHeroData = (
  data: IAvailableMediaHeroFields
): IMediaHeroData => {
  const subtitle = data.tagline || data.place_of_birth || null
  const rating = +data.vote_average?.toFixed(1) || null
  const link = createLinkFromTileData(data as IAvailableTileFields) || null
  const tags = data.known_for_department || null

  let date = ''
  if (data.release_date) {
    date = formatDate(data.release_date).full
  } else if (data.first_air_date && data.last_air_date) {
    const first = formatDate(data.first_air_date).year
    const last =
      data.status === 'Ended' ? formatDate(data.last_air_date).year : '...'
    date = `${first} - ${last}`
  } else if (data.birthday) {
    const deathday = data.deathday ? formatDate(data.deathday).full : '...'
    date = `${formatDate(data.birthday).full} - ${deathday}`
  } else {
    date = ''
  }

  const partsSeasons = data.parts
    ? `${data.parts.length} parts`
    : data.seasons
    ? `${data.number_of_seasons} seasons`
    : null
  const belongs = data.belongs_to_collection || null
  const torrent = true

  const formated = {
    id: data.id,
    type: realizeMediaType(
      data as IAvailableTileFields
    ) as IAvailableMediaHeroTypes,
    title: data.title || data.name,
    subtitle, // tagline for Movie | place_of_birth for Person
    description: data.overview || data.biography || '',
    poster: getPosterUrl(data.poster_path || data.profile_path),
    backdrop: getBackdropUrl(data.backdrop_path),
    rating, // number | null
    link, // string | null
    tags, // department for Person
    date,
    partsSeasons, // collection parts for Collection | seasons_qty for Tv
    belongs, // belongs_to_collection for Movie
    torrent, //
  }

  return formated
}

export const formatCollectionNew = (
  collection: IRawCollection
): ICollectionModel => {
  return {
    id: collection.id,
    title: collection.name,
    overview: collection.overview,
    poster: getPosterUrl(collection.poster_path),
    backdrop: getBackdropUrl(collection.backdrop_path),
    parts: formatTiles(collection.parts as IAvailableTileFields[]),
  }
}

export const formatMovieCreditsNew = (
  credits: IRawMovieCredisResponse
): IMovieCreditsNew => {
  const _crew: ICrewMember[] = credits.crew
    .slice(0, CREW_QTY_TO_SHOW)
    .map(credit => ({
      id: credit.id,
      name: credit.name,
      job: credit.job,
    }))

  const _cast = formatTiles(credits.cast as IAvailableTileFields[])
  const _avoidNoImages = filterNoImage(_cast)
  const _avoidNoCredits = filterUncredits(_avoidNoImages)

  return {
    crew: _crew,
    cast: _avoidNoCredits,
  }
}

export const formatSearchResultsMulti = (
  results: IRawSearchResponse<IRawSearchMultiResult>
) => {
  const formattedResults: ISearchResultsMulti = {
    movie: [],
    tv: [],
    person: [],
  }

  results.results.forEach(result => {
    formattedResults[result.media_type].push(
      formatTile(result as IAvailableTileFields)
    )
  })

  return formattedResults
}

export const formatSearchResultsCollection = (
  results: IRawCollectionSearch[]
): ITile[] | [] => {
  if (!results.length) return []

  return formatTiles(results as IAvailableTileFields[], 'collection')
}
