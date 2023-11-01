export enum ESortValues {
  Default = 'default',
  YearAsc = 'year_asc',
  YearDesc = 'year_desc',
  TitleAsc = 'title_asc',
  TitleDesc = 'title_desc',
  RatingAsc = 'rating_asc',
  RatingDesc = 'rating_desc',
}

export enum ETilesQty {
  Five = '5',
  Ten = '10',
  Twenty = '20',
  All = 'all',
}

export enum ELocales {
  en = 'en',
  uk = 'uk',
  de = 'de',
}

export type IAvailableFavoritesTypes = Exclude<
  EMediaTypes,
  'season' | 'episode'
>

// all possible media types that comes from TMDB

export enum EMediaTypes {
  Collection = 'collection',
  Movie = 'movie',
  Tv = 'tv',
  Person = 'person',
  Season = 'season',
  Episode = 'episode',
}

export type IAvailableTileFields = IRawListResultMovie &
  IRawListResultTv &
  IRawMovie &
  IRawTv &
  IRawCollection &
  IRawCollectionPart &
  IRawPerson &
  IRawMovieCast &
  IRawPersonCreditsMovieCast &
  IRawPersonCreditsTvCast &
  IRawSearchMultiResult &
  IRawCollectionSearch

export interface ITile {
  id: number
  type: EMediaTypes
  link: string | null
  poster: string
  title: string
  label: string
  votes: { average: number; count: number } | null
  rating: number | null
  year: string | null
}

export interface BtnShowMoreAttributes {
  handleShowMore: () => void
  currentPage: number
  pagesQty: number
}

/* *********************************** */
/* ********** GENERAL MEDIA ********** */
/* *********************************** */

// Collection
export interface IRawCollection {
  id: number
  name: string
  overview: string
  poster_path: string
  backdrop_path: string
  parts: IRawCollectionPart[]
}

export interface ICollection {
  id: number
  title: string
  overview: string
  poster: string
  backdrop: string
  parts: ITile[]
}

export interface IRawCollectionPart {
  adult: boolean
  backdrop_path: string
  id: number
  title: string
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}

// Movie
export interface IRawMovie {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: IRawBelongs | null
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: _ProductionCompany[]
  production_countries: _ProductionCountry[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: _SpokenLanguage[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface IRawBelongs {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
}

// Person
export interface IRawPerson {
  adult: boolean
  also_known_as: string[]
  biography: string
  birthday: string
  deathday: string
  gender: number
  homepage: string | null
  id: number
  imdb_id: string
  known_for_department: string
  name: string
  place_of_birth: string
  popularity: number
  profile_path: string
}

// Tv
export interface IRawTv {
  adult: boolean
  backdrop_path: string
  created_by: _CreatedBy[]
  episode_run_time: number[]
  first_air_date: string
  genres: Genre[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: _LastEpisodeToAir
  name: string
  next_episode_to_air: IRawTvEpisode | null
  networks: _Network[]
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: _ProductionCompany[]
  production_countries: _ProductionCountry[]
  seasons: IRawTvSeason[]
  spoken_languages: _SpokenLanguage[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
}

interface _CreatedBy {
  id: number
  credit_id: string
  name: string
  gender: number
  profile_path: string
}

export interface Genre {
  id: number
  name: string
}

interface _LastEpisodeToAir {
  id: number
  name: string
  overview: string
  vote_average: number
  vote_count: number
  air_date: string
  episode_number: number
  episode_type: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
}

interface _Network {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

interface _ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

interface _ProductionCountry {
  iso_3166_1: string
  name: string
}

export interface IRawTvSeason {
  air_date: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
  vote_average: number
}

interface _SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

export interface IRawTvSeasonResponse {
  _id: string
  air_date: string
  episodes: IRawTvEpisode[]
  name: string
  overview: string
  id: number
  poster_path: string
  season_number: number
  vote_average: number
}

export interface IRawTvEpisode {
  air_date: string
  episode_number: number
  episode_type: string
  id: number
  name: string
  overview: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
  vote_average: number
  vote_count: number
  crew: _TvEpisodeCrew[]
  guest_stars: _TvEpisodeGuestStar[]
}

interface _TvEpisodeCrew {
  job: string
  department: string
  credit_id: string
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
}

interface _TvEpisodeGuestStar {
  character: string
  credit_id: string
  order: number
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
}

/* ************************************** */
/* ********** SEARCH RESPONSES ********** */
/* ************************************** */
export interface IRawSearchResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

export interface IRawSearchMultiResult {
  adult: boolean
  backdrop_path?: string
  id: number
  title?: string
  original_language?: string
  original_title?: string
  overview?: string
  poster_path?: string
  media_type: IAvailableTrendingsTypes
  genre_ids?: number[]
  popularity: number
  release_date?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
  name?: string
  original_name?: string
  first_air_date?: string
  origin_country?: string[]
  gender?: number
  known_for_department?: string
  profile_path?: string
  known_for?: _IRawSearchMultiResultKnownFor[]
}

interface _IRawSearchMultiResultKnownFor {
  adult: boolean
  backdrop_path?: string
  id: number
  title?: string
  original_language: string
  original_title?: string
  overview: string
  poster_path?: string
  media_type: string
  genre_ids: number[]
  popularity: number
  release_date?: string
  video?: boolean
  vote_average: number
  vote_count: number
  name?: string
  original_name?: string
  first_air_date?: string
  origin_country?: string[]
}

export interface IRawCollectionSearch {
  adult: boolean
  backdrop_path: string
  id: number
  name: string
  original_language: string
  original_name: string
  overview: string
  poster_path: string
}

export interface ISearchResultsMulti {
  movie: ITile[]
  tv: ITile[]
  person: ITile[]
}

export type ISearchResults = {
  [key in IAvailableFavoritesTypes]: ITile[] | null
}

export interface ISearchResultsState {
  results: ISearchResults
  isError: boolean
  isLoading: boolean
}

/* ********************************* */
/* ********** MEDIA LISTS ********** */
/* ********************************* */
export type IAvailableListsTypes =
  | 'popular'
  | 'top_rated'
  | 'upcoming'
  | 'now_playing'

export type ITvSeriesListsTypes = Exclude<
  IAvailableListsTypes,
  'upcoming' | 'now_playing'
>

export type IAvailableListsOptions =
  | 'movie:top_rated'
  | 'movie:now_playing'
  | 'movie:upcoming'
  | 'tv:top_rated'
  | 'tv:popular'

export interface IRawListResponse<
  T extends IRawListResultMovie | IRawListResultTv,
> {
  dates?: _Dates
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

interface _Dates {
  maximum: string
  minimum: string
}

export interface IRawListResultMovie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface IRawListResultTv {
  backdrop_path: string
  first_air_date: string
  genre_ids: number[]
  id: number
  name: string
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  vote_average: number
  vote_count: number
}

/* ********************************* */
/* ********** MEDIA HERO ********** */
/* ********************************* */

export type IAvailableMediaHeroTypes = Exclude<
  EMediaTypes,
  'season' | 'episode'
>

export type IAvailableMediaHeroFields = IRawMovie &
  IRawTv &
  IRawCollection &
  IRawPerson

export interface IMediaHeroData {
  id: number
  type: IAvailableMediaHeroTypes
  title: string
  subtitle: string | null // tagline for Movie | place_of_birth for Person
  description: string
  genres: string[] | null
  poster: string
  backdrop: string
  rating: number | null // number | null
  link: string | null // string | null
  tags: string | null // department for Person
  date: string
  partsSeasons: string | null // collection parts for Collection | seasons_qty for Tv
  belongs: IRawBelongs | null // belongs_to_collection for Movie
  torrent: boolean
}

/* ******************************* */
/* ********** TRENDINGS ********** */
/* ******************************* */

export type IAvailableTrendingsTypes = Exclude<
  EMediaTypes,
  'season' | 'episode' | 'collection'
>

export type IAvailableTrendingsFields = IRawMovie & IRawTv & IRawPerson

/* *********************************** */
/* ********** MOVIE CREDITS ********** */
/* *********************************** */
export interface IRawMovieCredisResponse {
  id: number
  cast: IRawMovieCast[]
  crew: IRawMovieCrew[]
}

export interface IRawMovieCast {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export interface IRawMovieCrew {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string
  credit_id: string
  department: string
  job: string
}

export interface ICrewMember {
  id: number
  name: string
  job: string
}

export interface IMovieCreditsNew {
  cast: ITile[]
  crew: ICrewMember[]
}

/* ************************************ */
/* ********** PERSON CREDITS ********** */
/* ************************************ */

export interface IRawPersonCreditsResponse<T> {
  cast: T[]
  crew: []
  id: number
}

export interface IRawPersonCreditsMovieCast {
  adult: boolean
  backdrop_path?: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path?: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  character: string
  credit_id: string
  order: number
}

export interface IRawPersonCreditsTvCast {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path: string
  first_air_date: string
  name: string
  vote_average: number
  vote_count: number
  character: string
  credit_id: string
  episode_count: number
}
