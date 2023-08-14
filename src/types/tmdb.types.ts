// possible Movie List types to get from TMDB
export type UListTypes = 'top_rated' | 'upcoming' | 'now_playing';

export type USortOptionValues = 'year_asc' | 'year_desc' | 'title_asc' | 'title_desc';

export type UMediaTypes = 'collection' | 'tv' | 'movie' | 'person';
export type UMediaHeroData = IMovie | ICollection | ITv | IPerson;
export type UTrendingType = 'movie' | 'tv' | 'person';
export type UAppTileType = 'movie' | 'collection' | 'actor';

export interface ITileData {
  id: number;
  type: UMediaTypes;
  link: string | null;
  poster: string;
  title: string;
  label: string | number | [string | number, string];
  rating: { average: number, count: number } | null;
  favorite: boolean;
}

// comes from TMDB
export type UTmdbMediaType = 'movie' | 'tv' | 'person' | 'collection' | 'season' | 'episode';
export type UTmdbTvShowStatuses = 'Returning Series' | 'Planned' | 'In Production' | 'Ended' | 'Canceled' | 'Pilot';

//////////////////////////////
///// TMDB API Responses /////
//////////////////////////////

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
  movies: IBaseMovie[],
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
  parts: IBaseMovie[];
  partsCount: number;
  poster: string;
}

interface _BasePart {
  adult: boolean;
  backdrop: string;
  genres: IGenre[];
  id: number;
  link: string
  overview: string;
  popularity: number,
  poster: string;
  released: string,
  year: string,
  title: string;
  type: UTmdbMediaType;
  votes: { average: number, count: number };
}

export interface IBaseMovie extends _BasePart { }

export interface IMovie extends _BasePart {
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

export interface ITv extends _BasePart {
  episodes_qty: number,
  finished: { date: string, year: string },
  in_production: boolean,
  seasons_qty: number,
  seasons: ITvSeason[],
  status: UTmdbTvShowStatuses,
  tagline: string;
}

export interface IBaseTv extends _BasePart {
}

type _TvPart = {
  id: number,
  title: string,
  overview: string,
  poster: string,
  released: string,
  year: string,
  season_number: number,
  type: UTmdbMediaType,
  votes: { average: number, count: number };
}

export interface ITvSeason extends _TvPart {
  episodes_qty: number,
  episodes: ITvEpisode[] | null,
}

export interface ITvEpisode extends _TvPart {
  episode_number: number;
  episode_type: string;
  runtime: number;
  show_id: number;
}

export interface IBasePerson {
  id: number;
  link: string,
  type: UTmdbMediaType
  department: string;
  title: string;
  popularity: number;
  poster: string;
}

export interface IPerson extends IBasePerson {
  backdrop: string;
  birthday: { date: string, year: string },
  deathday: { date: string, year: string },
  overview: string;
  place_of_birth: string;
}


export interface IPersonCrew extends _BasePart {
  media_type: UTmdbMediaType;
  department: string;
  job: string;
}

export interface IPersonCast extends _BasePart {
  media_type: UTmdbMediaType;
  character: string;
}

export interface IPersonCredits {
  cast: IPersonCrew[];
  crew: IPersonCast[];
}

export interface IMovieCast extends IBasePerson {
  cast_id: number;
  character: string;
  order: number;
}
export interface IMovieCrew extends IBasePerson {
  job: string;
}

export type UTileData = IBaseMovie | ICollection | IBasePerson | IMovieCast | ITv | ITvSeason | IPersonCrew | IPersonCast;