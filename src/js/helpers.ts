import { API_BACKDROP_BASE, API_BASE, API_KEY, API_POSTER_BASE, DEFAULT_LOCALE, LOCALES, POSTER_NO_IMAGE } from "./config";
import { RawBasePerson, RawCast, RawCollectionPart, RawCrew, RawMovie, RawPerson, RawTrendingTvShow, RawTvShow, RawTvShowSeason } from "../types/raw-tmdb.types";
import { IBasePerson, IMovie, IMovieCast, IMovieCrew, IPart, IPerson, ITrendingTvShow, ITvShow, ITvShowSeason } from "../types/tmdb.types";


/**
 * Fetches JSON data from the specified URL with the provided parameters.
 * @template T - The type of data to fetch and return.
 * @param {string} url - The URL to fetch data from.
 * @param {string} [params=''] - The query parameters to include in the URL.
 * @returns {Promise<T>} - A Promise that resolves with the fetched data.
 * @throws {Error} - If an error occurs while fetching data.
 */
export async function getJSON<T>(url: string, params: string = ''): Promise<T> {
    const fetchUrl = `${API_BASE}${url}`;
    const fetchParams = new URLSearchParams(params);
    fetchParams.append('api_key', API_KEY);
    fetchParams.append('language', DEFAULT_LOCALE);
    fetchParams.append('region', LOCALES[DEFAULT_LOCALE]);

    const response: Response = await fetch(fetchUrl + '?' + fetchParams.toString());

    if (!response.ok) throw new Error(`getJSON: Error fetching data for URL: ${url}`);

    const data: T = await response.json();
    return data;
}

// general formatters
/**
 * Formats a date object 
 * @param date - The date object to be formatted.
 * @returns An object with the 'MMM DD, YYYY' date and the year itself.
 */
export const formatDate = (date: Date) => {
    if (!date) return { full: '-', year: '' };

    const localeString = `${DEFAULT_LOCALE}-${LOCALES[DEFAULT_LOCALE]}`; // 'en-US'
    const full = date.toLocaleDateString(localeString, { month: 'short', day: 'numeric', year: 'numeric' });
    const year = date.getFullYear() + '';
    return { full, year };
}

export const kebabText = (link: string) => {
    return link.toLowerCase()
        .replace(/:/g, '') // remove colons
        .replace(/,/g, '') // remove commas
        .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric characters except spaces and hyphens
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-') // remove consecutive hyphens
        .replace(/^-+|-+$/g, ''); // remove leading and trailing hyphens
}

export const createLink = (type: string, id: number, title: string) => {
    const _type = type ? type : 'movie';
    return `/${_type}/${id}-${kebabText(title)}`;
}

export const getPosterUrl = (posterPath: string | null) => {
    return posterPath
        ? `${API_POSTER_BASE}${posterPath}`
        : POSTER_NO_IMAGE;
}

// TMDB API formatters
export function formatPartData(part: RawCollectionPart): IPart {
    const poster = getPosterUrl(part.poster_path);

    const date = formatDate(new Date(part.release_date));

    const formatedData: IPart = {
        adult: part.adult,
        backdrop: `${API_BACKDROP_BASE}${part.backdrop_path}`,
        genres: [], // convertMovieGenres(part.genre_ids),
        id: part.id,
        link: createLink(part.media_type, part.id, part.title),
        type: part.media_type,
        overview: part.overview,
        popularity: part.popularity,
        poster: poster,
        released: { date: date.full, year: date.year },
        title: part.title,
        votes: { average: +part.vote_average?.toFixed(1), count: part.vote_count },
    }

    return formatedData;
}

export function formatPartsData(movies: RawCollectionPart[]): IPart[] {
    return movies.map(movie => formatPartData(movie));
}

export function formatTvShowData(tv: RawTvShow): ITvShow {
    const poster = getPosterUrl(tv.poster_path);

    const date = formatDate(new Date(tv.first_air_date));
    const finishedDate = formatDate(new Date(tv.last_air_date));

    const formatedData: ITvShow = {
        adult: tv.adult,
        backdrop: `${API_BACKDROP_BASE}${tv.backdrop_path}`,
        episodes_qty: tv.number_of_episodes,
        finished: { date: finishedDate.full, year: finishedDate.year },
        genres: tv.genres,
        id: tv.id,
        in_production: tv.in_production,
        link: createLink('tv', tv.id, tv.name),
        overview: tv.overview,
        popularity: tv.popularity,
        poster: poster,
        released: { date: date.full, year: date.year },
        seasons_qty: tv.number_of_seasons,
        seasons: formatTvShowSeasonsData(tv.seasons),
        status: tv.status,
        tagline: tv.tagline,
        title: tv.name,
        type: 'tv',
        votes: { average: +tv.vote_average?.toFixed(1), count: tv.vote_count },
    }

    return formatedData;
}

export function formatBasicTvShowData(tv: RawTrendingTvShow): ITrendingTvShow {
    const poster = getPosterUrl(tv.poster_path);

    const date = formatDate(new Date(tv.first_air_date));

    const formatedData: ITrendingTvShow = {
        adult: tv.adult,
        backdrop: `${API_BACKDROP_BASE}${tv.backdrop_path}`,
        genres: [], //convertMovieGenres(tv.genre_ids),
        id: tv.id,
        link: createLink('tv', tv.id, tv.name),
        overview: tv.overview,
        popularity: tv.popularity,
        poster: poster,
        released: { date: date.full, year: date.year },
        title: tv.name,
        type: 'tv',
        votes: { average: +tv.vote_average?.toFixed(1), count: tv.vote_count },
    }

    return formatedData;
}

export function formatBasicTvShowsData(shows: RawTrendingTvShow[]): ITrendingTvShow[] {
    return shows.map(show => formatBasicTvShowData(show));
}

export function formatTvShowSeasonData(season: RawTvShowSeason): ITvShowSeason {
    const poster = getPosterUrl(season.poster_path);

    const date = formatDate(new Date(season.air_date));

    const formatedData: ITvShowSeason = {
        episodes_qty: season.episode_count,
        id: season.id,
        link: createLink('season', season.season_number, season.name),
        name: season.name,
        overview: season.overview,
        poster: poster,
        released: { date: date.full, year: date.year },
        season_number: season.season_number,
        type: 'season',
        votes: { average: +season.vote_average?.toFixed(1), count: 0 },
    }

    return formatedData;
}

export function formatTvShowSeasonsData(seasons: RawTvShowSeason[]): ITvShowSeason[] {
    return seasons.map(season => formatTvShowSeasonData(season));
}

export function formatMovieData(movie: RawMovie): IMovie {
    const poster = getPosterUrl(movie.poster_path);

    const date = formatDate(new Date(movie.release_date));

    const formatedData: IMovie = {
        adult: movie.adult,
        backdrop: `${API_BACKDROP_BASE}${movie.backdrop_path}`,
        belongs_to_collection: movie.belongs_to_collection || null,
        budget: movie.budget,
        genres: movie.genres,
        link: createLink('movie', movie.id, movie.title),
        id: movie.id,
        overview: movie.overview,
        popularity: movie.popularity,
        poster: poster,
        released: { date: date.full, year: date.year },
        revenue: movie.revenue,
        status: movie.status,
        tagline: movie.tagline,
        title: movie.title,
        type: 'movie', // 'movie' | 'tv
        votes: { average: +movie.vote_average?.toFixed(1), count: movie.vote_count },
    }

    return formatedData;
}

export function formatBasePersonData(person: RawBasePerson): IBasePerson {
    const poster = getPosterUrl(person.profile_path);

    const formatedData: IBasePerson = {
        id: person.id,
        link: createLink('person', person.id, person.name),
        type: 'person',
        department: person.known_for_department,
        name: person.name,
        popularity: person.popularity,
        poster: poster,
    }

    return formatedData;
}

export function formatPerson(member: RawPerson): IPerson {
    const basicData = formatBasePersonData(member);

    return {
        ...basicData,
        birthday: member.birthday,
        deathday: member.deathday ? member.deathday : null,
        biography: member.biography,
        place_of_birth: member.place_of_birth,
    }
}

export function formatCastMember(member: RawCast): IMovieCast {
    const basicData = formatBasePersonData(member);

    return {
        ...basicData,
        cast_id: member.cast_id,
        character: member.character,
        order: member.order,
    }
}

export function formatCrewMember(member: RawCrew): IMovieCrew {
    const basicData = formatBasePersonData(member);

    return {
        ...basicData,
        job: member.job,
    }
}

export function formatPersonsData(credits: RawCast[] | RawCrew[] | RawBasePerson[], type: 'crew' | 'cast' | 'base'): IBasePerson[] | IMovieCast[] | IMovieCrew[] {
    let data: IBasePerson[] | IMovieCast[] | IMovieCrew[] = [];

    switch (type) {
        case 'base':
            data = credits.map(credit => formatBasePersonData(credit as RawBasePerson));
            break;
        case 'cast':
            data = credits.map(credit => formatCastMember(credit as RawCast));
            break;
        case 'crew':
            data = credits.map(credit => formatCrewMember(credit as RawCrew));
            break;
        default:
            break;
    }

    return data;
}
