import { EMediaTypes } from "~/types/tmdb.types";

/********************
  collection
********************/
export type TRawCollection = {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: TRawCollectionPart[];
};

export type TRawCollectionPart = {
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
};

/********************
  Movie
********************/
export type TRawMovie = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: TRawBelongs | null;
  budget: number;
  genres: _Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: _ProductionCompany[];
  production_countries: _ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: _SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TRawBelongs = {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
};

interface _Genre {
  id: number;
  name: string;
}

/********************
  Person
********************/
export type TRawPerson = {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
};

/********************
  Tv
********************/
export type TRawTv = {
  adult: boolean;
  backdrop_path: string;
  created_by: _CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: _Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: _LastEpisodeToAir;
  name: string;
  next_episode_to_air: TRawTvEpisode | null;
  networks: _Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: _ProductionCompany[];
  production_countries: _ProductionCountry[];
  seasons: TRawTvSeason[];
  spoken_languages: _SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
};

interface _CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

interface _LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

interface _Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface _ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface _ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export type TRawTvSeason = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

interface _SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export type TRawTvSeasonResponse = {
  _id: string;
  air_date: string;
  episodes: TRawTvEpisode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type TRawTvEpisode = {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: _TvEpisodeCrew[];
  guest_stars: _TvEpisodeGuestStar[];
};

interface _TvEpisodeCrew {
  job: string;
  department: string;
  credit_id: string;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
}

interface _TvEpisodeGuestStar {
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export type TRawSearchResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

/********************
  search
********************/
export type TAvailableTrendingsTypes = Exclude<
  EMediaTypes,
  "season" | "episode" | "collection"
>;

export type TRawSearchMultiResult = {
  adult: boolean;
  backdrop_path?: string;
  id: number;
  title?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  poster_path?: string;
  media_type: TAvailableTrendingsTypes;
  genre_ids?: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
  gender?: number;
  known_for_department?: string;
  profile_path?: string;
  known_for?: _TRawSearchMultiResultKnownFor[];
};

interface _TRawSearchMultiResultKnownFor {
  adult: boolean;
  backdrop_path?: string;
  id: number;
  title?: string;
  original_language: string;
  original_title?: string;
  overview: string;
  poster_path?: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
}

export type TRawCollectionSearch = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
};

/********************
  media lists
********************/
export type TRawListResponse<T extends TRawListResultMovie | TRawListResultTv> =
  {
    dates?: _Dates;
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
  };

interface _Dates {
  maximum: string;
  minimum: string;
}

export type TRawListResultMovie = {
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
};

export type TRawListResultTv = {
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
};

/********************
  movie credits
********************/
export type TRawMovieCredisResponse = {
  id: number;
  cast: TRawMovieCast[];
  crew: TRawMovieCrew[];
};

export type TRawMovieCast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type TRawMovieCrew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  credit_id: string;
  department: string;
  job: string;
};

/********************
  person credits
********************/
export type TRawPersonCreditsResponse<T> = {
  cast: T[];
  crew: [];
  id: number;
};

export type TRawPersonCreditsMovieCast = {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order: number;
};

export type TRawPersonCreditsTvCast = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  episode_count: number;
};
