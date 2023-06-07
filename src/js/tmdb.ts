import {
  API_BASE,
  API_KEY,
  API_POSTER_BASE,
  API_BACKDROP_BASE,
  MOVIE_LIST_TYPES,
} from './config';
import { RawMovie, Movie, MovieListTypes } from './types';

class TMDB {
  async #getJSON(url: string): Promise<any> {
    try {
      const response: Response = await fetch(url);
      const data: any = await response.json();
      return data;
    } catch (error) {
      throw new Error('☠️☠️☠️ Error fetching data');
    }
  }

  #normalizeMovie(movie: RawMovie): Movie {
    return {
      id: movie.id,
      title: movie.title,
      tagline: movie.tagline,
      overview: movie.overview,
      genres: movie.genres,
      released: movie.release_date,
      votes: movie.vote_average,
      poster: `${API_POSTER_BASE}${movie.poster_path}`,
      backdrop: `${API_BACKDROP_BASE}${movie.backdrop_path}`,
    };
  }

  #normalizeMovies(movies: RawMovie[]): Movie[] {
    return movies.map(movie => this.#normalizeMovie(movie));
  }

  #calcPage(page: number): number {
    return this.#isEven(page) ? page / 2 : (page + 1) / 2;
  }

  #isEven(num: number): boolean {
    return num % 2 === 0;
  }

  // get standart TMDB 'page' with 20 movies
  async #getPopulars(page: number, listType: MovieListTypes): Promise<Movie[]> {
    if (MOVIE_LIST_TYPES.includes(listType)) {
      const url = `${API_BASE}/movie/${listType}${API_KEY}&page=${page}`;
      const data = await this.#getJSON(url);
      const movies: Array<Movie> = this.#normalizeMovies(data.results);

      return movies;
    } else {
      throw new Error(`🔴 Wrong Movie List type: ${listType}`);
    }
  }

  async getPopularsPage(
    page: number,
    listType: MovieListTypes
  ): Promise<Movie[]> {
    const requiredPage = this.#calcPage(page);
    const fullPage = await this.#getPopulars(requiredPage, listType);

    const res = this.#isEven(page) ? fullPage.slice(10) : fullPage.slice(0, 10);
    return res;
  }

  async getMovie(id: number = 646): Promise<Movie> {
    const url = `${API_BASE}/movie/${id}${API_KEY}`;
    const data = await this.#getJSON(url);
    const movie = this.#normalizeMovie(data);

    return movie;
  }
}

export default new TMDB();
