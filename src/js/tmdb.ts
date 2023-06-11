import {
  API_BASE,
  API_KEY,
  API_POSTER_BASE,
  API_BACKDROP_BASE,
  MOVIE_LIST_TYPES,
  POSTER_NO_IMAGE,
  MOVIES_500,
} from './config';
import {
  RawMovie,
  Movie,
  MovieListRespose, MovieListTypes,
  ListData,
} from './types';

class TMDB {
  async #getJSON(url: string): Promise<any> {
    try {
      const response: Response = await fetch(url);

      if (!response.ok) throw new Error(`getJSON: Error fetching data for URL: ${url}`);

      const data: any = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  #normalizeMovie(movie: RawMovie): Movie {
    const poster = movie.poster_path
      ? `${API_POSTER_BASE}${movie.poster_path}`
      : POSTER_NO_IMAGE;
    const releaseDate = new Date(movie.release_date);
    const year = releaseDate.getFullYear();
    return {
      id: movie.id,
      adult: movie.adult,
      title: movie.title,
      tagline: movie.tagline,
      overview: movie.overview,
      genres: movie.genres,
      released: movie.release_date,
      year: year,
      votes: movie.vote_average,
      poster: poster,
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
  async #getMovieList(
    page: number,
    listType: MovieListTypes
  ): Promise<ListData> {
    if (MOVIE_LIST_TYPES.includes(listType)) {
      const url = `${API_BASE}/movie/${listType}${API_KEY}&page=${page}`;
      const data = await this.#getJSON(url);

      const pages = {
        page: data.page,
        pages: data.total_pages,
      };
      const movies: Array<Movie> = this.#normalizeMovies(data.results);

      return {
        movies,
        ...pages,
      };
    } else {
      throw new Error(`🔴 Wrong Movie List type: ${listType}`);
    }
  }

  async getMovieListPage(
    page: number,
    listType: MovieListTypes
  ): Promise<ListData> {
    const requiredPage = this.#calcPage(page);
    const listData = await this.#getMovieList(requiredPage, listType);

    const movies = this.#isEven(page)
      ? listData.movies.slice(10)
      : listData.movies.slice(0, 10);
    return {
      movies: movies,
      page: listData.page,
      // total pages will be x2 more because above we split each TMDB-provided page in 2 pages
      // (to show 10 movies in a row instead of 20)
      pages: listData.pages * 2,
    };
  }

  async getMovie(id: number): Promise<Movie> {
    try {
      const url = `${API_BASE}/movie/${id}${API_KEY}`;
      const data = await this.#getJSON(url);
      console.log(data);

      const movie = this.#normalizeMovie(data);

      return movie;
    } catch (error) {
      throw error;
    }
  }

  async #discoverMovies(page = 1): Promise<MovieListRespose> {
    try {
      const queryParams = `&include_adult=false&language=en-US&release_date.gte=2000&sort_by=popularity.desc&page=${page}`;
      const url = `${API_BASE}/discover/movie/${API_KEY}${queryParams}`;
      const data = await this.#getJSON(url);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async #getMoviesID(): Promise<number[]> {
    const ids = new Set<number>();
    for (let page = 1; page <= 25; page++) {
      const movies = await this.#discoverMovies(page);
      movies.results.forEach(movie => ids.add(movie.id));
    }
    
    return Array.from(ids);
  }

  async getRandomMovie(): Promise<Movie> {
    const ids = MOVIES_500;
    const randomIdx = Math.floor(Math.random() * ids.length) + 1;
    const randomID = ids[randomIdx - 1];
    const movie = await this.getMovie(randomID);

    return movie;
  }
}

export default new TMDB();
