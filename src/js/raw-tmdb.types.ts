import { IBelonging, IGenre, UTmdbMediaType, UTmdbTvShowStatuses } from "./types";

////////////////////////////////////
////////// Main Responses //////////
////////////////////////////////////

export interface RawCollection extends _RawBasicMedia {
    name: string;
    parts: RawCollectionPart[]
}

export interface RawPart extends _RawMoviePart {
    genre_ids: number[];
}

export interface RawCollectionPart extends RawPart {
    media_type: UTmdbMediaType;
}

export interface RawMovie extends _RawMoviePart {
    belongs_to_collection: IBelonging;
    budget: number;
    genres: IGenre[];
    homepage: string;
    imdb_id: string;
    production_companies: RawCompany[];
    production_countries: RawCountrie[];
    revenue: number;
    runtime: number;
    spoken_languages: RawLanguage[];
    status: string;
    tagline: string;
}

export interface RawMovieCredits {
    id: number;
    cast: RawCast[];
    crew: RawCrew[];
}

export interface RawTrendingTvShow extends _RawBasicTvShow {
    media_type: UTmdbMediaType;
    genre_ids: number[];
}

export interface RawTvShow extends _RawBasicTvShow {
    created_by: RawTvShowCreator[];
    episode_run_time: [];
    genres: IGenre[];
    homepage: string;
    in_production: boolean;
    languages: string[];
    last_air_date: Date;
    last_episode_to_air: RawTvShowEpisode;
    next_episode_to_air: string | null;
    networks: RawCompany[];
    number_of_episodes: number;
    number_of_seasons: number;
    production_companies: RawCompany[];
    production_countries: RawCountrie[];
    seasons: RawTvShowSeason[];
    spoken_languages: RawLanguage[];
    status: UTmdbTvShowStatuses;
    tagline: string;
    type: string;
}

export interface RawTvShowSeason extends _RawTvShowPart {
    episode_count: number;
    poster_path: string;
}

export interface RawTrendingPeople extends _RawPerson {
    original_name: string,
    media_type: UTmdbMediaType,
    known_for: RawPart[]
}

export interface RawPeople extends _RawPerson {
    also_known_as: string[],
    biography: string,
    birthday: Date,
    deathday: Date | null,
    homepage: string | null,
    imdb_id: string,
    place_of_birth: string,
}

export interface RawCast extends _RawCredit {
    cast_id: number,
    character: string,
    order: number
}

export interface RawCrew extends _RawCredit {
    department: string,
    job: string
}

export interface RawList {
    page: number,
    total_pages: number,
    total_results: number
}

export interface RawMoviesList extends RawList {
    results: RawPart[]
}

export interface RawTrendingList extends RawList {
    results: RawPart[] | RawTrendingPeople[] | RawTrendingTvShow[],
}

export interface RawPeriodList extends RawList {
    dates: {
        maximum: Date,
        minimum: Date
    }
}

///////////////////////////////////////
///// General Types for Responses /////
///////////////////////////////////////

interface _RawBasicMedia {
    id: number;
    overview: string;
    poster_path: string;
    backdrop_path: string;
}

interface _RawBasic extends _RawBasicMedia {
    adult: boolean;
    popularity: number;
    vote_average: number;
    vote_count: number
}

interface _RawBasicInfo {
    original_language: string;
    original_title: string;
    title: string;
    release_date: Date;
    video: boolean;
}

interface _RawPerson {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    popularity: number,
    profile_path: string,
}

interface _RawCredit extends _RawPerson {
    original_name: string,
    credit_id: string,
}

export interface _RawBasicTvShow extends _RawBasic {
    name: string;
    original_language: string;
    original_name: string;
    first_air_date: Date;
    origin_country: string[]
}

type _RawMoviePart = _RawBasic & _RawBasicInfo;

// for both tv season and tv episode
interface _RawTvShowPart {
    id: number;
    overview: string;
    air_date: Date;
    name: string;
    season_number: number;
    vote_average: number
}

///////////////////////////
///// Responses Parts /////
///////////////////////////

interface RawLanguage {
    english_name: string;
    iso_639_1: string;
    name: string
}

interface RawCountrie {
    iso_3166_1: string;
    name: string
}

interface RawCompany {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string
}

interface RawTvShowCreator {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string
}

interface RawTvShowEpisode extends _RawTvShowPart {
    id: number;
    overview: string;
    name: string;
    vote_average: number;
    vote_count: number;
    air_date: Date;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string
}