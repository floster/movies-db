export interface Genre {
  id: number;
  name: string;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

// <AppSelect> component should recieve an array with following items:
export interface SelectOptions {
  title: string;
  value: ListTypes;
}

export type AppTileType = 'movie' | 'collection' | 'actor';
export type MediaType = 'movie' | 'tv' | 'person';

export type AvalableLocales = 'en' | 'uk' | 'de';
export type Locale = { [key in AvalableLocales]: string };

// comes with 'collection' and 'list' requests
export interface RawPart {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: MediaType;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;  // only for movies and tv
  profile_path?: string; // only for people
  release_date?: string;        // only for movies
  first_air_date?: string;      // only for tv
  known_for_department: string; // only for people
  title?: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Part {
  adult: boolean;
  backdrop: string;
  id: number;
  type: MediaType;
  overview: string;
  popularity: number;
  poster: string;
  released?: { date: string, year: number },
  department?: string;
  title: string;
  votes: { average: string, count: number };
}

// possible Movie List types to get from TMDB
export type ListTypes = 'top_rated' | 'upcoming' | 'now_playing';

// comes with 'top_rated', 'upcoming' and 'now_playing' requests
export interface RawListData {
  dates?: { maximum: Date, minimum: Date };
  page: number;
  results: RawPart[];
  total_pages: number;
  total_results: number;
}

// formated RawListData
export interface ListData {
  movies: Part[],
  current_page: number,
  total_pages: number
}

export interface RawMovie {
  adult: boolean,
  backdrop_path: string,
  belongs_to_collection: BelongsToCollection | null,
  budget: number,
  genres: Genre[],
  homepage: string,
  id: number,
  imdb_id: string,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies: [],
  production_countries: [],
  release_date: Date,
  revenue: number,
  runtime: number,
  spoken_languages: [],
  status: string,
  tagline: string,
  title: string,
  video: false,
  vote_average: number,
  vote_count: number
}

export interface Movie {
  adult: boolean;
  backdrop: string;
  belongs_to_collection: BelongsToCollection | null,
  budget: number,
  genres: Genre[];
  id: number;
  overview: string;
  popularity: number,
  poster: string;
  released: { date: string, year: number },
  revenue: number,
  status: string,
  tagline: string;
  title: string;
  votes: { average: string, count: number };
}

export interface RawCollection {
  backdrop_path: string;
  id: number;
  name: string;
  overview: string;
  parts: RawPart[];
  poster_path: string;
}

export interface Collection {
  backdrop: string;
  id: number;
  title: string;
  overview: string;
  parts: Part[];
  partsCount: number;
  poster: string;
}

export interface RawMovieCredits {
  id: number;
  cast: RawPerson[];
  crew: RawPerson[];
}

export interface MovieCredits {
  cast: Person[];
  crew: Person[];
}

export interface RawPerson {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id?: number; // only for cast
  character?: string; // only for cast
  credit_id: string;
  order?: number; // only for cast
  department?: string; // only for crew
  job?: string; // only for crew
}

export interface Person {
  id: number;
  type: MediaType
  department: string;
  name: string;
  popularity: number;
  poster: string;
  cast_id?: number; // only for cast
  character?: string; // only for cast
  order?: number; // only for cast
  job?: string; // only for crew
}