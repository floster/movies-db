import {
  API_BASE,
  API_KEY,
  API_POSTER_BASE,
  API_BACKDROP_BASE,
  MOVIE_LIST_TYPES,
  POSTER_NO_IMAGE,
} from './config';
import {
  RawMovie,
  RawList,
  Movie,
  // MovieListRespose,
  MovieListTypes,
  ListData,
} from './types';

class TMDB {
  async #getJSON<T>(url: string): Promise<T> {
    const response: Response = await fetch(url);

    if (!response.ok) throw new Error(`getJSON: Error fetching data for URL: ${url}`);

    const data: T = await response.json();
    return data;
  }

  #normalizeMovie(movie: RawMovie): Movie {
    const poster = movie.poster_path
      ? `${API_POSTER_BASE}${movie.poster_path}`
      : POSTER_NO_IMAGE;
    const releaseDate = new Date(movie.release_date);
    const year = releaseDate.getFullYear();
    // get only month and day from release date 'Jul 19'
    const formatedDate = releaseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).split(',')[0];

    const normalizedData: Movie = {
      id: movie.id,
      adult: movie.adult,
      title: movie.title,
      overview: movie.overview,
      released: { date: formatedDate, year },
      rating: movie.vote_average,
      votes: movie.vote_count,
      poster: poster,
      backdrop: `${API_BACKDROP_BASE}${movie.backdrop_path}`,
    }

    normalizedData.genres = movie.genres ? movie.genres : [];
    normalizedData.tagline = movie.tagline ? movie.tagline : '-';

    return normalizedData;
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
  async getMoviesList(
    page: number,
    listType: MovieListTypes
  ): Promise<ListData> {
    if (MOVIE_LIST_TYPES.includes(listType)) {
      let url = '';
      if (listType === 'upcoming') {
        const currentDate = new Date();
        const oneWeekLater = new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000);
        const oneWeekLaterStr = oneWeekLater.toISOString().split('T')[0];
        // get movies that will be released the day after tomorrow
        url = `${API_BASE}/discover/movie${API_KEY}&region=UA&sort_by=primary_release_date.asc&primary_release_date.gte=${oneWeekLaterStr}`;
      } else url = `${API_BASE}/movie/${listType}${API_KEY}&page=${page}`;
      const data: RawList = await this.#getJSON(url);
      console.log(data);


      const pages = {
        page: data.page,
        pages: data.total_pages,
      };
      const movies: Array<Movie> = this.#normalizeMovies(data.results);
      console.log(`🟢 listType recieved: ${listType}`);
      console.log(movies);

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
    const listData = await this.getMoviesList(requiredPage, listType);

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
    const url = `${API_BASE}/movie/${id}${API_KEY}`;
    const data = await this.#getJSON(url);
    // console.log(data);

    const movie = this.#normalizeMovie(data as RawMovie);

    return movie;
  }

  // async #discoverMovies(page = 1): Promise<MovieListRespose> {
  //   try {
  //     const queryParams = `&include_adult=false&language=en-US&release_date.gte=2000&sort_by=popularity.desc&page=${page}`;
  //     const url = `${API_BASE}/discover/movie/${API_KEY}${queryParams}`;
  //     const data = await this.#getJSON(url);
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async #getMoviesID(): Promise<number[]> {
  //   const ids = new Set<number>();
  //   for (let page = 1; page <= 25; page++) {
  //     const movies = await this.#discoverMovies(page);
  //     movies.results.forEach(movie => ids.add(movie.id));
  //   }

  //   return Array.from(ids);
  // }

  // async getRandomMovie(): Promise<Movie> {
  //   const ids = store.top500;
  //   const randomIdx = Math.floor(Math.random() * ids.length) + 1;
  //   const randomID = ids[randomIdx - 1];
  //   const movie = await this.getMovie(randomID);

  //   return movie;
  // }
}

export default new TMDB();
