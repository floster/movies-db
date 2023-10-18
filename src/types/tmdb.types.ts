// TODO: refactor types to be more specific especially taking into account
// the ITileData interface

// possible Movie List types to get from TMDB
export type UTListTypes = 'top_rated' | 'now_playing' | 'upcoming' | 'popular'
export type UTListSortOptions =
  | 'movie:top_rated'
  | 'movie:now_playing'
  | 'movie:upcoming'
  | 'tv:top_rated'
  | 'tv:popular'

export type UTSortValues = 'year_asc' | 'year_desc' | 'title_asc' | 'title_desc'

// all posible types that comes from TMDB
export type UTMediaTypes =
  | 'collection'
  | 'movie'
  | 'tv'
  | 'person'
  | 'season'
  | 'episode'

// below also uses in MediaHero component
export type UTFavoritesType = 'collection' | 'movie' | 'tv' | 'person'
export type UFavoritesData = IMovie | ICollection | ITv | IPerson

export interface ITileData {
  id: number
  type: UTMediaTypes
  link: string | null
  poster: string
  title: string
  label: string
  rating: { average: number; count: number } | null
  year: string | null
}

//////////////////////////////
///// TMDB API Responses /////
//////////////////////////////

// General
export interface IGenre {
  id: number
  name: string
}

export interface IBelonging {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}

export interface IListData {
  media: IBaseMovie[] | IBaseTv[]
  media_type: 'movie' | 'tv'
  current_page: number
  total_pages: number
}

export interface ICollection {
  backdrop: string
  id: number
  link: string
  title: string
  type: UTMediaTypes
  overview: string
  parts: IBaseMovie[]
  partsCount: number
  poster: string
}

interface _BasePart {
  adult: boolean
  backdrop: string
  genres: IGenre[]
  id: number
  link: string
  overview: string
  popularity: number
  poster: string
  released: string
  year: string
  title: string
  type: UTMediaTypes
  votes: { average: number; count: number }
}

export interface IBaseMovie extends _BasePart {}

export interface IMovie extends _BasePart {
  belongs_to_collection: IBelonging | null
  budget: number
  revenue: number
  status: string
  tagline: string
}

export interface IMovieCredits {
  cast: IMovieCast[]
  crew: IMovieCrew[]
}

export type UTmdbTvShowStatuses =
  | 'Returning Series'
  | 'Planned'
  | 'In Production'
  | 'Ended'
  | 'Canceled'
  | 'Pilot'
export interface ITv extends _BasePart {
  episodes_qty: number
  finished: { date: string; year: string }
  in_production: boolean
  seasons_qty: number
  seasons: ITvSeason[]
  status: UTmdbTvShowStatuses
  tagline: string
}

export interface IBaseTv extends _BasePart {}

type _TvPart = {
  id: number
  title: string
  overview: string
  poster: string
  released: string
  year: string
  season_number: number
  type: UTMediaTypes
  votes: { average: number; count: number }
}

export interface ITvSeason extends _TvPart {
  episodes_qty: number
  episodes: ITvEpisode[] | null
}

export interface ITvEpisode extends _TvPart {
  episode_number: number
  episode_type: string
  runtime: number
  show_id: number
}

export interface IBasePerson {
  id: number
  link: string
  type: UTMediaTypes
  department: string
  title: string
  popularity: number
  poster: string
}

export interface IPerson extends IBasePerson {
  backdrop: string
  birthday: { date: string; year: string }
  deathday: { date: string; year: string }
  overview: string
  place_of_birth: string
}

export interface IPersonCrew extends _BasePart {
  media_type: UTMediaTypes
  department: string
  job: string
}

export interface IPersonCast extends _BasePart {
  media_type: UTMediaTypes
  character: string
}

export interface IPersonCredits {
  cast: IPersonCrew[]
  crew: IPersonCast[]
}

export interface IMovieCast extends IBasePerson {
  cast_id: number
  character: string
  order: number
}
export interface IMovieCrew extends IBasePerson {
  job: string
}

export interface ISearchResults {
  pages: number
  movies: ITileData[]
  tvs: ITileData[]
  persons: ITileData[]
}

export interface IQuickSearchResult {
  id: number
  link: string
  poster: string
  title: string
  type: UTMediaTypes
  year: string
}

export type UTileData =
  | IBaseMovie
  | ICollection
  | IBasePerson
  | IMovieCast
  | ITv
  | ITvSeason
  | IPersonCrew
  | IPersonCast
