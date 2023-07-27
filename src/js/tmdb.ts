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

  #formatMovieData(movie: RawMovie): Movie {
    const poster = movie.poster_path
      ? `${API_POSTER_BASE}${movie.poster_path}`
      : POSTER_NO_IMAGE;
    const releaseDate = new Date(movie.release_date);
    const year = releaseDate.getFullYear();
    // get only month and day from release date, for ex. 'Jul 19'
    const formatedDate = releaseDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).split(',')[0];

    const formatedData: Movie = {
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

    formatedData.genres = movie.genres ? movie.genres : [];
    formatedData.tagline = movie.tagline ? movie.tagline : '-';

    return formatedData;
  }

  #formatMoviesData(movies: RawMovie[]): Movie[] {
    return movies.map(movie => this.#formatMovieData(movie));
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

      const pages = {
        page: data.page,
        pages: data.total_pages,
      };
      const movies: Array<Movie> = this.#formatMoviesData(data.results);

      return {
        movies,
        ...pages,
      };
    } else {
      throw new Error(`🔴 Wrong Movie List type: ${listType}`);
    }
  }

  async getMovie(id: number): Promise<Movie> {
    const url = `${API_BASE}/movie/${id}${API_KEY}`;
    const data = await this.#getJSON(url);
    // console.log(data);

    const movie = this.#formatMovieData(data as RawMovie);

    return movie;
  }

  async getPopularCollections() {
    const url = `${API_BASE}/collection/popular${API_KEY}&language=en-US&page=1`;
    const data = await this.#getJSON(url);
    console.log('➡️', data);
  }
}

export default new TMDB();
