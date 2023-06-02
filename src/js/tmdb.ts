import { API_BASE, API_KEY, API_POSTER_BASE, API_BACKDROP_BASE, PARTS_PER_PAGE } from './config';
import { RawMovie, Movie, Populars } from './types';

class TMDB {
  state = {
    populars: new Map(),
    topRated: new Map(),
    popularsQty: 0,
    topRatedQty: 0,
  };

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

  #calculatePage(page: number): number {
    return this.#isEven(page) ? page * 2 : page * 2 - 1;
  }

  #isEven(num: number): boolean {
    return num % 2 === 0;
  }

  async #setPopulars(topRated: boolean, page = 1): Promise<void> {
    const type = topRated ? 'top_rated' : 'popular';
    const url = `${API_BASE}/movie/${type}${API_KEY}&page=${page}`;
    const data = await this.#getJSON(url);
    // console.log(data);
    const movies: Array<Movie> = this.#normalizeMovies(data.results);

    this.#setPagesQty(data.total_pages, topRated);
    this.#storePopularsPages(page, movies, topRated);
  }

  #storePopularsPages(page: number, parts: Movie[], topRated = false) {
    const whereToStore = topRated ? this.state.topRated : this.state.populars;

    const evenParts = parts.slice(PARTS_PER_PAGE);
    const oddParts = parts.slice(0, PARTS_PER_PAGE);

    const even = this.#isEven(page) ? page : page + 1;
    const odd = this.#isEven(page) ? page + 1 : page;

    whereToStore.set(even, evenParts);
    whereToStore.set(odd, oddParts);
  }

  #setPagesQty(qty: number, topRated: boolean) {
    if (topRated) this.state.topRatedQty = qty;
    else this.state.popularsQty = qty;
  }

  async getPopularsPage(page: number, topRated = false) {
    const from = topRated ? this.state.topRated : this.state.populars;

    if (!from.has(page)) {
      const requiredPage = this.#isEven(page) ? page - 1 : page;
      await this.#setPopulars(topRated, requiredPage);
    }

    return from.get(page);
  }

  async getMovie(id: number = 646): Promise<Movie> {
    const url = `${API_BASE}/movie/${id}${API_KEY}`;
    const data = await this.#getJSON(url);
    const movie = this.#normalizeMovie(data);

    return movie;
  }
}

export default new TMDB();
