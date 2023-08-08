// possible Movie List types to get from TMDB
export type ListTypes = 'top_rated' | 'upcoming' | 'now_playing';

export type SortOptionValues = 'year_asc' | 'year_desc' | 'title_asc' | 'title_desc';

export type MediaHeroType = 'random' | 'collection' | 'tv' | 'movie';
export type TrendingType = 'movie' | 'tv' | 'person';
export type MediaHeroData = Part | Movie | Collection | TvShow;
export type AppTileType = 'movie' | 'collection' | 'actor';

// comes from TMDB
export type TmdbMediaType = 'movie' | 'tv' | 'person' | 'collection' | 'season';
export type TmdbTvShowStatuses = 'Returning Series' | 'Planned' | 'In Production' | 'Ended' | 'Canceled' | 'Pilot';

//////////////////////////////
///// TMDB API Responses /////
//////////////////////////////
interface _BasicPart {
  adult: boolean;
  backdrop: string;
  genres: Genre[];
  id: number;
  overview: string;
  popularity: number,
  poster: string;
  released: { date: string, year: string },
  title: string;
  type: TmdbMediaType;
  votes: { average: number, count: number };
}

// General
export interface Genre {
  id: number;
  name: string;
}

export interface Belonging {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface ListData {
  movies: Part[],
  current_page: number,
  total_pages: number
}

export interface Collection {
  backdrop: string;
  id: number;
  title: string;
  type: TmdbMediaType;
  overview: string;
  parts: Part[];
  partsCount: number;
  poster: string;
}

export interface Part extends _BasicPart { }

export interface Movie extends _BasicPart {
  belongs_to_collection: Belonging | null,
  budget: number,
  revenue: number,
  status: string,
  tagline: string;
}

export interface MovieCredits {
  cast: Cast[];
  crew: Crew[];
}

export interface TvShow extends _BasicPart {
  episodes_qty: number,
  finished: { date: string, year: string },
  in_production: boolean,
  seasons_qty: number,
  seasons: TvShowSeason[],
  status: TmdbTvShowStatuses,
  tagline: string;
}

export interface TrendingTvShow extends _BasicPart {
}

export interface TvShowSeason {
  episodes_qty: number,
  id: number,
  name: string,
  overview: string,
  poster: string,
  released: { date: string, year: string },
  season_number: number,
  type: TmdbMediaType,
  votes: { average: number, count: number };
}

export interface Person {
  id: number;
  type: TmdbMediaType
  department: string;
  name: string;
  popularity: number;
  poster: string;
}

export interface Cast extends Person {
  cast_id: number;
  character: string;
  order: number;
}
export interface Crew extends Person {
  job: string;
}

export type TileData = Part | Movie | Collection | Person | Cast | TvShow | TvShowSeason;