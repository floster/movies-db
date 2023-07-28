interface Genre {
  id: number;
  name: string;
}

// <AppSelect> component should recieve an array with following items:
export interface SelectOptions {
  title: string;
  value: ListTypes;
}

export type AppTileType = 'movie' | 'collection' | 'actor';
export type MediaType = 'movie' | 'tv';

// comes with 'collection' and 'list' requests
export interface RawPart {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type?: MediaType;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string; // only for movies
  first_air_date?: string; // only for tv
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Part {
  adult: boolean;
  backdrop: string;
  id: number;
  overview: string;
  popularity: number;
  poster: string;
  released: { date: string, year: number },
  title: string;
  votes: { average: number, count: number };
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
  page: number,
  pages: number
}

// TODO: check if RawMovie is the same as RawPart
export interface RawMovie {
  adult: boolean;
  backdrop_path: string;
  genres: Genre[];
  id: number;
  title: string;
  tagline: string;
  overview: string;
  release_date: Date;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
}

// TODO: check if this can be used both for Movie and Part
export interface Movie {
  adult: boolean;
  backdrop: string;
  genres?: number[];
  id: number;
  title: string;
  overview: string;
  rating: number;
  released: { date: string, year: number },
  tagline?: string;
  votes: number;
  poster: string;
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
  name: string;
  overview: string;
  parts: Part[];
  partsCount: number;
  poster: string;
}