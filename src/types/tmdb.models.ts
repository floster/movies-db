export type IAvailableTrendingTypes = "movie" | "tv" | "person";

// all possible media types that comes from TMDB
export type IMediaTypes =
  | "collection"
  | "movie"
  | "tv"
  | "person"
  | "season"
  | "episode";

// all posible types that comes from TMDB
export type IAvailableTileTypes =
  | "collection"
  | "movie"
  | "tv"
  | "person"
  | "season"
  | "episode";

export type IAvailableTileFields = IListResultMovie & IListResultTv;

export interface ITile {
  id: number;
  type: IAvailableTileTypes;
  link: string | null;
  poster: string;
  title: string;
  label: string;
  rating: { average: number; count: number } | null;
  year: string | null;
}

/* ************************************** */
/* ********** SEARCH RESPONSES ********** */
/* ************************************** */
export interface ISearchResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface IMovieSearch {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface ICollectionSearch {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
}

export interface ICollection {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: ICollectionPart[];
}

export interface ICollectionPart {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/* ********************************* */
/* ********** MEDIA LISTS ********** */
/* ********************************* */
export type IAvailableListsTypes =
  | "popular"
  | "top_rated"
  | "upcoming"
  | "now_playing";

export type ITvSeriesListsTypes = Exclude<
  IAvailableListsTypes,
  "upcoming" | "now_playing"
>;

export type IAvailableListsOptions =
  | "movie:top_rated"
  | "movie:now_playing"
  | "movie:upcoming"
  | "tv:top_rated"
  | "tv:popular";

export interface IListResponse<T extends IListResultMovie | IListResultTv> {
  dates?: _Dates;
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

interface _Dates {
  maximum: string;
  minimum: string;
}

export interface IListResultMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IListResultTv {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}
