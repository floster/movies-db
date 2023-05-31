import { API_BASE, API_KEY, API_POSTER_BASE, API_BACKDROP_BASE } from "./config";
import { RawMovie, Movie } from "./types";

class TMDB {
  async #getJSON(url: string): Promise<any> {
    try {
      const response: Response = await fetch(url);
      const data: any = await response.json();
      return data;
    } catch (error) {
      throw new Error("☠️☠️☠️ Error fetching data");
    }
  }

  #normalizeMovies(movies:RawMovie[]):Movie[] {
    return movies.map(movie => {
      return {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        genres: movie.genre_ids,
        released: movie.release_date,
        votes: movie.vote_average,
        poster: `${API_POSTER_BASE}${movie.poster_path}`,
        backdrop: `${API_BACKDROP_BASE}${movie.backdrop_path}`
      }
    })
  }

  async getPopulars(): Promise<Movie[]> {
    const url = `${API_BASE}/movie/popular${API_KEY}`;
    const data = await this.#getJSON(url);
    const movies: Array<Movie> = this.#normalizeMovies(data.results);
    return movies;
  }
}

export default new TMDB();
