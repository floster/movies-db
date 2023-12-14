import {
  type TRawBelongs,
  type TRawCollection,
  type TRawCollectionPart,
  type TRawCollectionSearch,
  type TRawListResultMovie,
  type TRawListResultTv,
  type TRawMovie,
  type TRawMovieCast,
  type TRawPerson,
  type TRawPersonCreditsMovieCast,
  type TRawPersonCreditsTvCast,
  type TRawSearchMultiResult,
  type TRawTv,
} from "~/types/tmdb-raw.types";

/********************
  media sizes
********************/
export enum EBackdropSizes {
  w300 = "w300",
  w780 = "w780",
  w1280 = "w1280",
  original = "original",
}

export enum EPosterSizes {
  w92 = "w92",
  w154 = "w154",
  w185 = "w185",
  w342 = "w342",
  w500 = "w500",
  w780 = "w780",
  original = "original",
}

export enum EAvailableSearchTypes {
  Movie = "movie",
  Tv = "tv",
  Person = "person",
  All = "multi",
}

// all possible media types that comes from TMDB
export enum EMediaTypes {
  Collection = "collection",
  Movie = "movie",
  Tv = "tv",
  Person = "person",
  Season = "season",
  Episode = "episode",
}

export type TAvailableTileFields = TRawListResultMovie &
  TRawListResultTv &
  TRawMovie &
  TRawTv &
  TRawCollection &
  TRawCollectionPart &
  TRawPerson &
  TRawMovieCast &
  TRawPersonCreditsMovieCast &
  TRawPersonCreditsTvCast &
  TRawSearchMultiResult &
  TRawCollectionSearch;

export type TAvailableTrendingsFields = TRawMovie & TRawTv & TRawPerson;

/********************
  general
********************/
export type TTile = {
  id: number;
  type: EMediaTypes;
  link: string | null;
  poster: string | null;
  title: string;
  label: string;
  votes: number | null;
  rating: number | null;
  year: string | null;
};
export type TCollection = {
  id: number;
  title: string;
  overview: string;
  poster: string | null;
  backdrop: string | null;
  parts: TTile[];
};

export type TGenre = {
  id: number;
  name: string;
};

/********************
  search
********************/
export type TSearchResultsMulti = {
  movie: TTile[];
  tv: TTile[];
  person: TTile[];
};

export type ISearchableTypes = Exclude<EMediaTypes, "season" | "episode">;

export type TSearchResults = {
  [key in ISearchableTypes]: TTile[] | null;
};

/********************
  media hero
********************/
export type TAvailableMediaHeroTypes = Exclude<
  EMediaTypes,
  "season" | "episode"
>;

export type TAvailableMediaHeroFields = TRawMovie &
  TRawTv &
  TRawCollection &
  TRawPerson;

export type TMediaHeroData = {
  id: number;
  type: TAvailableMediaHeroTypes;
  title: string;
  subtitle: string | null;
  description: string;
  genres: string[] | null;
  poster: string | null;
  backdrop: string | null;
  rating: number | null;
  link: string | null;
  tags: string | null;
  date: string;
  partsSeasons: string | null;
  belongs: TRawBelongs | null;
  torrent: boolean;
};

/********************
  movie credits
********************/
export type TCrewMember = {
  id: number;
  name: string;
  job: string;
};

export type TMovieCredits = {
  cast: TTile[];
  crew: TCrewMember[];
};
