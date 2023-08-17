import {
  COLLECTIONS
} from './config';

import {
  IGenre,
  ICollection,
  IBaseMovie,
  UListTypes,
  IListData,
  IMovie,
  IBasePerson,
  IMovieCredits,
  ITv,
  UTrendingType,
  IBaseTv,
  IMovieCrew,
  IMovieCast,
  IPerson,
  ITvSeason,
} from '../types/tmdb.types';

import {
  RawCollection,
  RawCollectionPart,
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
} from '../types/raw-tmdb.types';

import { getJSON } from './helpers';

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
  formatCollection
} from './formaters';

export default class TMDB {
  static allGenres: IGenre[] = [];

  // TODO: make below working
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
  // along with popular and top rated tv shows
  static async getList(
    page: number,
    mediaType: 'movie' | 'tv',
    listType: UListTypes,
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

    const data: RawMoviesList = await getJSON(url, params);
    const media = mediaType === 'movie'
      ? formatBaseMovies(data.results as RawCollectionPart[])
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
    const data: RawCollection = await getJSON(url);

    const collection = formatCollection(data);

    return collection;
  }

  static getRandomCollectionId(): number {
    return COLLECTIONS[Math.floor(Math.random() * COLLECTIONS.length)];
  }

  static async getTrending(type: UTrendingType, period: 'day' | 'week' = 'week') {
    const url = `/trending/${type}/${period}`;
    const data: RawTrendingList = await getJSON(url);

    let trending: IBaseMovie[] | IBasePerson[] | IBaseTv[] = [];

    switch (type) {
      case 'movie':
        trending = formatBaseMovies(data.results as RawCollectionPart[]) as IBaseMovie[];
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
    const data: RawMovie = await getJSON(url);

    const movie = formatMovie(data);

    return movie;
  }

  static async getMovieCredits(id: number): Promise<IMovieCredits> {
    const url = `/movie/${id}/credits`;
    const data: RawMovieCredits = await getJSON(url);

    const cast = formatPersons(data.cast, 'cast') as IMovieCast[];
    const crew = formatPersons(data.crew, 'crew') as IMovieCrew[];

    return { cast, crew };
  }

  static async getPerson(id: number): Promise<IPerson> {
    const url = `/person/${id}`;
    const data: RawPerson = await getJSON(url);

    const person = formatPerson(data);

    return person;
  }

  static async getPersonCredits(id: number) {
    const url = `/person/${id}/combined_credits`;
    const data: RawPersonCredits = await getJSON(url);

    const cast = formatPersonCast(data.cast);
    const crew = formatPersonCrew(data.crew);

    return { cast, crew };
  }

  static async getTvShow(id: number): Promise<ITv> {
    const url = `/tv/${id}`;
    const data: RawTv = await getJSON(url);
    const tv = formatTv(data);
    return tv;
  }

  static async getTvShowSeason(id: number, season: number): Promise<ITvSeason> {
    const url = `/tv/${id}/season/${season}`;
    const data: RawTvSeason = await getJSON(url);
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
}
