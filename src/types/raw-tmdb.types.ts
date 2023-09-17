import { IBelonging, IGenre, UMediaTypes, UTmdbTvShowStatuses } from "./tmdb.types";

////////////////////////////////////
////////// Main Responses //////////
////////////////////////////////////

export interface RawCollection extends _RawBaseMedia {
    name: string;
    parts: RawSearchMovie[]
}

export interface RawBaseMovie extends _RawBaseMovie {
    genre_ids: number[];
}

export interface RawSearchMovie extends RawBaseMovie {
    media_type: UMediaTypes;
}

export interface RawMovie extends _RawBaseMovie {
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

export interface _RawBaseTv extends _RawBase {
    name: string;
    original_language: string;
    original_name: string;
    first_air_date: Date;
    origin_country: string[]
}

export interface RawTrendingTv extends _RawBaseTv {
    genre_ids: number[];
}

export interface RawBaseTv extends _RawBaseTv {
}

export interface RawTv extends _RawBaseTv {
    created_by: RawTvCreator[];
    episode_run_time: [];
    genres: IGenre[];
    homepage: string;
    in_production: boolean;
    languages: string[];
    last_air_date: Date;
    last_episode_to_air: RawTvEpisode;
    next_episode_to_air: string | null;
    networks: RawCompany[];
    number_of_episodes: number;
    number_of_seasons: number;
    production_companies: RawCompany[];
    production_countries: RawCountrie[];
    seasons: RawTvSeason[];
    spoken_languages: RawLanguage[];
    status: UTmdbTvShowStatuses;
    tagline: string;
    type: string;
}

export interface RawTvSeason extends _RawTvPart {
    episode_count?: number;
    episodes?: RawTvEpisode[];
    poster_path: string;
}

export interface RawTvEpisode extends _RawTvPart {
    vote_count: number;
    episode_number: number;
    episode_type: string;
    runtime: number;
    show_id: number;
    still_path: string;
    crew: RawCrew[];
    cast: RawCast[]
}

////////////////////////////////////
/////////// Raw Personas ///////////
////////////////////////////////////

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

export interface RawBasePerson extends _RawPerson { }

export interface RawPerson extends _RawPerson {
    also_known_as: string[],
    biography: string,
    birthday: Date,
    deathday: Date | null,
    homepage: string | null,
    imdb_id: string,
    place_of_birth: string,
}

// Person Credits - Crew & Cast
type _RawPersonCrewOnlyFields = {
    media_type: UMediaTypes;
    department: string;
    job: string;
}

type _RawPersonCastOnlyFields = {
    media_type: UMediaTypes;
    character: string;
}

export interface RawPersonCrewMovie extends RawSearchMovie, _RawPersonCrewOnlyFields {
}

export interface RawPersonCrewTv extends _RawBaseTv, _RawPersonCrewOnlyFields {
}

export interface RawPersonCastMovie extends RawSearchMovie, _RawPersonCastOnlyFields {
}

export interface RawPersonCastTv extends _RawBaseTv, _RawPersonCastOnlyFields {
}

export type RawPersonCrew = RawPersonCrewMovie | RawPersonCrewTv;
export type RawPersonCast = RawPersonCastMovie | RawPersonCastTv;

export interface RawPersonCredits {
    id: number;
    cast: RawPersonCast[];
    crew: RawPersonCrew[];
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
    results: RawBaseMovie[] | RawBaseTv[]
}

export interface RawTrendingList extends RawList {
    results: RawBaseMovie[] | RawBasePerson[] | RawTrendingTv[],
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

interface _RawBaseMedia {
    id: number;
    overview: string;
    poster_path: string;
    backdrop_path: string;
}

interface _RawBase extends _RawBaseMedia {
    adult: boolean;
    popularity: number;
    vote_average: number;
    vote_count: number
}

interface _RawBaseInfo {
    original_language: string;
    original_title: string;
    title: string;
    release_date: Date;
    video: boolean;
}

type _RawBaseMovie = _RawBase & _RawBaseInfo;

// for both tv season and tv episode
interface _RawTvPart {
    id: number;
    overview: string;
    air_date: Date;
    name: string;
    season_number: number;
    vote_average: number
}

export interface RawSearchTv extends _RawBaseTv {
    media_type: UMediaTypes;
}

export interface RawSearchPerson extends _RawPerson {
    media_type: UMediaTypes;

}

export type RawSearchResult = RawSearchPerson | RawSearchMovie | RawSearchTv;
export type RawSearch = {
    results: RawSearchResult[],
    page: number,
    total_pages: number,
    total_results: number
};

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

interface RawTvCreator {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string
}