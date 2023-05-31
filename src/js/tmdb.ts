import { API_BASE, API_KEY } from "./config";

interface Movie {
  id: number;
  genre_ids: number[];
  title: string;
  overview: string;
  release_date: Date;
}

class TMDB {
  async #getJSON(url: string): Promise<any> {
    const response: Response = await fetch(url);
    const data: any = await response.json();
    return data;
  }

  async getPopulars(): Promise<void> {
    const url = `${API_BASE}/movie/popular${API_KEY}`;
    const data = await this.#getJSON(url);
    const populars: Array<Movie> = data.results;
    console.log(populars);

    populars.forEach(popular => {
      console.log(
        `${popular.title} - ${new Date(popular.release_date).getFullYear()}`
      );
    });
  }
}

export default new TMDB();
