import {
  COLLECTIONS
} from './config';

import {
  IGenre,
  ICollection,
  IBaseMovie,
  UTListTypes,
  IListData,
  IMovie,
  IBasePerson,
  IMovieCredits,
  ITv,
  UTFavoritesType,
  IBaseTv,
  IMovieCrew,
  IMovieCast,
  IPerson,
  ITvSeason,
  IQuickSearchResult,
  ISearchResults,
} from '../types/tmdb.types';

import {
  RawCollection,
  RawSearchMovie,
  RawMovie,
  RawMovieCredits,
  RawPerson,
  RawTv,
  RawMoviesList,
  RawTrendingList,
  RawTrendingTv,
  RawBasePerson,
  RawPersonCredits,
  RawTvSeason,
  RawBaseTv,
  RawSearch,
} from '../types/raw-tmdb.types';

import { getCurrentLocale, getLocalCountryCode } from './helpers';

import {
  formatBaseTvs,
  formatMovie,
  formatBaseMovies,
  formatPerson,
  formatPersons,
  formatTv,
  formatPersonCrew,
  formatPersonCast,
  formatTvSeason,
  formatCollection,
  formatSearchResults,
  formatQuickSearchResults
} from './formatters';

export default class TMDB {
  static allGenres: IGenre[] = [];

  /**
   * Fetches JSON data from the specified URL with the provided parameters.
   * @template T - The type of data to fetch and return.
   * @param {string} url - The URL to fetch data from.
   * @param {string} [params=''] - The query parameters to include in the URL.
   * @returns {Promise<T>} - A Promise that resolves with the fetched data.
   * @throws {Error} - If an error occurs while fetching data.
   */
  static async getJSON<T>(url: string, params: string = ''): Promise<T> {
    const fetchUrl = import.meta.env.VITE_API_BASE + url;
    const fetchParams = new URLSearchParams(params);
    fetchParams.append('api_key', import.meta.env.VITE_API_KEY);
    fetchParams.append('language', getCurrentLocale());
    fetchParams.append('region', getLocalCountryCode());

    const response: Response = await fetch(fetchUrl + '?' + fetchParams.toString());

    if (!response.ok) throw new Error(`getJSON: Error fetching data for URL: ${url}`);

    const data: T = await response.json();
    return data;
  }

  // TODO: make below working
  // static async #getAllGenres<T extends IGenre>() {
  //   if (Object.keys(this.allGenres).length > 0) return;

  //   const params = `language=${getCurrentLocale()}`;
  //   const response = await this.getJSON('/genre/movie/list', params) as { genres: T[] };
  //   this.allGenres = response.genres;
  // }

  // static #convertMovieGenres(genres: number[]): IGenre[] {
  //   this.#getAllGenres();
  //   const convertedGenres: IGenre[] = [];

  //   genres.forEach(id => {
  //     const filtered = this.allGenres.filter(genre => genre.id === id);
  //     if (filtered.length) convertedGenres.push(filtered[0]);
  //   });

  //   return convertedGenres;
  // }

  // get page with 20 of 'top_rated', 'upcoming' or 'now_playing' movies
  // along with popular and top rated tv shows
  static async getList(
    page: number,
    mediaType: 'movie' | 'tv',
    listType: UTListTypes,
  ): Promise<IListData> {
    let url = '';
    let params = '';
    if (listType === 'upcoming') {
      const oneWeekLater = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000);
      const oneWeekLaterStr = oneWeekLater.toISOString().split('T')[0];
      // get movies that will be released starts from tomorrow
      url = `/discover/movie`;
      params = `sort_by=primary_release_date.asc&primary_release_date.gte=${oneWeekLaterStr}`;
    } else {
      url = `/${mediaType}/${listType}`;
      params = `page=${page}`;
    }

    const data: RawMoviesList = await this.getJSON(url, params);
    const media = mediaType === 'movie'
      ? formatBaseMovies(data.results as RawSearchMovie[])
      : formatBaseTvs(data.results as RawBaseTv[]);

    return {
      media,
      media_type: mediaType,
      current_page: data.page,
      total_pages: data.total_pages,
    };
  }

  static async getCollection(id: number): Promise<ICollection> {
    const url = `/collection/${id}`;
    const data: RawCollection = await this.getJSON(url);

    const collection = formatCollection(data);

    return collection;
  }

  static getRandomCollectionId(): number {
    return COLLECTIONS[Math.floor(Math.random() * COLLECTIONS.length)];
  }

  static async getTrending(type: UTFavoritesType, period: 'day' | 'week' = 'week') {
    const url = `/trending/${type}/${period}`;
    const data: RawTrendingList = await this.getJSON(url);

    let trending: IBaseMovie[] | IBasePerson[] | IBaseTv[] = [];

    switch (type) {
      case 'movie':
        trending = formatBaseMovies(data.results as RawSearchMovie[]) as IBaseMovie[];
        break;
      case 'tv':
        trending = formatBaseTvs(data.results as RawTrendingTv[]) as IBaseTv[];
        break;
      case 'person':
        trending = formatPersons(data.results as RawBasePerson[], 'base') as IBasePerson[];
        break;
      default:
        console.error('Wrong trending type');
        trending = [];
    }

    return trending;
  }

  static async getMovie(id: number): Promise<IMovie> {
    const url = `/movie/${id}`;
    const data: RawMovie = await this.getJSON(url);

    const movie = formatMovie(data);

    return movie;
  }

  static async getMovieCredits(id: number): Promise<IMovieCredits> {
    const url = `/movie/${id}/credits`;
    const data: RawMovieCredits = await this.getJSON(url);

    const cast = formatPersons(data.cast, 'cast') as IMovieCast[];
    const crew = formatPersons(data.crew, 'crew') as IMovieCrew[];

    return { cast, crew };
  }

  static async getPerson(id: number): Promise<IPerson> {
    const url = `/person/${id}`;
    const data: RawPerson = await this.getJSON(url);

    const person = formatPerson(data);

    return person;
  }

  static async getPersonCredits(id: number) {
    const url = `/person/${id}/combined_credits`;
    const data: RawPersonCredits = await this.getJSON(url);

    const cast = formatPersonCast(data.cast);
    const crew = formatPersonCrew(data.crew);

    return { cast, crew };
  }

  static async getTvShow(id: number): Promise<ITv> {
    const url = `/tv/${id}`;
    const data: RawTv = await this.getJSON(url);
    const tv = formatTv(data);
    return tv;
  }

  static async getTvShowSeason(id: number, season: number): Promise<ITvSeason> {
    const url = `/tv/${id}/season/${season}`;
    const data: RawTvSeason = await this.getJSON(url);
    const tv = formatTvSeason(data);
    return tv;
  }

  static async getTvShowSeasons(tvId: number, seasonsQty: number): Promise<ITvSeason[]> {
    const seasons = [];
    for (let n = 1; n <= seasonsQty; n++) {
      const season = await this.getTvShowSeason(tvId, n);
      seasons.push(season);
    }

    return seasons;
  }

  static async getQuickSearch(query: string): Promise<IQuickSearchResult[]> {
    const url = `/search/multi`;
    const params = `query=${query}`;
    const data: RawSearch = await this.getJSON(url, params);

    const results = formatQuickSearchResults(data.results);
    return results;
  }

  static async getSearch(query: string, page: number = 1): Promise<ISearchResults> {
    const url = `/search/multi`;
    const params = `query=${query}&include_adult=false&page=${page}`;
    const data: RawSearch = await this.getJSON(url, params);

    const results = formatSearchResults(data);
    return results;
  }

  static async getAllSearch(query: string): Promise<ISearchResults> {
    // get first page of search results (20 results)
    const first = await this.getSearch(query);

    // ...fill results with first page (initial) data
    const { pages, movies, tvs, persons } = first;
    const results: ISearchResults = { pages, movies, tvs, persons };

    // ...than if pages > 1 get all other pages
    if (first.pages > 1) {
      // ...for that go through all pages and get results
      for (let n = 2; n <= first.pages; n++) {
        const next = await this.getSearch(query, n);
        const { movies, tvs, persons } = next;
        results.movies.push(...movies);
        results.tvs.push(...tvs);
        results.persons.push(...persons);
      }
    }

    return results;
  }
}
