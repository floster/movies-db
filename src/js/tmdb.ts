import {
  LOCALES,
  CURRENT_LOCALE,
  API_BASE,
  API_KEY,
  API_POSTER_BASE,
  API_BACKDROP_BASE,
  MOVIE_LIST_TYPES,
  POSTER_NO_IMAGE,
  FAST_COLLECTION_ID,
  COLLECTIONS
} from './config';

import {
  RawCollection,
  Collection,
  RawPart,
  Part,
  RawListData,
  ListTypes,
  ListData,
  MediaType,
} from './types';

export default class TMDB {
  static async #getJSON<T>(url: string, params: string = ''): Promise<T> {
    const fetchUrl = `${API_BASE}${url}`;
    const fetchParams = new URLSearchParams(params);
    fetchParams.append('api_key', API_KEY);
    fetchParams.append('language', CURRENT_LOCALE);
    fetchParams.append('region', LOCALES[CURRENT_LOCALE]);

    const response: Response = await fetch(fetchUrl + '?' + fetchParams.toString());

    if (!response.ok) throw new Error(`getJSON: Error fetching data for URL: ${url}`);

    const data: T = await response.json();
    return data;
  }

  static #formatDate(date: Date) {
    const localeString = `${CURRENT_LOCALE}-${LOCALES[CURRENT_LOCALE]}`; // 'en-US'
    const full = date.toLocaleDateString(localeString, { month: 'short', day: 'numeric', year: 'numeric' });
    const year = date.getFullYear();
    return { full, year };
  }

  static #formatPartData(part: RawPart): Part {
    // if part is a movie or tv show then poster is under 'poster_path' property
    // if part is a person then poster is under 'profile_path' property
    const poster = part.poster_path
      ? `${API_POSTER_BASE}${part.poster_path}`
      : part.profile_path ? `${API_POSTER_BASE}${part.profile_path}` : POSTER_NO_IMAGE;

    // if part is a tv show, then it has 'first_air_date' property
    // if part is a movie, then it has 'release_date' property
    const dateProp = part.release_date ? part['release_date'] : part['first_air_date'];
    const date = this.#formatDate(new Date(dateProp!));

    const formatedData: Part = {
      adult: part.adult,
      backdrop: `${API_BACKDROP_BASE}${part.backdrop_path}`,
      id: part.id,
      type: part.media_type,
      overview: part.overview,
      popularity: part.popularity,
      poster: poster,
      released: { date: date.full, year: date.year },
      title: part.title! || part.name!,
      votes: { average: part.vote_count, count: part.vote_count },
    }

    if (part.media_type !== 'person') {
      formatedData.released = { date: date.full, year: date.year }
    } else {
      formatedData.department = part.known_for_department;
    }

    return formatedData;
  }

  static #formatPartsData(movies: RawPart[]): Part[] {
    return movies.map(movie => this.#formatPartData(movie));
  }

  // get page with 20 of 'top_rated', 'upcoming' or 'now_playing' movies
  static async getMoviesList(
    page: number,
    listType: ListTypes
  ): Promise<ListData> {
    if (MOVIE_LIST_TYPES.includes(listType)) {
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
      const movies: Part[] = this.#formatPartsData(data.results);

      return {
        movies,
        current_page: data.page,
        total_pages: data.total_pages,
      };
    } else {
      throw new Error(`🔴 Wrong Movie List type: ${listType}`);
    }
  }

  static async getCollection(id = FAST_COLLECTION_ID) {
    const url = `/collection/${id}`;
    const data: RawCollection = await this.#getJSON(url);

    const collection: Collection = {
      backdrop: `${API_BACKDROP_BASE}${data.backdrop_path}`,
      id: data.id,
      name: data.name,
      overview: data.overview,
      parts: this.#formatPartsData(data.parts),
      partsCount: data.parts.length,
      poster: `${API_POSTER_BASE}${data.poster_path}`,
    }

    return collection;
  }

  static async getRandomCollection() {
    const randomCollectionId = COLLECTIONS[Math.floor(Math.random() * COLLECTIONS.length)];
    return await this.getCollection(randomCollectionId);
  }

  static async getTrending(type: MediaType, period: 'day' | 'week' = 'week') {
    const url = `/trending/${type}/${period}`;
    const data: RawListData = await this.#getJSON(url);
    console.log(data);


    const movies: Part[] = this.#formatPartsData(data.results);

    return movies;
  }
}

