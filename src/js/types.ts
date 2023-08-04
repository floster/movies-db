// possible Movie List types to get from TMDB
export type ListTypes = 'top_rated' | 'upcoming' | 'now_playing';

export type SortOptionValues = 'year_asc' | 'year_desc' | 'title_asc' | 'title_desc';

export type AppTileType = 'movie' | 'collection' | 'actor';

// comes from TMDB
export type MediaType = 'movie' | 'tv' | 'person' | 'collection';

export type TvShowStatuses = 'Returning Series' | 'Planned' | 'In Production' | 'Ended' | 'Canceled' | 'Pilot';

//////////////////////////////
///// TMDB API Responses /////
//////////////////////////////

// General
export interface RawPartMovieTV {
  adult: boolean,
  backdrop_path: string,
  first_air_date: Date,   // for TV
  genres: Genre[],        // for Movie, TV
  genre_ids: number[];    // for Part
  id: number,
  original_language: string,
  original_title: string, // for Part, Movie
  title: string,          // for Part, Movie
  original_name: string,  // for TV
  name: string,           // for TV
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: Date,     // for Part, Movie
  tagline: string,        // for Movie, TV
  video: boolean,         // for Part, Movie
  vote_average: number,
  vote_count: number
}

export interface PartMovieTV {
  adult: boolean;
  backdrop: string;
  genres: Genre[];
  id: number;
  overview: string;
  popularity: number,
  poster: string;
  released: { date: string, year: number },
  title: string;
  type: MediaType;
  votes: { average: number, count: number };
}

export interface Genre {
  id: number;
  name: string;
}

export interface BelongsToCollectionData {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

// comes with 'top_rated', 'upcoming' and 'now_playing' requests
export interface RawListData {
  dates?: { maximum: Date, minimum: Date };
  page: number;
  results: RawPart[] | RawPerson[];
  total_pages: number;
  total_results: number;
}

export interface ListData {
  movies: Part[],
  current_page: number,
  total_pages: number
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
  type: MediaType;
  overview: string;
  parts: Part[];
  partsCount: number;
  poster: string;
}

// comes with 'collection' and 'list' requests
// can be a Movie or a TV Show
export interface RawPart extends RawPartMovieTV {
  media_type: MediaType;
}

export interface Part extends PartMovieTV { }

export interface RawMovie extends RawPartMovieTV {
  belongs_to_collection: BelongsToCollectionData | null,
  budget: number,
  homepage: string,
  imdb_id: string,
  revenue: number,
  status: string,
  title: string,
}

export interface Movie extends PartMovieTV {
  belongs_to_collection: BelongsToCollectionData | null,
  budget: number,
  revenue: number,
  status: string,
  tagline: string;
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

export interface RawTvShow extends RawPartMovieTV {
  in_production: boolean,
  last_air_date: Date,
  number_of_episodes: number,
  number_of_seasons: number,
  seasons: RawTvShowSeason[],
  status: TvShowStatuses,
  type: MediaType,
}

export interface TvShow extends PartMovieTV {
  episodes_qty: number,
  finished: { date: string, year: number },
  in_production: boolean,
  seasons_qty: number,
  seasons: TvShowSeason[],
  status: TvShowStatuses,
  tagline: string;
}

export interface RawTvShowSeason {
  air_date: Date,
  episode_count: number,
  id: number,
  name: string,
  overview: string,
  poster_path: string,
  season_number: number,
  vote_average: number
}

export interface TvShowSeason {
  episodes_qty: number,
  id: number,
  name: string,
  overview: string,
  poster: string,
  released: { date: string, year: number },
  season_number: number,
  votes: { average: number, count: number };
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

export type TileData = Part | Movie | Collection | Person | TvShow;