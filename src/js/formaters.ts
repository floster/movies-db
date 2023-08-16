/////////////////////////////////////////
////////// TMDB API formatters //////////
/////////////////////////////////////////

import { RawBaseMovie, RawBasePerson, RawBaseTv, RawCast, RawCollection, RawCollectionPart, RawCrew, RawMovie, RawPerson, RawPersonCast, RawPersonCastMovie, RawPersonCastTv, RawPersonCrew, RawPersonCrewMovie, RawPersonCrewTv, RawTv, RawTvEpisode, RawTvSeason } from "../types/raw-tmdb.types";
import { IBasePerson, IMovie, IMovieCast, IMovieCrew, IBaseMovie, IPerson, IBaseTv, ITv, ITvSeason, IPersonCrew, IPersonCast, ITvEpisode, UTileData, UMediaTypes, ITileData, ICollection } from "../types/tmdb.types";
import { API_BACKDROP_BASE } from "./config";
import { createLink, formatDate, getPosterUrl } from "./helpers";

export function formatTileData<T extends UTileData>(
    tile: T,
    type: UMediaTypes,
    label: keyof T | [keyof T, string],
    rating: boolean,
    favorite: boolean
): ITileData {
    const votes = rating && ('votes' in tile)
        ? { average: tile.votes.average, count: tile.votes.count }
        : null;

    const link = ('link' in tile) ? tile.link : null;
    const year = (tile as IBaseMovie).year || null;

    const dataType = (tile as IPersonCast).media_type || tile.type || type;

    const labelText = (typeof label === 'object') ? `${tile[label[0]]} ${label[1]}` : `${tile[label]}`;

    return {
        id: tile.id,
        type: dataType,
        link: link,
        poster: tile.poster!,
        title: tile.title,
        label: labelText,
        rating: votes,
        favorite: favorite,
        year
    }
}

export function formatTilesData<T extends UTileData>(
    data: T[],
    type: UMediaTypes,
    label: keyof T | [keyof T, string],
    rating: boolean,
    favorite: boolean
): ITileData[] {
    return data.map((item) => formatTileData(item, type, label, rating, favorite));
}

export function formatCollection(collection: RawCollection): ICollection {
    const poster = getPosterUrl(collection.poster_path);

    return {
        backdrop: `${API_BACKDROP_BASE}${collection.backdrop_path}`,
        id: collection.id,
        link: createLink('collection', collection.id, collection.name),
        title: collection.name,
        overview: collection.overview,
        parts: formatBaseMovies(collection.parts),
        partsCount: collection.parts.length,
        poster,
        type: 'collection',
    }
}

export function formatBaseMovie(part: RawBaseMovie): IBaseMovie {
    const poster = getPosterUrl(part.poster_path);

    const date = formatDate(part.release_date);

    const formatedData: IBaseMovie = {
        adult: part.adult,
        backdrop: `${API_BACKDROP_BASE}${part.backdrop_path}`,
        genres: [], // convertMovieGenres(part.genre_ids),
        id: part.id,
        link: createLink('movie', part.id, part.title),
        type: 'movie',
        overview: part.overview,
        popularity: part.popularity,
        poster,
        released: date.full,
        year: date.year,
        title: part.title,
        votes: { average: +part.vote_average?.toFixed(1), count: part.vote_count },
    }

    return formatedData;
}

export function formatBaseMovies(movies: RawCollectionPart[]): IBaseMovie[] {
    return movies.map(movie => formatBaseMovie(movie));
}

export function formatTv(tv: RawTv): ITv {
    const poster = getPosterUrl(tv.poster_path);

    const date = formatDate(tv.first_air_date);
    const finishedDate = formatDate(tv.last_air_date);

    const formatedData: ITv = {
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
        released: date.full,
        year: date.year,
        seasons_qty: tv.number_of_seasons,
        seasons: formatTvSeasons(tv.seasons),
        status: tv.status,
        tagline: tv.tagline,
        title: tv.name,
        type: 'tv',
        votes: { average: +tv.vote_average?.toFixed(1), count: tv.vote_count },
    }

    return formatedData;
}

export function formatBaseTv(tv: RawBaseTv): IBaseTv {
    const poster = getPosterUrl(tv.poster_path);

    const date = formatDate(tv.first_air_date);

    const formatedData: IBaseTv = {
        adult: tv.adult,
        backdrop: `${API_BACKDROP_BASE}${tv.backdrop_path}`,
        genres: [], //convertMovieGenres(tv.genre_ids),
        id: tv.id,
        link: createLink('tv', tv.id, tv.name),
        overview: tv.overview,
        popularity: tv.popularity,
        poster: poster,
        released: date.full,
        year: date.year,
        title: tv.name,
        type: 'tv',
        votes: { average: +tv.vote_average?.toFixed(1), count: tv.vote_count },
    }

    return formatedData;
}

export function formatBaseTvs(shows: RawBaseTv[]): IBaseTv[] {
    return shows.map(show => formatBaseTv(show));
}

export function formatTvSeason(season: RawTvSeason): ITvSeason {
    const poster = getPosterUrl(season.poster_path);
    const date = formatDate(season.air_date);
    const episodesQty = season.episodes?.length || season.episode_count || 0;

    const episodes = season.episodes?.length ? formatTvEpisodes(season.episodes) : [];

    const formatedData: ITvSeason = {
        episodes_qty: episodesQty,
        episodes,
        id: season.id,
        title: season.name,
        overview: season.overview,
        poster: poster,
        released: date.full,
        year: date.year,
        season_number: season.season_number,
        type: 'season',
        votes: { average: +season.vote_average?.toFixed(1), count: 0 },
    }

    return formatedData;
}

export function formatTvSeasons(seasons: RawTvSeason[]): ITvSeason[] {
    return seasons.map(season => formatTvSeason(season));
}

export function formatTvEpisode(episode: RawTvEpisode): ITvEpisode {
    const date = formatDate(episode.air_date);

    return {
        id: episode.id,
        title: episode.name,
        overview: episode.overview,
        poster: getPosterUrl(episode.still_path),
        released: date.full,
        year: date.year,
        season_number: episode.season_number,
        type: 'episode',
        votes: { average: +episode.vote_average?.toFixed(1), count: episode.vote_count },
        episode_number: episode.episode_number,
        episode_type: episode.episode_type,
        runtime: episode.runtime,
        show_id: episode.show_id
    }
}

export function formatTvEpisodes(episodes: RawTvEpisode[]): ITvEpisode[] {
    return episodes.map(episode => formatTvEpisode(episode));
}

export function formatMovie(movie: RawMovie): IMovie {
    const poster = getPosterUrl(movie.poster_path);

    const date = formatDate(movie.release_date);

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
        released: date.full,
        year: date.year,
        revenue: movie.revenue,
        status: movie.status,
        tagline: movie.tagline,
        title: movie.title,
        type: 'movie', // 'movie' | 'tv
        votes: { average: +movie.vote_average?.toFixed(1), count: movie.vote_count },
    }

    return formatedData;
}

export function formatBasePerson(person: RawBasePerson): IBasePerson {
    const poster = getPosterUrl(person.profile_path);

    const formatedData: IBasePerson = {
        id: person.id,
        link: createLink('person', person.id, person.name),
        type: 'person',
        department: person.known_for_department,
        title: person.name,
        popularity: person.popularity,
        poster: poster,
    }

    return formatedData;
}

export function formatPerson(member: RawPerson): IPerson {
    const basicData = formatBasePerson(member);

    const birthday = formatDate(member.birthday);
    const deathday = formatDate(member.deathday ? member.deathday : null);

    return {
        ...basicData,
        backdrop: '',
        birthday: { date: birthday.full, year: birthday.year },
        deathday: { date: deathday.full, year: deathday.year },
        overview: member.biography,
        place_of_birth: member.place_of_birth,
    }
}

export function formatPersonCrew(credits: RawPersonCrew[]): IPersonCrew[] {
    return credits.map((credit: RawPersonCrew) => {
        let baseData: IBaseMovie | IBaseTv;
        if (credit.media_type === 'movie') {
            baseData = formatBaseMovie(credit as RawPersonCrewMovie);
        } else {
            baseData = formatBaseTv(credit as RawPersonCrewTv);
        }

        return {
            ...baseData,
            media_type: credit.media_type,
            department: credit.department,
            job: credit.job
        }
    })
}

export function formatPersonCast(credits: RawPersonCast[]): IPersonCast[] {
    return credits.map((credit: RawPersonCast) => {
        let baseData: IBaseMovie | IBaseTv;
        if (credit.media_type === 'movie') {
            baseData = formatBaseMovie(credit as RawPersonCastMovie);
        } else {
            baseData = formatBaseTv(credit as RawPersonCastTv);
        }

        return {
            ...baseData,
            media_type: credit.media_type,
            character: credit.character,
        }
    })
}

export function formatCastMember(member: RawCast): IMovieCast {
    const basicData = formatBasePerson(member);

    return {
        ...basicData,
        cast_id: member.cast_id,
        character: member.character,
        order: member.order,
    }
}

export function formatCrewMember(member: RawCrew): IMovieCrew {
    const basicData = formatBasePerson(member);

    return {
        ...basicData,
        job: member.job,
    }
}

export function formatPersons(credits: RawCast[] | RawCrew[] | RawBasePerson[], type: 'crew' | 'cast' | 'base'): IBasePerson[] | IMovieCast[] | IMovieCrew[] {
    let data: IBasePerson[] | IMovieCast[] | IMovieCrew[] = [];

    switch (type) {
        case 'base':
            data = credits.map(credit => formatBasePerson(credit as RawBasePerson));
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
