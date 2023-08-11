import {
  LOCALES,
  DEFAULT_LOCALE,
  API_BASE,
  API_KEY,
  API_POSTER_BASE,
  API_BACKDROP_BASE,
  COLLECTIONS
} from './config';

import {
  IGenre,
  ICollection,
  IPart,
  UListTypes,
  IListData,
  IMovie,
  IBasePerson,
  IMovieCredits,
  ITvShow,
  UTrendingType,
  ITrendingTvShow,
  IMovieCrew,
  IMovieCast,
} from '../types/tmdb.types';

import {
  RawCollection,
  RawCollectionPart,
  RawMovie,
  RawMovieCredits,
  RawPerson,
  RawTvShow,
  RawMoviesList,
  RawTrendingList,
  RawTrendingTvShow,
  RawBasePerson,
} from '../types/raw-tmdb.types';

import { createLink, formatBasicTvShowsData, formatMovieData, formatPartsData, formatPerson, formatPersonsData, formatTvShowData, getJSON } from './helpers';

export default class TMDB {
  static allGenres: IGenre[] = [];

  // static async #getAllGenres<T extends IGenre>() {
  //   if (Object.keys(this.allGenres).length > 0) return;

  //   const params = `language=${DEFAULT_LOCALE}`;
  //   const response = await getJSON('/genre/movie/list', params) as { genres: T[] };
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
  static async getMoviesList(
    page: number,
    listType: UListTypes
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
      url = `/movie/${listType}`;
      params = `page=${page}`;
    }

    const data: RawMoviesList = await getJSON(url, params);
    const movies = formatPartsData(data.results as RawCollectionPart[]);

    return {
      movies,
      current_page: data.page,
      total_pages: data.total_pages,
    };
  }

  static async getCollection(id: number): Promise<ICollection> {
    const url = `/collection/${id}`;
    const data: RawCollection = await getJSON(url);

    const collection: ICollection = {
      backdrop: `${API_BACKDROP_BASE}${data.backdrop_path}`,
      id: data.id,
      link: createLink('collection', data.id, data.name),
      title: data.name,
      overview: data.overview,
      parts: formatPartsData(data.parts),
      partsCount: data.parts.length,
      poster: `${API_POSTER_BASE}${data.poster_path}`,
      type: 'collection',
    }

    return collection;
  }

  static getRandomCollectionId(): number {
    return COLLECTIONS[Math.floor(Math.random() * COLLECTIONS.length)];
  }

  static async getTrending(type: UTrendingType, period: 'day' | 'week' = 'week') {
    const url = `/trending/${type}/${period}`;
    const data: RawTrendingList = await getJSON(url);

    let trending: IPart[] | IBasePerson[] | ITrendingTvShow[] = [];

    switch (type) {
      case 'movie':
        trending = formatPartsData(data.results as RawCollectionPart[]) as IPart[];
        break;
      case 'tv':
        trending = formatBasicTvShowsData(data.results as RawTrendingTvShow[]) as ITrendingTvShow[];
        break;
      case 'person':
        trending = formatPersonsData(data.results as RawBasePerson[], 'base') as IBasePerson[];
        break;
      default:
        console.error('Wrong trending type');
        trending = [];
    }

    return trending;
  }

  static async getMovie(id: number): Promise<IMovie> {
    const url = `/movie/${id}`;
    const data: RawMovie = await getJSON(url);

    const movie = formatMovieData(data);

    return movie;
  }

  static async getMovieCredits(id: number): Promise<IMovieCredits> {
    const url = `/movie/${id}/credits`;
    const data: RawMovieCredits = await getJSON(url);

    const cast = formatPersonsData(data.cast, 'cast') as IMovieCast[];
    const crew = formatPersonsData(data.crew, 'crew') as IMovieCrew[];

    return { cast, crew };
  }

  static async getPerson(id: number): Promise<IBasePerson> {
    const url = `/person/${id}`;
    const data: RawPerson = await getJSON(url);

    const person = formatPerson(data);

    return person;
  }

  static async getPersonCredits(id: number) {
    const url = `/person/${id}/combined_credits`;
    const data = await getJSON(url);

    // const person = this.#formatPersonData(data);

    return data;
  }

  static async getTvShow(id: number): Promise<ITvShow> {
    const url = `/tv/${id}`;
    const data: RawTvShow = await getJSON(url);
    const tv = formatTvShowData(data);
    return tv;
  }
}
