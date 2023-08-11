// possible Movie List types to get from TMDB
export type UListTypes = 'top_rated' | 'upcoming' | 'now_playing';

export type USortOptionValues = 'year_asc' | 'year_desc' | 'title_asc' | 'title_desc';

export type UMediaHeroType = 'collection' | 'tv' | 'movie' | 'person';
export type UMediaHeroData = IMovie | ICollection | ITvShow;
export type UTrendingType = 'movie' | 'tv' | 'person';
export type UAppTileType = 'movie' | 'collection' | 'actor';

// comes from TMDB
export type UTmdbMediaType = 'movie' | 'tv' | 'person' | 'collection' | 'season';
export type UTmdbTvShowStatuses = 'Returning Series' | 'Planned' | 'In Production' | 'Ended' | 'Canceled' | 'Pilot';

//////////////////////////////
///// TMDB API Responses /////
//////////////////////////////
interface _BasicPart {
  adult: boolean;
  backdrop: string;
  genres: IGenre[];
  id: number;
  link: string
  overview: string;
  popularity: number,
  poster: string;
  released: { date: string, year: string },
  title: string;
  type: UTmdbMediaType;
  votes: { average: number, count: number };
}

// General
export interface IGenre {
  id: number;
  name: string;
}

export interface IBelonging {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface IListData {
  movies: IPart[],
  current_page: number,
  total_pages: number
}

export interface ICollection {
  backdrop: string;
  id: number;
  link: string,
  title: string;
  type: UTmdbMediaType;
  overview: string;
  parts: IPart[];
  partsCount: number;
  poster: string;
}

// IMovie & ITvShow & ITrendingTvShow
export interface IPart extends _BasicPart { }

export interface IMovie extends _BasicPart {
  belongs_to_collection: IBelonging | null,
  budget: number,
  revenue: number,
  status: string,
  tagline: string;
}

export interface IMovieCredits {
  cast: IMovieCast[];
  crew: IMovieCrew[];
}

export interface ITvShow extends _BasicPart {
  episodes_qty: number,
  finished: { date: string, year: string },
  in_production: boolean,
  seasons_qty: number,
  seasons: ITvShowSeason[],
  status: UTmdbTvShowStatuses,
  tagline: string;
}

export interface ITrendingTvShow extends _BasicPart {
}

export interface ITvShowSeason {
  episodes_qty: number,
  id: number,
  link: string,
  name: string,
  overview: string,
  poster: string,
  released: { date: string, year: string },
  season_number: number,
  type: UTmdbMediaType,
  votes: { average: number, count: number };
}

export interface IBasePerson {
  id: number;
  link: string,
  type: UTmdbMediaType
  department: string;
  name: string;
  popularity: number;
  poster: string;
}

export interface IPerson extends IBasePerson {
  birthday: Date;
  deathday: Date | null;
  biography: string;
  place_of_birth: string;
}

export interface IPersonCredits {
  cast: IMovieCast[];
  crew: IMovieCrew[];
}

export interface IMovieCast extends IBasePerson {
  cast_id: number;
  character: string;
  order: number;
}
export interface IMovieCrew extends IBasePerson {
  job: string;
}

export type UTileData = IPart | IMovie | ICollection | IBasePerson | IMovieCast | ITvShow | ITvShowSeason;