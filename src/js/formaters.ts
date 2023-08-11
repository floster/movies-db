/////////////////////////////////////////
////////// TMDB API formatters //////////
/////////////////////////////////////////

import { RawBasePerson, RawCast, RawCollectionPart, RawCrew, RawMovie, RawPerson, RawTrendingTvShow, RawTvShow, RawTvShowSeason } from "../types/raw-tmdb.types";
import { IBasePerson, IMovie, IMovieCast, IMovieCrew, IPart, IPerson, ITrendingTvShow, ITvShow, ITvShowSeason } from "../types/tmdb.types";
import { API_BACKDROP_BASE } from "./config";
import { createLink, formatDate, getPosterUrl } from "./helpers";

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
