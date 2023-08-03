// possible Movie List types to get from TMDB
export type ListTypes = 'top_rated' | 'upcoming' | 'now_playing';

export type SortOptionValues = 'year_asc' | 'year_desc' | 'title_asc' | 'title_desc';

export type AppTileType = 'movie' | 'collection' | 'actor';

// comes from TMDB
export type MediaType = 'movie' | 'tv' | 'person' | 'collection';

//////////////////////////////
///// TMDB API Responses /////
//////////////////////////////

// General
export interface RawPartMovie {
  adult: boolean,
  backdrop_path: string,
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

export interface PartMovie {
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
export interface RawPart extends RawPartMovie {
  genre_ids: number[];
  media_type: MediaType;
  name?: string;          // only for tv
  release_date?: Date;    // only for movies
  first_air_date?: Date;  // only for tv
}

export interface Part extends PartMovie { }

export interface RawMovie extends RawPartMovie {
  belongs_to_collection: BelongsToCollectionData | null,
  budget: number,
  genres: Genre[],
  homepage: string,
  imdb_id: string,
  production_companies: [],
  production_countries: [],
  release_date: Date,
  revenue: number,
  status: string,
  tagline: string,
}

export interface Movie extends PartMovie {
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

export type TileData = Part | Movie | Collection | Person;