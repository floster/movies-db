import {
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
  MediaType
} from './types';

export default class TMDB {
  static async #getJSON<T>(url: string): Promise<T> {
    const response: Response = await fetch(url);

    if (!response.ok) throw new Error(`getJSON: Error fetching data for URL: ${url}`);

    const data: T = await response.json();
    return data;
  }

  static #formatPartData(movie: RawPart): Part {
    const poster = movie.poster_path
      ? `${API_POSTER_BASE}${movie.poster_path}`
      : POSTER_NO_IMAGE;

    const dateProp = movie.release_date ? movie['release_date'] : movie['first_air_date'];
    const releaseDate = new Date(dateProp!);
    const year = releaseDate.getFullYear();
    // get only month and day from release date, for ex. 'Jul 19'
    const formatedDate = releaseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).split(',')[0];

    const formatedData: Part = {
      adult: movie.adult,
      backdrop: `${API_BACKDROP_BASE}${movie.backdrop_path}`,
      id: movie.id,
      overview: movie.overview,
      popularity: movie.popularity,
      poster: poster,
      released: { date: formatedDate, year },
      title: movie.title,
      votes: { average: movie.vote_count, count: movie.vote_count },
    }

    return formatedData;
  }

  static #formatPartsData(movies: RawPart[]): Part[] {
    return movies.map(movie => this.#formatPartData(movie));
  }

  // get page with 20 of 'top_rated', 'upcoming' and 'now_playing' movies
  static async getMoviesList(
    page: number,
    listType: ListTypes
  ): Promise<ListData> {
    if (MOVIE_LIST_TYPES.includes(listType)) {
      let url = '';
      if (listType === 'upcoming') {
        const oneWeekLater = new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000);
        const oneWeekLaterStr = oneWeekLater.toISOString().split('T')[0];
        // get movies that will be released starts from tomorrow
        url = `${API_BASE}/discover/movie${API_KEY}&region=UA&sort_by=primary_release_date.asc&primary_release_date.gte=${oneWeekLaterStr}`;
      } else {
        url = `${API_BASE}/movie/${listType}${API_KEY}&page=${page}`;

      }
      const data: RawListData = await this.#getJSON(url);

      const pages = {
        page: data.page,
        pages: data.total_pages,
      };
      const movies: Part[] = this.#formatPartsData(data.results);

      return {
        movies,
        ...pages,
      };
    } else {
      throw new Error(`🔴 Wrong Movie List type: ${listType}`);
    }
  }

  static async getCollection(id = FAST_COLLECTION_ID) {
    const url = `${API_BASE}/collection/${id}${API_KEY}&language=en-US`;
    const data: RawCollection = await this.#getJSON(url);
    console.log('RawCollection', data);

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
    const url = `${API_BASE}/trending/${type}/${period}${API_KEY}`;
    const data: RawListData = await this.#getJSON(url);

    const movies: Part[] = this.#formatPartsData(data.results);

    return movies;
  }
}

