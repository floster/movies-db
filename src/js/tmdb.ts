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
  RawCollection,
  Collection,
  RawPart,
  Part,
  RawListData,
  ListTypes,
  ListData,
  MediaType,
  Movie,
  RawMovie,
  RawPerson,
  Person,
  MovieCredits,
  RawMovieCredits,
  TvShow,
  RawTvShow,
  RawTvShowSeason,
  TvShowSeason,
} from './types';

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
    const localeString = `${DEFAULT_LOCALE}-${LOCALES[DEFAULT_LOCALE]}`; // 'en-US'
    const full = date.toLocaleDateString(localeString, { month: 'short', day: 'numeric', year: 'numeric' });
    const year = date.getFullYear();
    return { full, year };
  }

  static #getPosterUrl(posterPath: string | null) {
    return posterPath
      ? `${API_POSTER_BASE}${posterPath}`
      : POSTER_NO_IMAGE;
  }

  static #formatPartData(part: RawPart): Part {
    const poster = this.#getPosterUrl(part.poster_path);

    // if part is a tv show, then it has 'first_air_date' property
    // if part is a movie, then it has 'release_date' property
    const dateProp = part.release_date ? part['release_date'] : part['first_air_date'];
    const date = this.#formatDate(new Date(dateProp!));

    const formatedData: Part = {
      adult: part.adult,
      backdrop: `${API_BACKDROP_BASE}${part.backdrop_path}`,
      genres: this.#convertMovieGenres(part.genre_ids),
      id: part.id,
      type: part.media_type,
      overview: part.overview,
      popularity: part.popularity,
      poster: poster,
      released: { date: date.full, year: date.year },
      title: part.title! || part.name!,
      votes: { average: +part.vote_average?.toFixed(1), count: part.vote_count },
    }

    return formatedData;
  }

  static #formatPartsData(movies: RawPart[]): Part[] {
    return movies.map(movie => this.#formatPartData(movie));
  }

  static #formatTvShowData(tv: RawTvShow): TvShow {
    const poster = this.#getPosterUrl(tv.poster_path);

    const date = this.#formatDate(new Date(tv.release_date));
    const finishedDate = this.#formatDate(new Date(tv.last_air_date));

    const formatedData: TvShow = {
      adult: tv.adult,
      backdrop: `${API_BACKDROP_BASE}${tv.backdrop_path}`,
      episodes_qty: tv.number_of_episodes,
      finished: { date: finishedDate.full, year: finishedDate.year },
      genres: tv.genres,
      id: tv.id,
      in_production: tv.in_production,
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

  static #formatTvShowSeasonData(season: RawTvShowSeason): TvShowSeason {
    const poster = this.#getPosterUrl(season.poster_path);

    const date = this.#formatDate(new Date(season.air_date));

    const formatedData: TvShowSeason = {
      episodes_qty: season.episode_count,
      id: season.id,
      name: season.name,
      overview: season.overview,
      poster: poster,
      released: { date: date.full, year: date.year },
      season_number: season.season_number,
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

  static #formatPersonData(person: RawPerson): Person {
    const poster = this.#getPosterUrl(person.profile_path);

    const formatedData: Person = {
      id: person.id,
      type: 'person',
      department: person.known_for_department,
      name: person.name,
      popularity: person.popularity,
      poster: poster,
    }

    if (person.cast_id) formatedData.cast_id = person.cast_id;
    if (person.character) formatedData.character = person.character;
    if (person.order) formatedData.order = person.order;
    if (person.job) formatedData.job = person.job;

    return formatedData;
  }

  static #formatPersonsData(credits: RawPerson[]): Person[] {
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

    const data: RawListData = await this.#getJSON(url, params);
    const movies = this.#formatPartsData(data.results as RawPart[]);

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

  static async getTrending(type: MediaType, period: 'day' | 'week' = 'week') {
    const url = `/trending/${type}/${period}`;
    const data: RawListData = await this.#getJSON(url);

    let trending: Part[] | Person[] = [];

    if (type === 'person') {
      trending = this.#formatPersonsData(data.results as RawPerson[]) as Person[];
    } else {
      trending = this.#formatPartsData(data.results as RawPart[]) as Part[];
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

    const cast = this.#formatPersonsData(data.cast);
    const crew = this.#formatPersonsData(data.crew);

    return { cast, crew };
  }

  static async getPerson(id: number): Promise<Person> {
    const url = `/person/${id}`;
    const data: RawPerson = await this.#getJSON(url);

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

