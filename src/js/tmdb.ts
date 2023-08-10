import {
  LOCALES,
  DEFAULT_LOCALE,
  API_BASE,
  API_KEY,
  API_POSTER_BASE,
  API_BACKDROP_BASE,
  POSTER_NO_IMAGE,
  COLLECTIONS
} from './config';

import {
  Genre,
  Collection,
  Part,
  ListTypes,
  ListData,
  Movie,
  Person,
  MovieCredits,
  TvShow,
  TvShowSeason,
  TrendingType,
  TrendingTvShow,
  Crew,
  Cast,
} from './types';

import {
  RawCollection,
  RawCollectionPart,
  RawMovie,
  RawMovieCredits,
  RawPeople,
  RawTvShow,
  RawTvShowSeason,
  RawMoviesList,
  RawTrendingPeople,
  RawTrendingList,
  RawCast,
  RawCrew,
  RawTrendingTvShow,
} from './raw-tmdb.types';

export default class TMDB {
  static allGenres: Genre[] = [];

  static async #getJSON<T>(url: string, params: string = ''): Promise<T> {
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

  /**
   * Formats a date object 
   * @param date - The date object to be formatted.
   * @returns An object with the 'MMM DD, YYYY' date and the year itself.
   */
  static #formatDate(date: Date) {
    if (!date) return { full: '-', year: '' };

    const localeString = `${DEFAULT_LOCALE}-${LOCALES[DEFAULT_LOCALE]}`; // 'en-US'
    const full = date.toLocaleDateString(localeString, { month: 'short', day: 'numeric', year: 'numeric' });
    const year = date.getFullYear() + '';
    return { full, year };
  }

  static #kebabText(link: string) {
    return link.toLowerCase()
      .replace(/:/g, '') // remove colons
      .replace(/,/g, '') // remove commas
      .replace(/[^a-z0-9\s-]/g, '') // remove non-alphanumeric characters except spaces and hyphens
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/-+/g, '-') // remove consecutive hyphens
      .replace(/^-+|-+$/g, ''); // remove leading and trailing hyphens
  }

  static #createLink(type: string, id: number, title: string) {
    const _type = type ? type : 'movie';
    return `/${_type}/${id}-${this.#kebabText(title)}`;
  }

  static #getPosterUrl(posterPath: string | null) {
    return posterPath
      ? `${API_POSTER_BASE}${posterPath}`
      : POSTER_NO_IMAGE;
  }

  static #formatPartData(part: RawCollectionPart): Part {
    const poster = this.#getPosterUrl(part.poster_path);

    const date = this.#formatDate(new Date(part.release_date));

    const formatedData: Part = {
      adult: part.adult,
      backdrop: `${API_BACKDROP_BASE}${part.backdrop_path}`,
      genres: this.#convertMovieGenres(part.genre_ids),
      id: part.id,
      link: this.#createLink(part.media_type, part.id, part.title),
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

  static #formatPartsData(movies: RawCollectionPart[]): Part[] {
    return movies.map(movie => this.#formatPartData(movie));
  }

  static #formatTvShowData(tv: RawTvShow): TvShow {
    const poster = this.#getPosterUrl(tv.poster_path);

    const date = this.#formatDate(new Date(tv.first_air_date));
    const finishedDate = this.#formatDate(new Date(tv.last_air_date));

    const formatedData: TvShow = {
      adult: tv.adult,
      backdrop: `${API_BACKDROP_BASE}${tv.backdrop_path}`,
      episodes_qty: tv.number_of_episodes,
      finished: { date: finishedDate.full, year: finishedDate.year },
      genres: tv.genres,
      id: tv.id,
      in_production: tv.in_production,
      link: this.#createLink('tv', tv.id, tv.name),
      overview: tv.overview,
      popularity: tv.popularity,
      poster: poster,
      released: { date: date.full, year: date.year },
      seasons_qty: tv.number_of_seasons,
      seasons: this.#formatTvShowSeasonsData(tv.seasons),
      status: tv.status,
      tagline: tv.tagline,
      title: tv.name,
      type: 'tv',
      votes: { average: +tv.vote_average?.toFixed(1), count: tv.vote_count },
    }

    return formatedData;
  }

  static #formatBasicTvShowData(tv: RawTrendingTvShow): TrendingTvShow {
    const poster = this.#getPosterUrl(tv.poster_path);

    const date = this.#formatDate(new Date(tv.first_air_date));

    const formatedData: TrendingTvShow = {
      adult: tv.adult,
      backdrop: `${API_BACKDROP_BASE}${tv.backdrop_path}`,
      genres: this.#convertMovieGenres(tv.genre_ids),
      id: tv.id,
      link: this.#createLink('tv', tv.id, tv.name),
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

  static #formatBasicTvShowsData(shows: RawTrendingTvShow[]): TrendingTvShow[] {
    return shows.map(show => this.#formatBasicTvShowData(show));
  }

  static #formatTvShowSeasonData(season: RawTvShowSeason): TvShowSeason {
    const poster = this.#getPosterUrl(season.poster_path);

    const date = this.#formatDate(new Date(season.air_date));

    const formatedData: TvShowSeason = {
      episodes_qty: season.episode_count,
      id: season.id,
      link: this.#createLink('season', season.season_number, season.name),
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

  static #formatTvShowSeasonsData(seasons: RawTvShowSeason[]): TvShowSeason[] {
    return seasons.map(season => this.#formatTvShowSeasonData(season));
  }

  static #formatMovieData(movie: RawMovie): Movie {
    const poster = this.#getPosterUrl(movie.poster_path);

    const date = this.#formatDate(new Date(movie.release_date));

    const formatedData: Movie = {
      adult: movie.adult,
      backdrop: `${API_BACKDROP_BASE}${movie.backdrop_path}`,
      belongs_to_collection: movie.belongs_to_collection || null,
      budget: movie.budget,
      genres: movie.genres,
      link: this.#createLink('movie', movie.id, movie.title),
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

  static #formatPersonData(person: RawPeople | RawCast | RawCrew | RawTrendingPeople): Person | Cast | Crew {
    const poster = this.#getPosterUrl(person.profile_path);

    const formatedData: Person = {
      id: person.id,
      link: this.#createLink('person', person.id, person.name),
      type: 'person',
      department: person.known_for_department,
      name: person.name,
      popularity: person.popularity,
      poster: poster,
    }

    // specific tests for cast and crew data
    if ((person as RawCast).cast_id) (formatedData as Cast).cast_id = (person as RawCast).cast_id;
    if ((person as RawCast).character) (formatedData as Cast).character = (person as RawCast).character;
    if ((person as RawCast).order) (formatedData as Cast).order = (person as RawCast).order;
    if ((person as RawCrew).job) (formatedData as Crew).job = (person as RawCrew).job;

    return formatedData;
  }

  static #formatPersonsData(credits: RawCast[] | RawCrew[] | RawTrendingPeople[]): Person[] | Cast[] | Crew[] {
    return credits.map(person => this.#formatPersonData(person));
  }

  static async #getAllGenres<T extends Genre>() {
    if (Object.keys(this.allGenres).length > 0) return;

    const params = `language=${DEFAULT_LOCALE}`;
    const response = await this.#getJSON('/genre/movie/list', params) as { genres: T[] };
    this.allGenres = response.genres;
  }

  static #convertMovieGenres(genres: number[]): Genre[] {
    this.#getAllGenres();
    const convertedGenres: Genre[] = [];

    genres.forEach(id => {
      const filtered = this.allGenres.filter(genre => genre.id === id);
      if (filtered.length) convertedGenres.push(filtered[0]);
    });

    return convertedGenres;
  }

  // get page with 20 of 'top_rated', 'upcoming' or 'now_playing' movies
  static async getMoviesList(
    page: number,
    listType: ListTypes
  ): Promise<ListData> {
    let url = '';
    let params = '';
    if (listType === 'upcoming') {
      const oneWeekLater = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000);
      const oneWeekLaterStr = oneWeekLater.toISOString().split('T')[0];
      // get movies that will be released starts from tomorrow
      url = `/discover/movie`;
      params = `sort_by=primary_release_date.asc&primary_release_date.gte=${oneWeekLaterStr}`;
    } else {
      url = `/movie/${listType}`;
      params = `page=${page}`;
    }

    const data: RawMoviesList = await this.#getJSON(url, params);
    const movies = this.#formatPartsData(data.results as RawCollectionPart[]);

    return {
      movies,
      current_page: data.page,
      total_pages: data.total_pages,
    };
  }

  static async getCollection(id: number): Promise<Collection> {
    const url = `/collection/${id}`;
    const data: RawCollection = await this.#getJSON(url);

    const collection: Collection = {
      backdrop: `${API_BACKDROP_BASE}${data.backdrop_path}`,
      id: data.id,
      link: this.#createLink('collection', data.id, data.name),
      title: data.name,
      overview: data.overview,
      parts: this.#formatPartsData(data.parts),
      partsCount: data.parts.length,
      poster: `${API_POSTER_BASE}${data.poster_path}`,
      type: 'collection',
    }

    return collection;
  }

  static async getRandomCollection(): Promise<Collection> {
    const randomCollectionId = COLLECTIONS[Math.floor(Math.random() * COLLECTIONS.length)];
    return await this.getCollection(randomCollectionId);
  }

  static async getTrending(type: TrendingType, period: 'day' | 'week' = 'week') {
    const url = `/trending/${type}/${period}`;
    const data: RawTrendingList = await this.#getJSON(url);

    let trending: Part[] | Person[] | TrendingTvShow[] = [];

    switch (type) {
      case 'movie':
        trending = this.#formatPartsData(data.results as RawCollectionPart[]) as Part[];
        break;
      case 'tv':
        trending = this.#formatBasicTvShowsData(data.results as RawTrendingTvShow[]) as TrendingTvShow[];
        break;
      case 'person':
        trending = this.#formatPersonsData(data.results as RawTrendingPeople[]) as Person[];
        break;
      default:
        console.error('Wrong trending type');
        trending = [];
    }

    return trending;
  }

  static async getMovie(id: number): Promise<Movie> {
    const url = `/movie/${id}`;
    const data: RawMovie = await this.#getJSON(url);

    const movie = this.#formatMovieData(data);

    return movie;
  }

  static async getMovieCredits(id: number): Promise<MovieCredits> {
    const url = `/movie/${id}/credits`;
    const data: RawMovieCredits = await this.#getJSON(url);

    const cast = this.#formatPersonsData(data.cast) as Cast[];
    const crew = this.#formatPersonsData(data.crew) as Crew[];

    return { cast, crew };
  }

  static async getPeople(id: number): Promise<Person> {
    const url = `/person/${id}`;
    const data: RawPeople = await this.#getJSON(url);

    const person = this.#formatPersonData(data);

    return person;
  }

  static async getTvShow(id: number): Promise<TvShow> {
    const url = `/tv/${id}`;
    const data: RawTvShow = await this.#getJSON(url);
    const tv = this.#formatTvShowData(data);
    return tv;
  }
}
